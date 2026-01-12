import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fare } from './fare.entity';
import { Car } from 'src/car/car.entity';
import { CreateFare } from './dto/create-fare.dto';
import { UpdateFare } from './dto/update-fare.dto';
import { MarkupService } from 'src/markup/markup.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class FareService {
  constructor(
    @InjectRepository(Fare)
    private readonly FareRepository: Repository<Fare>,

    @InjectRepository(Car)
    private readonly CarRepository: Repository<Car>,

    private readonly MarkUpService: MarkupService,
   private readonly cacheManager: Cache, 
  ) {}

  async create(dto: CreateFare) :Promise<Fare>{
    const car = await this.CarRepository.findOneBy({ id: dto.carId });
    if (!car) throw new BadRequestException('Car not found');

    const fare = this.FareRepository.create({
      ...dto,
      car,
      date: new Date(),
    });

    return await this.FareRepository.save(fare);
  }

async Update(id: number, dto: any): Promise<any> {
 
    const fare = await this.FareRepository.findOne({ where: { id } });
    if (!fare) throw new NotFoundException('Fare not found');

   
    const { carId, ...otherData } = dto;

    
    Object.assign(fare, otherData);

  
    if (carId) {
        
        fare.car = { id: carId } as any; 
    }

    await this.FareRepository.save(fare);

   
    return this.FareRepository.findOne({
        where: { id },
        relations: ['car']
    });
}

 async findOne(id: number) {
    const fare = await this.FareRepository.findOne({
      where: { id },
      relations: ['car'],
    });
    if (!fare) throw new BadRequestException('Driver not found');
    return fare;
  }



  async findAll():Promise<any[]> {
    const fares = await this.FareRepository.find({ relations: ['car'] });
    
    const markup = await this.MarkUpService.getCurrentMarkup(); // { type, value }

    return fares.map((fare) => {
      const markupValue = this.calculateMarkup(fare.fare, markup.type, markup.value);
      const finalFare = Number(fare.fare) + markupValue;

      return {
        ...fare,
        markupType: markup.type,
        markupValue,
        finalFare,
      };
    });

    
  }

  async findByAmount(fareAmount: number) {
    const result = await this.FareRepository.find({
      where: { fare: fareAmount },
      relations: ['car'],
    });

    if (!result || result.length === 0)
      throw new BadRequestException('Fare not found');

    const markup = await this.MarkUpService.getCurrentMarkup();

    return result.map((fare) => {
      const markupValue = this.calculateMarkup(fare.fare, markup.type, markup.value);
      const finalFare = Number(fare.fare) + markupValue;

      return {
        ...fare,
        markupType: markup.type,
        markupValue,
        finalFare,
      };
    });
  }

 async findByLocation(fromLoc: string, toLoc: string) {
  const cacheKey = `fare:${fromLoc}:${toLoc}`;

  // 1. Try to get data from Redis
  const cachedData = await this.cacheManager.get<any[]>(cacheKey);
  if (cachedData) {
    console.log('🚀 Redis HIT');
    return cachedData; // Returns the array directly, same as findByAmount
  }

  console.log('❌ Redis MISS — Fetching from DB');

  const result = await this.FareRepository.find({
    where: { FromLocation: fromLoc, ToLocation: toLoc },
    relations: ['car'],
  });

  if (!result || result.length === 0)
    throw new BadRequestException('Fare not found for that location');

  const markup = await this.MarkUpService.getCurrentMarkup();

  // 2. Transform the data
  const response = result.map((fare) => {
    const markupValue = this.calculateMarkup(
      fare.fare,
      markup.type,
      markup.value,
    );

    return {
      ...fare,
      markupType: markup.type,
      markupValue,
      finalFare: Number(fare.fare) + markupValue,
    };
  });

  // 3. Store the array directly in Redis
  // Note: Using 600000ms (10 mins) depending on your cache-manager version
  await this.cacheManager.set(cacheKey, response, 600000); 

  return response; // Returns the exact same structure as findByAmount
}

  async delete(id: number):Promise<string> {
    const fare = await this.FareRepository.findOneBy({ id });
    if (!fare) throw new BadRequestException('Fare not found');

    await this.FareRepository.remove(fare);
    return `Fare with ID ${id} deleted`;
  }

  
  private calculateMarkup(fare: number, type: 'percentage' | 'fixed', value: number): number {
    if (type === 'percentage') {
      return Number(fare) * (value / 100);
    } else if (type === 'fixed') {
      return value;
    }
    return 0;
  }
}

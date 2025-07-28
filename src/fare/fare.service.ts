import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fare } from './fare.entity';
import { Car } from 'src/car/car.entity';
import { CreateFare } from './dto/create-fare.dto';
import { UpdateFare } from './dto/update-fare.dto';
import { MarkupService } from 'src/markup/markup.service';

@Injectable()
export class FareService {
  constructor(
    @InjectRepository(Fare)
    private readonly FareRepository: Repository<Fare>,

    @InjectRepository(Car)
    private readonly CarRepository: Repository<Car>,

    private readonly MarkUpService: MarkupService,
  ) {}

  async create(dto: CreateFare) {
    const car = await this.CarRepository.findOneBy({ id: dto.carId });
    if (!car) throw new BadRequestException('Car not found');

    const fare = this.FareRepository.create({
      ...dto,
      car,
      date: new Date(),
    });

    return await this.FareRepository.save(fare);
  }

  async findAll() {
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
    const result = await this.FareRepository.find({
      where: { FromLocation: fromLoc, ToLocation: toLoc },
      relations: ['car'],
    });

    if (!result || result.length === 0)
      throw new BadRequestException('Fare not found for that location');

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

  async delete(id: number) {
    const fare = await this.FareRepository.findOneBy({ id });
    if (!fare) throw new BadRequestException('Fare not found');

    await this.FareRepository.remove(fare);
    return `Fare with ID ${id} deleted`;
  }

  // ✅ Utility method to compute markup value
  private calculateMarkup(fare: number, type: 'percentage' | 'fixed', value: number): number {
    if (type === 'percentage') {
      return Number(fare) * (value / 100);
    } else if (type === 'fixed') {
      return value;
    }
    return 0;
  }
}

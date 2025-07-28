import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fare } from 'src/fare/fare.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SearchQuery } from './dto/search-query.dto';
import { v4 as uuidv4 } from 'uuid';
import { MarkupService } from 'src/markup/markup.service';
import { Car } from 'src/car/car.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Fare)
    private readonly fareRepo: Repository<Fare>, // Injects the Fare entity repository

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, // Injects the Redis cache via NestJS's cache manager

    private readonly markupService: MarkupService, // Service to get the latest markup config
  ) {}

  // Handles the main search operation
  async search(query: SearchQuery) {
    const fares = await this.searchLogic(query); // Fetches filtered fare records
    const markup = await this.markupService.getCurrentMarkup(); // Gets the latest markup (type and value)

    // For each fare result, apply markup and save to Redis with a unique token
    const results = await Promise.all(
      fares.map(async (fare) => {
        const token = uuidv4(); // Unique token for this result
        const markupAmount = this.calculateMarkup(fare.fare, markup.type, markup.value); // Calculate markup amount
        const finalFare = Number(fare.fare) + markupAmount; // Add markup to base fare

        const data = {
          id: fare.id,
          from: fare.FromLocation,
          to: fare.ToLocation,
          fare: fare.fare,
          markupType: markup.type,
          markupValue: markupAmount,
          finalFare,
          car: {
            id: fare.car?.id,
            carNo: fare.car?.carNo,
            model: fare.car?.model,
            ac: fare.car?.ac,
            fuelType: fare.car?.fuelType,
            seats: fare.car?.noOfSeats,
          },
          date:fare.date
        };

        // Save the result to Redis with token as key, expires in 10 hours 
        await this.cacheManager.set(token, data, 36000);

        // Return the response with token so client can use it later
        return { token, ...data };
      }),
    );

    return results;
  }

  // Fetches a specific search result from Redis using the token
  async getByToken(token: string) {
    const result = await this.cacheManager.get(token); // Try to fetch cached result
    if (!result) throw new NotFoundException('Result not found for this token');
    return result;
  }

  // Performs filtering logic on Fare records based on query params
  private async searchLogic(query: SearchQuery): Promise<Fare[]> {
    const { fromLoc, ToLoc, fareMin, fareMax, ac, model,date } = query;

    const qb = this.fareRepo.createQueryBuilder('fare')
      .leftJoinAndSelect('fare.car', 'car')
      .where('fare.FromLocation LIKE :from', { from: `%${fromLoc}%` })
      .andWhere('fare.ToLocation LIKE :to', { to: `%${ToLoc}%` });

    // Optional filtering by fare range
    if (fareMin !== undefined) qb.andWhere('fare.fare >= :fareMin', { fareMin });
    if (fareMax !== undefined) qb.andWhere('fare.fare <= :fareMax', { fareMax });

    if (date) {
      qb.andWhere('DATE(fare.date) = DATE(:date)', { date });
    }

    const fares = await qb.getMany();

    // In-memory filtering for car AC and model
    return fares.filter(f => {
      if(!f.car) return false

      

       let acBool:boolean|undefined
      
       if(ac === 'true') acBool=true

       else if (ac=== 'false') acBool=false
       

     
      if (acBool!== undefined && f.car.ac !== acBool) return false;
      if (model && !f.car.model.toLowerCase().includes(model.toLowerCase())) return false;
      return true;

     
      
    });
  }


  
   
  // Calculates markup amount based on type (percentage or fixed)
  private calculateMarkup(baseFare: number, type: 'percentage' | 'fixed', value: number): number {
    if (type === 'percentage') return baseFare * (value / 100);
    if (type === 'fixed') return value;
    return 0;
  }

  // Optional method to test Redis connectivity manually
  async debugCache() {
    await this.cacheManager.set('debug-key', { hello: 'world' }, 60);
    const result = await this.cacheManager.get('debug-key');
    console.log('Redis test value:', result);
  }
}

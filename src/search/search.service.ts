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
    private readonly fareRepo: Repository<Fare>, 
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, 

    private readonly markupService: MarkupService ){}

  
  async search(query: SearchQuery) {
    const fares = await this.searchLogic(query); 
    const markup = await this.markupService.getCurrentMarkup(); 

   
    const results = await Promise.all(
      fares.map(async (fare) => { 
        const token = uuidv4(); 
        const markupAmount = this.calculateMarkup(fare.fare, markup.type, markup.value); 
        const finalFare = Number(fare.fare) + markupAmount;
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
            imageUrl: fare.car?.imageUrl,
          },
          date:fare.date
        };

        
        await this.cacheManager.set(token, data, {ttl:3600} as any);
        console.log(token)
       
        return { token, ...data };
      }),
    );

    return results;
  }

 
  async getByToken(token: string) {
    console.log(token)
    const result = await this.cacheManager.get(token);
    console.log(token)
    
    if (!result) throw new NotFoundException('Result not found for this token');
    return result;
  }

  
  private async searchLogic(query: SearchQuery): Promise<Fare[]> {
    const { fromLoc, ToLoc, fareMin, fareMax, ac, model,date } = query;

    const qb = this.fareRepo.createQueryBuilder('fare')
      .leftJoinAndSelect('fare.car', 'car')
      .where('fare.FromLocation LIKE :from', { from: `%${fromLoc}%` })
      .andWhere('fare.ToLocation LIKE :to', { to: `%${ToLoc}%` });

   
    if (fareMin !== undefined) qb.andWhere('fare.fare >= :fareMin', { fareMin });
    if (fareMax !== undefined) qb.andWhere('fare.fare <= :fareMax', { fareMax });

    if (date) {
      qb.andWhere('DATE(fare.date) = DATE(:date)', { date });
    }

    const fares = await qb.getMany();

   
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

  
  private calculateMarkup(baseFare: number, type: 'percentage' | 'fixed', value: number): number {
    if (type === 'percentage') return baseFare * (value / 100);
    if (type === 'fixed') return value;
    return 0;
  }


  async debugCache() {
    await this.cacheManager.set('debug-key', { hello: 'world' }, 60);
    const result = await this.cacheManager.get('debug-key');
    console.log('Redis test value:', result);
  }
  
}

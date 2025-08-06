import { Int, Resolver } from '@nestjs/graphql';
import { CarType } from './car-type.entity';
import { CarTypeService } from './car-type.service';
import { Query } from '@nestjs/graphql';
import { Mutation } from '@nestjs/graphql';
import { CreateTypeDto } from './dto/create-type.dto';
import { Args } from '@nestjs/graphql';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Car } from 'src/car/car.entity';

@Resolver(()=>CarType)
export class CarTypeResolver {

    constructor(
        private readonly carTypeService:CarTypeService
    ){}

    @Query(()=>[CarType])
    GetAllTypes():Promise<CarType[]>{
     return this.carTypeService.getAll()
    }

    
    @Mutation(()=>CarType)
    CreateType(@Args('input') input :CreateTypeDto):Promise<CarType>{
     return this.carTypeService.create(input)
    }

    @Mutation(()=>CarType)
    Update(@Args('id',{type:()=>Int}) id:number, @Args('input') input:UpdateTypeDto):Promise<CarType>{
     
        return this.carTypeService.update(id,input)

    }

    @Mutation(()=>String)
    Delete(@Args('id') id:number):Promise<String>{
   return this.carTypeService.delete(id)

    }



}

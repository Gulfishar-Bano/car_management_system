import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { Query } from '@nestjs/graphql';
import { CreateDriver } from './Dto/create-driver.dto';
import { In } from 'typeorm';
import { UpdateDriver } from './Dto/update-driver.dto';

@Resolver(()=>Driver)
export class DriverResolver {


    constructor(private readonly driverService:DriverService){}


    @Query(()=>[Driver])
    GetAllDriver():Promise<Driver[]>{
     return this.driverService.findAll()

    }

    @Mutation(()=>Driver)
    CreateDriver(@Args('input') input:CreateDriver):Promise<Driver>{

        return this.driverService.create(input)
    }

    @Mutation(()=>Driver)
    UpdateDriver(@Args('id',{type:()=>Int}) id:number, @Args('input') input:UpdateDriver):Promise<Driver>{

        return this.driverService.Update(id,input)
    }


    @Mutation(()=>String)
    DeleteDriver(@Args('id') id:number):Promise<String>{
        
        return this.driverService.remove(id)
    }

}

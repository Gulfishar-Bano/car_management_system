import { Int, Resolver } from '@nestjs/graphql';
import { Car } from './car.entity';
import { CarService } from './car.service';
import { Query } from '@nestjs/graphql';
import { Mutation } from '@nestjs/graphql';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import { Args } from '@nestjs/graphql';

@Resolver(()=>Car)
export class CarResolver {

constructor(

    private readonly carService:CarService
){}

@Query(()=>[Car])
GetAllCars():Promise<Car[]>{
 return this .carService.getAll()

}

@Mutation(()=>Car)
CreateCar(@Args('input') input:CreateCarDto):Promise<Car>{

    return this.carService.create(input)
}

@Mutation(()=>Car)
UpdateCar(@Args('id',{type:()=>Int}) id:number,@Args('input') input:UpdateCarDto):Promise<Car|null>{

    return this.carService.Update(id,input)

}

@Mutation(()=>String)
DeleteCar(@Args('id',{type:()=>Int}) id:number):Promise<String>{

    return this.carService.delete(id)

}


}

import { Resolver } from '@nestjs/graphql';
import { CarBrand } from './car_brand.entity';
import { Injectable} from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { Query ,Mutation} from '@nestjs/graphql';
import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';
import { Args } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';



@Resolver(()=>CarBrand)
export class CarBrandResolver {
     
constructor(

   private readonly carBrandService:CarBrandService
){}


@Query(()=>[CarBrand])
GetAllBrand():Promise<CarBrand[]>{
 return  this.carBrandService.GetAll()
}

@Mutation(()=>CarBrand)
CreateBrand(@Args('input') input :CreateBrandDto):Promise<CarBrand>{
    return this.carBrandService.Create(input)
}

@Mutation(()=>CarBrand)
UpdateBrand(@Args('id' ,{type:()=>Int}) id:number, @Args('input') input:UpdateBrandDto):Promise<CarBrand|null>{

    return this.carBrandService.Update(id,input)
}

@Mutation(()=>String)
DeleteBrand(@Args('id', { type: () =>Int })  id:number):Promise<string>{
    return this.carBrandService.Delete(id)
}




}

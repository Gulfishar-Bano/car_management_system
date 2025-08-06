import { Int, Resolver } from '@nestjs/graphql';
import { Fare } from './fare.entity';
import { FareService } from './fare.service';
import { Query } from '@nestjs/graphql';
import { Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { CreateFare } from './dto/create-fare.dto';
import { UpdateFare } from './dto/update-fare.dto';

@Resolver()
export class FareResolver {


constructor(
    private readonly fareService:FareService
){}

@Query(()=>[Fare])
GetAllFares():Promise<any[]>{
 return this.fareService.findAll()

}

@Mutation(()=>Fare)
CreateFare(@Args('input') input:CreateFare):Promise<Fare>{

return this.fareService.create(input)

}


@Mutation(()=>String)
Delete(@Args('id', {type:()=>Int}) id:number ):Promise<string>{

    return this.fareService.delete(id)
}






}

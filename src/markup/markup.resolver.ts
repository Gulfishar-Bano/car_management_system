import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Markup } from './markup.entity';
import { MarkupService } from './markup.service';
import { Query } from '@nestjs/graphql';
import { CreateMarkupDto } from './dto/create-markup.dto';
import { UpdateMarkupDto } from './dto/update-markup.dto';

@Resolver(()=>Markup)
export class MarkupResolver {

    constructor(
        private readonly markUpService:MarkupService
    ){}


    @Query(()=>[Markup])
    GetAllMarkups():Promise<Markup[]>{

        return this.markUpService.findAll();
    }




@Mutation(()=>Markup)
UpdateMarkUp(@Args('id',{type:()=>Int}) id:number,@Args('input') input:UpdateMarkupDto ):Promise<Markup>{

    return this.markUpService.update(id,input)
}

@Mutation(()=>String)
DeleteMarkup(@Args('id',{type:()=>Int}) id:number):Promise<String>{

    return this.markUpService.remove(id)
}

}

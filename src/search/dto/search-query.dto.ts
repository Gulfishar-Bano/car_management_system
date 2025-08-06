import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class SearchQuery{

    @Field({ nullable: true })
    @IsString()
    
    fromLoc:string

    @Field({ nullable: true })
    @IsString()
    ToLoc:string

    
    @Field({ nullable: true })
    @IsOptional()
    fareMin:number

    @Field({ nullable: true })
    @IsOptional()
    fareMax:number

   
    @Field({ nullable: true })
    @IsOptional()
    ac:string

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    model:string

    @Field({ nullable: true })
    @IsDateString()
    @IsOptional()
    date:string


}
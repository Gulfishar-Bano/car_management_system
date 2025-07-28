import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchQuery{


    @IsString()
    
    fromLoc:string

    @IsString()
    ToLoc:string

    
    @IsOptional()
    fareMin:number

    
    @IsOptional()
    fareMax:number

   
    @IsOptional()
    ac:string

    @IsString()
    @IsOptional()
    model:string

    @IsDateString()
    @IsOptional()
    date:string


}
import { IsNumber,Min,Max, IsIn, IsOptional } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateMarkupDto {
 
  @Field()
  @IsOptional()
  @IsIn(['percentage','fixed'])
  type:'percentage'|'fixed'

  
    @Field()
    @IsNumber()
    @IsOptional()
    @Min(0)
    value: number;
  }
  
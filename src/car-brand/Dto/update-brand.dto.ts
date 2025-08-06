import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';


@InputType()
export class UpdateBrandDto {
  
  @Field(()=>Int)
  @IsNumber()
  id:number


  @Field({nullable:true})
  @IsString()
  @IsNotEmpty()
  name?: string;
}

import { IsString, IsInt, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCarDto {

  @Field(()=>Int)
  @IsString()
  @IsNotEmpty()
  carNo: string;

  @Field()
  @IsString()
  model: string;

@Field()
  @IsString()
  fuelType: string;


@Field()
  @IsInt()
  noOfSeats: number;

  @Field()
  @IsBoolean()
  ac: boolean;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  driverId: number;

  @Field()
  @IsNumber()
  brandId: number;

  @Field()
  @IsNumber()
  carTypeId: number;
}

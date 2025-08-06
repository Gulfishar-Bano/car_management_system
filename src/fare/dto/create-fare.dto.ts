import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateFare {
  @Field()
  @IsString()
  FromLocation: string;

  @Field()
  @IsString()
  ToLocation: string;

  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsNumber()
  fare: number;

  @Field(() => Int)
  @IsNumber()
  carId: number;
}

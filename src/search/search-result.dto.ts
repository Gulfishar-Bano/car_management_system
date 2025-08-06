// src/search/dto/search-result.dto.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CarData {
  @Field(() => Int)
  id: number;

  @Field()
  carNo: string;

  @Field()
  model: string;

  @Field()
  ac: boolean;

  @Field()
  fuelType: string;

  @Field(() => Int)
  seats: number;
}

@ObjectType()
export class SearchResult {
  @Field()
  token: string;

  @Field(() => Int)
  id: number;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  currency: string;

  @Field(() => Int)
  fare: number;

  @Field()
  markupType: string;

  @Field(() => Int)
  markupValue: number;

  @Field(() => Int)
  finalFare: number;

  @Field()
  date: Date;

  @Field(() => CarData)
  car: CarData;
}

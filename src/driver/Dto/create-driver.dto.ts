import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsDateString } from 'class-validator';
import { GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateDriver {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsString()
  licence: string;

  @Field(()=>GraphQLISODateTime)
  
  validity: string; // or Date, if you prefer
}

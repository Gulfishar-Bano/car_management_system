import { IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class UpdateTypeDto {

  @Field()
  @IsOptional()
  @IsString()
  name?: string;
}

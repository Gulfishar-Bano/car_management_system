import { IsString, IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class CreateBrandDto {

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;
}


import { IsString, IsNotEmpty,  Length} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTypeDto {

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(2,10)
  name: string;
 
}

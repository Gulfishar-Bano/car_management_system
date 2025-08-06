import { IsIn, IsNumber, Min } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMarkupDto {
  @Field()
  @IsIn(['percentage', 'fixed'])
  type: 'percentage' | 'fixed';

  @Field()
  @IsNumber()
  @Min(0)
  value: number;
}

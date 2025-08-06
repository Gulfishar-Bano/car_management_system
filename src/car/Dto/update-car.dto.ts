import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCarDto {
 

  @Field({ nullable: true })
  carNo?: string;

  @Field(() => Int, { nullable: true })
  carType?: number;

  @Field(() => Int, { nullable: true })
  brand?: number;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  fuelType?: string;

  @Field({nullable:true})
  
  driverId?: number;

  @Field(() => Int, { nullable: true })
  noOfSeats?: number;

  @Field({ nullable: true })
  ac?: boolean;

  @Field({ nullable: true })
  description?: string;
}

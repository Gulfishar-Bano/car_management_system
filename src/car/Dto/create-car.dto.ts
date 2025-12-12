import { IsString, IsInt, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer'; 

@InputType()
export class CreateCarDto {

  
    @Field() 
    @IsString()
    @IsNotEmpty()
    carNo: string;

    @Field()
    @IsString()
    model: string;


    

    @Field()
    @IsString()
    fuelType: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    imageUrl: string;

    
    @Field(() => Int) 
    @Type(() => Number) 
    @IsInt() 
    noOfSeats: number;


    @Field()
    @Type(() => Boolean) 
    @IsBoolean() 
    ac: boolean;

    @Field()
    @IsString()
    description: string;

    
    @Field(() => Int)
    @Type(() => Number) 
    @IsOptional()
    @IsNumber()
    driverId: number;

    @Field(() => Int)
    @Type(() => Number) 
    @IsNumber()
    brandId: number;

    @Field(() => Int)
    @Type(() => Number) 
    @IsNumber()
    carTypeId: number;
}
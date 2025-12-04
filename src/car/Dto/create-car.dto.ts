import { IsString, IsInt, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer'; // <--- ADDED: Crucial for converting form-data strings to numbers/booleans

@InputType()
export class CreateCarDto {

    // 1. carNo: Should be string. Removed conflicting GraphQL Int.
    @Field() // Corrected: Removed conflicting Int type hint
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

    // 2. noOfSeats: Requires Type decorator to convert "7" (string) to 7 (number).
    @Field(() => Int) // <-- Specify GraphQL type as Int for clarity
    @Type(() => Number) // <-- ADDED: Converts form-data string to number
    @IsInt() // Validates it is an integer
    noOfSeats: number;

    // 3. ac: Requires Type decorator to convert "true" (string) to true (boolean).
    @Field()
    @Type(() => Boolean) // <-- ADDED: Converts form-data string to boolean
    @IsBoolean() // Validates it is a boolean
    ac: boolean;

    @Field()
    @IsString()
    description: string;

    // 4. IDs: Requires Type decorator to convert "1" (string) to 1 (number).
    @Field(() => Int)
    @Type(() => Number) // <-- ADDED: Converts form-data string to number
    @IsNumber()
    driverId: number;

    @Field(() => Int)
    @Type(() => Number) // <-- ADDED: Converts form-data string to number
    @IsNumber()
    brandId: number;

    @Field(() => Int)
    @Type(() => Number) // <-- ADDED: Converts form-data string to number
    @IsNumber()
    carTypeId: number;
}
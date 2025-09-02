import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BookingStatus } from "../entities/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {

@ApiProperty({ example: 'Banglore', description: 'Pickup location' })
@IsNotEmpty()
PickUpLocation:string


@ApiProperty({ example: 'Mysore', description: 'Drop location' })
@IsNotEmpty()
DropLocation:string

@ApiProperty({ example: '2025-09-02T10:00:00Z', description: 'Date' })
@IsDateString()
Date:string

@ApiProperty({ example: 'Gulfishar', description: 'Name' })
@IsString()
Name:string

@ApiProperty({ example: 'gulfisha@gmail.com', description: 'Email' })
@IsEmail()
Email:string

// @IsNumber()
// driverId:number

// @IsNumber()
// carId:number
@ApiProperty({ example: 'Pending', description: 'Status' })
@IsEnum(BookingStatus)
@IsOptional()
Status?:BookingStatus

}

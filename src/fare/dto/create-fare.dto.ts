import { IsString,IsNumber,IsEnum, IsDateString } from "class-validator";

export class CreateFare{

@IsString()
FromLocation:string

@IsString()
ToLocation:string

@IsString()
currency:string

@IsNumber()
fare:number



@IsNumber()
carId:number


}
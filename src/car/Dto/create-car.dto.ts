import { IsString, IsInt, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  carNo: string;

  @IsString()
  model: string;

  @IsString()
  fuelType: string;

  @IsInt()
  noOfSeats: number;

  @IsBoolean()
  ac: boolean;

  @IsString()
  description: string;

  @IsNumber()
  driverId: number;

  @IsNumber()
  brandId: number;

  @IsNumber()
  carTypeId: number;
}

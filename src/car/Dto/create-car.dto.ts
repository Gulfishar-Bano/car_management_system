import { IsString, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  carNo: string;

  @IsInt()
  carTypeId: number;

  @IsInt()
  brandId: number;

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
}

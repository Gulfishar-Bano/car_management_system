import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Car } from './car.entity';
import { CarTypeModule } from 'src/car-type/car-type.module';
import { CarBrandModule } from 'src/car-brand/car-brand.module';
import { CarBrand } from 'src/car-brand/car_brand.entity';
import { CarType } from 'src/car-type/car-type.entity';
import { Driver } from 'src/driver/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car,CarBrand,CarType,Driver]),AuthModule,CarTypeModule, 
  CarBrandModule],
  controllers: [CarController],
  providers: [CarService],
  exports:[TypeOrmModule]
 
})
export class CarModule {}

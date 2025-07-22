import { Module } from '@nestjs/common';
import { CarBrandController } from './car-brand.controller';
import { CarBrandService } from './car-brand.service';
import { AuthModule } from '../auth/auth.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrand } from './car_brand.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([CarBrand]),AuthModule,HttpModule],
  controllers: [CarBrandController],
  providers: [CarBrandService],
  exports:[CarBrandService]
  
})
export class CarBrandModule {}

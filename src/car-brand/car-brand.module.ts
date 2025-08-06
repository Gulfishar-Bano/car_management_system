import { Module } from '@nestjs/common';
import { CarBrandController } from './car-brand.controller';
import { CarBrandService } from './car-brand.service';
import { AuthModule } from '../auth/auth.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrand } from './car_brand.entity';
import { HttpModule } from '@nestjs/axios';
import { CarBrandResolver } from './car_brand.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([CarBrand]),AuthModule,HttpModule],
  controllers: [CarBrandController],
  providers: [CarBrandService,CarBrandResolver],
  exports:[CarBrandService]
  
})
export class CarBrandModule {}

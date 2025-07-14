import { Module } from '@nestjs/common';
import { CarBrandController } from './car-brand.controller';
import { CarBrandService } from './car-brand.service';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  controllers: [CarBrandController],
  providers: [CarBrandService],
  imports:[AuthModule]
})
export class CarBrandModule {}

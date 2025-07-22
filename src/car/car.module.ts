import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Car } from './car.entity';
import { CarTypeModule } from 'src/car-type/car-type.module';
import { CarBrandModule } from 'src/car-brand/car-brand.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]),AuthModule,CarTypeModule, 
  CarBrandModule],
  controllers: [CarController],
  providers: [CarService],
 
})
export class CarModule {}

import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports:[AuthModule]
})
export class CarModule {}

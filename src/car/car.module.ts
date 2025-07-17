import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Car } from './car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car]),AuthModule],
  controllers: [CarController],
  providers: [CarService],
 
})
export class CarModule {}

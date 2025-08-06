import { Module } from '@nestjs/common';
import { CarTypeController } from './car-type.controller';
import { CarTypeService } from './car-type.service';
import { AuthModule } from '../auth/auth.module'; 
import { CarType } from './car-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarTypeResolver } from './car-type.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([CarType]),AuthModule],
  controllers: [CarTypeController],
  providers: [CarTypeService, CarTypeResolver],
  exports:[CarTypeService]

})
export class CarTypeModule {}

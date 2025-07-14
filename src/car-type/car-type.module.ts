import { Module } from '@nestjs/common';
import { CarTypeController } from './car-type.controller';
import { CarTypeService } from './car-type.service';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  controllers: [CarTypeController],
  providers: [CarTypeService],
  imports:[AuthModule]
})
export class CarTypeModule {}

import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver} from './driver.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [DriverService]
})
export class DriverModule {}

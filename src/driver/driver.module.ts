import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver} from './driver.entity';
import { DriverResolver } from './driver.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [DriverService, DriverResolver]
})
export class DriverModule {}

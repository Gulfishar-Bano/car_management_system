import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FareController } from './fare.controller';
import { FareService } from './fare.service';
import { Fare } from './fare.entity';
import { Car } from 'src/car/car.entity';
import { CarModule } from 'src/car/car.module';
import { MarkupModule } from 'src/markup/markup.module';
import { FareResolver } from './fare.resolver';

@Module({
imports:[TypeOrmModule.forFeature([Fare,Car]),CarModule,MarkupModule],
controllers:[FareController],
providers:[FareService, FareResolver],
exports: [TypeOrmModule]

})
export class FareModule {}

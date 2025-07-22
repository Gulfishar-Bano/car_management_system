import { Module } from '@nestjs/common';
import { CarBrandExternalController } from './car_brand_external.controller';
import { CarBrandExternalService } from './car_brand_external.service';
import { HttpModule } from '@nestjs/axios';

@Module({
imports:[HttpModule],
controllers:[CarBrandExternalController],
providers:[CarBrandExternalService],
exports:[CarBrandExternalService]

})
export class CarBrandExternalModule {}

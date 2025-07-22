import { Controller, Query,Get } from '@nestjs/common';
import { CarBrandExternalService } from './car_brand_external.service';

@Controller('car-brand-external')
export class CarBrandExternalController {

constructor(private readonly carBrandExternalService:CarBrandExternalService){}


@Get('list')
getcars(@Query('make') make:string){
 return this.carBrandExternalService.getCarsByMake(make)
}

}

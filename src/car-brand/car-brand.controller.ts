import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Car } from 'src/car/car.entity';
import { CarBrand } from './car_brand.entity';

//@UseGuards(AuthGuard)
UseGuards(JwtAuthGuard)
@Controller('car-brand')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

 
  @Get('list')
  getALl():Promise<CarBrand[]>
  {
 return this.carBrandService.GetAll();
  }

  @Get('list/:id')
  getById(@Param('id') id:string):Promise<CarBrand|null>{
    return this.carBrandService.GetById(+id)
  }

  @Post('create')
  Create(@Body() Dto:CreateBrandDto):Promise<CarBrand>{
    return this.carBrandService.Create(Dto)
  }

  @Put('update/:id')
  Update(@Param('id') id:string ,@Body() Dto:UpdateBrandDto):Promise<CarBrand|null>{
   return this.carBrandService.Update(+id,Dto);
  }

  @Delete('delete/:id')
  Delete(@Param('id') id:string):Promise<string>{
    return this.carBrandService.Delete(+id)
  }



 







  // @Get('list')
  // getAll() {
  //   return this.carBrandService.getAll();
  // }

  // @Post('create')
  // create(@Body() dto: CreateBrandDto) {
  //   return this.carBrandService.create(dto);
  // }

  // @Put('update/:id')
  // update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
  //   return this.carBrandService.update(+id, dto);
  // }

  // @Delete('delete/:id')
  // delete(@Param('id') id: string) {
  //   return this.carBrandService.delete(+id);
  // }
}

import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Car } from 'src/car/car.entity';
import { CarBrand } from './car_brand.entity';
import { RolesGuard } from 'src/jwt-auth/roles.guard';
import { Roles } from 'src/jwt-auth/roles.decorator';

// @UseGuards(AuthGuard)


// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles('admin')
@Controller('car-brand')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  

  @Get('list')
  getAll(){
    return this.carBrandService.GetAll()
  }

  @Get('list/:id')
  GetById(@Param('id') id:number){
    return this.carBrandService.GetById(+id);
  }

  @Post('create')
  Create(@Body() Dto:CreateBrandDto){
    return this.carBrandService.Create(Dto)
  }

  @Put('update/:id')
  update(@Param('id') id:number, @Body() Dto:UpdateBrandDto){
    return this.carBrandService.Update(id,Dto)
  }

  @Delete('delete/:id')
  delete(@Param('id') id:number){
    return this.carBrandService.Delete(id)
  }


  
 


}
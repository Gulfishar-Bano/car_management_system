import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';


import { CarService } from './car.service';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Car } from './car.entity';

// @UseGuards(AuthGuard)
@UseGuards(JwtAuthGuard)

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('list')
  getAll():Promise<Car[]>{
    return this.carService.GetAll();
  }

  @Get('list/:id')
  getById(@Param('id') id:string):Promise<Car|null>{
    return this.carService.GetByCarNo(+id);
  }

  @Post('create')
  create(@Body() Dto:CreateCarDto):Promise<Car>{
    return this.carService.Create(Dto)
  }
 
  @Put('update/:id')
  Update(@Param('id') id:string ,@Body() Dto:UpdateCarDto):Promise<Car|null>{
   return this.carService.Update(+id,Dto);
  }

  @Delete('delete/:id')
  Delete(@Param('id') id:string):Promise<string>{
    return this.carService.Delete(+id)
  }

  

  // @Get('list')
  // getAll() {
  //   return this.carService.getAll();
  // }

  // @Get('view/:id')
  // getOne(@Param('id') id: string) {
  //   return this.carService.getOne(+id);
  // }

  // @Post('create')
  // create(@Body() createDto: CreateCarDto) {
  //   return this.carService.create(createDto);
  // }

  // @Put('update/:id')
  // update(@Param('id') id: string, @Body() updateDto: UpdateCarDto) {
  //   return this.carService.update(+id, updateDto);
  // }

  // @Delete('delete/:id')
  // delete(@Param('id') id: string) {
  //   return this.carService.delete(+id);
  // }
}

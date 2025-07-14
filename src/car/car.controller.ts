import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';


import { CarService } from './car.service';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getAll() {
    return this.carService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.carService.getOne(+id);
  }

  @Post()
  create(@Body() createDto: CreateCarDto) {
    return this.carService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCarDto) {
    return this.carService.update(+id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.carService.delete(+id);
  }
}

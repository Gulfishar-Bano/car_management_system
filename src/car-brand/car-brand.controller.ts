import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards } from '@nestjs/common';
import { CarBrandService } from './car-brand.service';
import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)

@Controller('car-brand')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @Get()
  getAll() {
    return this.carBrandService.getAll();
  }

  @Post()
  create(@Body() dto: CreateBrandDto) {
    return this.carBrandService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    return this.carBrandService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.carBrandService.delete(+id);
  }
}

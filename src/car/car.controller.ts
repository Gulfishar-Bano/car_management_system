import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards ,BadRequestException,UseInterceptors, UploadedFile} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Car } from './car.entity';
import { RolesGuard } from 'src/jwt-auth/roles.guard';
import { Roles } from 'src/jwt-auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import * as Express from 'express'; // Required for type resolution


// @UseGuards(AuthGuard)
//@UseGuards(JwtAuthGuard)
//@UseGuards(JwtAuthGuard,RolesGuard)
@ApiBearerAuth()
//@Roles('admin')
 
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('list')
  getAll():Promise<Car[]>{
    return this.carService.getAll();
  }

  @Get('list/:id')
  getById(@Param('id') id:string):Promise<Car|null>{
    return this.carService.getById(+id);
  }
 
 @Post('create')
@UseInterceptors(FileInterceptor('image'))  
async create(
  @UploadedFile() file: any,
  @Body() dto: CreateCarDto,                
) {
  console.log("DTO received:", dto);
  console.log("File received:", file);
  return this.carService.create(dto, file);
}


 @Put('update/:id')
@UseInterceptors(FileInterceptor('image'))
async update(
  @Param('id') id: string,
  @UploadedFile() file: any,
  @Body() dto: any
) {
  console.log("Update DTO:", dto);
  console.log("Update File:", file);

  return this.carService.Update(+id, dto, file);
}


  @Delete('delete/:id')
 Delete(@Param('id') id:string){
  
 
  return this.carService.delete(+id);

 }


  
}
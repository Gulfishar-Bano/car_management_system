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
  @UploadedFile() file: any,// File is expected via the 'image' field
  @Body() dto: CreateCarDto,                
) {
  return this.carService.create(dto, file);
}


  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image')) // <-- ADDED: Intercept file on update
  update(
      @Param('id') id:string, 
      @UploadedFile() file: any, // <-- ADDED: Capture optional file
      @Body() dto:UpdateCarDto
    ){
    // <-- MODIFIED: Pass the file object to the service
    return this.carService.Update(+id, dto, file); 
  }

  @Delete('delete/:id')
 Delete(@Param('id') id:string){
  
  // The service layer will handle finding the car and deleting the associated file.
  return this.carService.delete(+id);

 }


  
}
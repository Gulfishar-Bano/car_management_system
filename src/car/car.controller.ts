import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards ,BadRequestException} from '@nestjs/common';
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
    return this.carService.getAll();
  }

  @Get('list/:id')
  getById(@Param('id') id:string):Promise<Car|null>{
    return this.carService.getById(+id);
  }
 
  @Post('create')
  async create(@Body() dto:CreateCarDto){
return this.carService.create(dto)
    
  }

  @Put('update/:id')
  update(@Param('id') id:string , @Body() dto:UpdateCarDto){
    return this.carService.update(+id,dto);
  }

  @Delete('delete/:id')
 Delete(@Param('id') id:string){
  
  return this.carService.delete(+id);

 }


  
}

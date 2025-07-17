import { Controller, Get, Post, Body ,Put,Param,Delete,UseGuards} from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CarType } from './car-type.entity';

//@UseGuards(AuthGuard)

@UseGuards(JwtAuthGuard)
@Controller('car-type')
export class CarTypeController {

    constructor(private readonly carTypeService: CarTypeService){}


    
    @Get('list')
    getALl():Promise<CarType[]>
    {
   return this.carTypeService.GetAll();
    }
  
    @Get('list/:id')
    getById(@Param('id') id:string){
      return this.carTypeService.GetById(+id)
    }

    @Post('create')
  Create(@Body() Dto:CreateTypeDto):Promise<CarType>{
    return this.carTypeService.Create(Dto)
  }

  @Put('update/:id')
  Update(@Param('id') id:string ,@Body() Dto:UpdateTypeDto):Promise<CarType|null>{
   return this.carTypeService.Update(+id,Dto);
  }

  @Delete('delete/:id')
  Delete(@Param('id') id:string):Promise<string>{
    return this.carTypeService.Delete(+id)
  }

  





    // @Get('list')
    // getAll() {
    //     return this.carTypeService.getAll();
    // }

    // @Post('create')
    // create(@Body() createDto: CreateTypeDto) {

    //     return this.carTypeService.create(createDto);
    // }


    // @Put('update/:id')
    // update(@Param('id') id:string ,@Body() UpdateDto:UpdateTypeDto){
    //     return this.carTypeService.update(+id,UpdateDto);
    // }

    // @Delete('delete/:id')
    // delete(@Param('id') id:string){
    //     return this.carTypeService.delete(+id);
    // }





}

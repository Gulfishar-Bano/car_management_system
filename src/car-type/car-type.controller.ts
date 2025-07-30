import { Controller, Get, Post, Body ,Put,Param,Delete,UseGuards} from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CarType } from './car-type.entity';
import { RolesGuard } from 'src/jwt-auth/roles.guard';
import { Roles } from 'src/jwt-auth/roles.decorator';

//@UseGuards(AuthGuard)


@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('admin')
@Controller('car-type')
export class CarTypeController {

    constructor(private readonly carTypeService: CarTypeService){}


    
    @Get('list')
    getALl():Promise<CarType[]>
    {
   return this.carTypeService.getAll();
    }
  
    @Get('list/:id')
    getById(@Param('id') id:string):Promise<CarType|null>{
      return this.carTypeService.getById(+id)
    }

    @Post('create')
  Create(@Body() Dto:CreateTypeDto):Promise<string>{
    return this.carTypeService.create(Dto)
  }

  @Put('update/:id')
  Update(@Param('id') id:string ,@Body() Dto:UpdateTypeDto):Promise<string>{
   return this.carTypeService.update(+id,Dto);
  }

  @Delete('delete/:id')
  Delete(@Param('id') id:string):Promise<string>{
    return this.carTypeService.delete(+id)
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

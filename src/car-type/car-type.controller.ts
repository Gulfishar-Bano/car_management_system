import { Controller, Get, Post, Body ,Put,Param,Delete,UseGuards} from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

//@UseGuards(AuthGuard)

@UseGuards(JwtAuthGuard)
@Controller('car-type')
export class CarTypeController {

    constructor(private readonly carTypeService: CarTypeService) { }

    @Get('list')
    getAll() {
        return this.carTypeService.getAll();
    }

    @Post('create')
    create(@Body() createDto: CreateTypeDto) {

        return this.carTypeService.create(createDto);
    }


    @Put('update/:id')
    update(@Param('id') id:string ,@Body() UpdateDto:UpdateTypeDto){
        return this.carTypeService.update(+id,UpdateDto);
    }

    @Delete('delete/:id')
    delete(@Param('id') id:string){
        return this.carTypeService.delete(+id);
    }





}

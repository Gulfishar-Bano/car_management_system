import { Controller, Get, Post, Body ,Put,Param,Delete,UseGuards} from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)


@Controller('car-type')
export class CarTypeController {

    constructor(private readonly carTypeService: CarTypeService) { }

    @Get()
    getAll() {
        return this.carTypeService.getAll();
    }

    @Post()
    create(@Body() createDto: CreateTypeDto) {

        return this.carTypeService.create(createDto);
    }


    @Put(':id')
    update(@Param('id') id:string ,@Body() UpdateDto:UpdateTypeDto){
        return this.carTypeService.update(+id,UpdateDto);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.carTypeService.delete(+id);
    }





}

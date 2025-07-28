import { Body, Controller,Get,Post,Param,Put, Delete, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriver } from './Dto/create-driver.dto';
import { UpdateDriver } from './Dto/update-driver.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('driver')
export class DriverController {

constructor(

    private readonly DriverService:DriverService
){}

@Get('list')
FindAll(){
    return this.DriverService.findAll()
}

@Get('list/:id')
FindOne(@Param('id') id:string  ){
    return this.DriverService.findOne(+id)
}

@Post('create')
Create(@Body() dto:CreateDriver){
    return this.DriverService.create(dto)
}

@Put('update/:id')
update(@Param('id') id:string ,@Body() dto:UpdateDriver)
{
    return this.DriverService.Update(+id,dto)
}

@Delete('delete/:id')
delete (@Param('id') id:string ){
    return this.DriverService.remove(+id)
}


}

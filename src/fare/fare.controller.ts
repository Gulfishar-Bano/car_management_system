import { Controller ,Body,Post,Get,Param, Query, Delete,Put} from '@nestjs/common';
import { FareService } from './fare.service';
import { CreateFare } from './dto/create-fare.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/jwt-auth/roles.decorator';
import { RolesGuard } from 'src/jwt-auth/roles.guard';


// @UseGuards(JwtAuthGuard,RolesGuard)
// @Roles('admin')
@Controller('fare')
export class FareController {

    constructor(
        private readonly FareService:FareService
    ){}


    @Post('create')
    create(@Body() dto:CreateFare){
        return this.FareService.create(dto)
    }


    
    @Put('update/:id')
    update(@Param('id') id:string ,@Body() dto:any)
    {
        return this.FareService.Update(+id,dto)
    }
 
    @Get('list')
    findAll(){
     return this.FareService.findAll()
    }

    @Get('amount/:fare')
    findByAmount(@Param('fare') id:string){
        return this.FareService.findByAmount(+id)
    }

   @Get('route')
   findByLocation(@Query('from') from:string,@Query('to') to:string){
    
    return this.FareService.findByLocation(from,to)

   }


   @Delete('delete/:id')
   Delete(@Param('id') id:string){

    return this.FareService.delete(+id)
   }
}

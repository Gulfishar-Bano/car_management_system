import { Controller,Post,Body,Get,Put } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import { Param } from '@nestjs/common';

@Controller('jwt-auth')
export class JwtAuthController {
    constructor(private readonly JwtauthService:JwtAuthService){}

   @Post('signup')
   signUp(@Body() Dto:CreateUserDto){
    return this.JwtauthService.signup(Dto)
   }

   @Post('login')
   login(@Body() dto:loginDto){
    return this.JwtauthService.login(dto);
   }

     @Post('logout')
   logout(@Body() dto:loginDto){
    return this.JwtauthService.logout();
   }

   @Get('users')
   Users(){
    return this.JwtauthService.users();
   }


   @Put('toggle/:id')
   ToggleStatus(@Param('id') id:number){
    return this.JwtauthService.toggleStatus(id);
   }

   @Post('update')
   Update(@Body() id:number , role:any){
    return this.JwtauthService.updateRole(id,role);
   }

   @Get('dashboard')
    Stats(){
   return this.JwtauthService.getDashboardStats();
    }
   

}

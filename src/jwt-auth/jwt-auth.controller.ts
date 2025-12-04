import { Controller,Post,Body } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';

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



}

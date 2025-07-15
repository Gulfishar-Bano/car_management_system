import { Controller,Post,Body } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';

@Controller('jwt-auth')
export class JwtAuthController {
    constructor(private readonly JwtauthService:JwtAuthService){}

    @Post('login')
    login(@Body() body:{username:string , password:string}){
        console.log("login hit")
      return this.JwtauthService.login(body.username,body.password);
    }


}

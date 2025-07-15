import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';

@Injectable()
export class JwtAuthService {
 
    constructor(private readonly jwtService:JwtService){}

    private users=[{username:"admin",password:"admin"}];


    login(username:string,password:string){
  
        const user=this.users.find(
            u=>u.username===username && u.password===password
        );
        if (!user) throw new UnauthorizedException("invalid credentials ");

        const payload={username:user.username}
        const token=this.jwtService.sign(payload);

        return{
            Message:"login successfull",
            token,
        };
    
    }

   


    
}
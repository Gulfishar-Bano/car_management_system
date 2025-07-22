import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';


@Injectable()
export class JwtAuthService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository:Repository<User>,

        private readonly jwtService:JwtService){}

    async signup(Dto:CreateUserDto){
       const existing=await this.UserRepository.findOneBy({email:Dto.email})

       if(existing) throw new BadRequestException("Email already exists")

       const user=this.UserRepository.create(Dto)
       return await this.UserRepository.save(user);

    }


    async login(Dto:loginDto){
        
        const user=await this.UserRepository.findOneBy({email:Dto.email})
        
        if (!user || user.password!==Dto.password) throw new UnauthorizedException("invalid credentials ");

        const payload={sub:user.id,email:user.email}
        const token=this.jwtService.sign(payload);

        return{
            Message:"login successfull",
            token,
        };
    
    }

   
}
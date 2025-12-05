import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtAuthService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository:Repository<User>,

        private readonly jwtService:JwtService){}

    async signup(Dto:CreateUserDto){
       const existing=await this.UserRepository.findOneBy({email:Dto.email})

       if(existing) throw new BadRequestException("Email already exists")

       const user=this.UserRepository.create(
       { name: Dto.Name, // This maps the DTO's 'Name' to the entity's 'name'
        email: Dto.email,
        password: Dto.password,
        role:UserRole.USER}
       );
       
       return await this.UserRepository.save(user);

    }



async login(Dto: loginDto) {

    const user = await this.UserRepository.findOneBy({ email: Dto.email });
    
   
    if (!user) {
        throw new UnauthorizedException("Invalid credentials");
    }

    
   

  
    const payload = {
        name: user.name,       
        username: user.email, 
        sub: user.id, 
        role: user.role
    };
    
   
    const token = this.jwtService.sign(payload);

    return {
        Message: "Login successful",
        token,
    };
}

async logout() {
  return { message: "Logout successful" };
}


   
}
import { Injectable,BadRequestException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import * as fs from 'fs';
import * as path from 'path';
import { json } from 'stream/consumers';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarType } from './car-type.entity';

@Injectable()
export class CarTypeService {
 
    constructor(
        @InjectRepository(CarType)
        private readonly car_TypeRepo:Repository<CarType>
        ){}
      
        async GetAll():Promise< CarType[]>{
          return await this.car_TypeRepo.find();
        }
      
        async GetById(id:number):Promise<CarType|null>{
      
          return await this.car_TypeRepo.findOneBy({id})
        }
      
        async Create(Dto:CreateTypeDto):Promise<CarType>{
          const newcar= this.car_TypeRepo.create(Dto)
          
       return await this.car_TypeRepo.save(newcar)
      
        }

        
  async Update(id:number,Dto:UpdateTypeDto):Promise<CarType|null>{

    const car_type=await this.car_TypeRepo.findOneBy({id})

    if(!car_type) throw new BadRequestException("Brand Not found")

    Object.assign(car_type,Dto);
    return await this.car_TypeRepo.save(car_type);
  }

  async Delete(id:number):Promise<string>{
    const car_type=await this.car_TypeRepo.findOneBy({id})

    if(!car_type) throw new BadRequestException("Car brand not found")

   await this.car_TypeRepo.delete(car_type)
   return `the brand with id ${id} is deleted `
  }
 

       
      
        
      





//     private filePath = path.join(process.cwd(), 'src', 'car-type', 'data', 'car-type.json');


// private readData()
// {
//     return JSON.parse(fs.readFileSync(this.filePath,'utf-8'));
// }

// private writeData(data){
//     fs.writeFileSync(this.filePath,JSON.stringify(data,null,2));

// }

// getAll(){
//     return this.readData();
// }

// create(createDto: CreateTypeDto) {
//     const types = this.readData();
//     const newId = types.length > 0 ? types[types.length - 1].id + 1 : 1;
//     const newType = { id: newId, ...createDto };
//     types.push(newType);
//     this.writeData(types);
//     return newType;
//   }
  

//  update(id:number,updateDto:UpdateTypeDto){
//     const types=this.readData();
//     const index=types.findIndex((t)=>t.id===id);
//     if(index===-1) return {message:'Type not found'}
//     types[index]={...types[index],...updateDto};
//      this.writeData(types);
//      return types[index];
//  }

//  delete(id: number) {
//     const types = this.readData();
//     const updated = types.filter((t) => t.id !== id);
  
//     console.log('Before:', types);
//     console.log('After:', updated);
  
//     this.writeData(updated); 
  
//     return { message: `Deleted type with ID ${id}` };
//   }
  
 
}

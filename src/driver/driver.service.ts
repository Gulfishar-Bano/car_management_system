import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriver } from './Dto/create-driver.dto';
import { UpdateDriver } from './Dto/update-driver.dto';

@Injectable()
export class DriverService {

    constructor(
    @InjectRepository(Driver)
    private driverRepo:Repository<Driver>

    ){}


    async create(dto:CreateDriver){
      const NewDriver=this.driverRepo.create(dto)
      return this.driverRepo.save(NewDriver);
    }


    async findAll(){
        return await this.driverRepo.find({relations:['cars']})
    }


    async findOne(id:number){
      const driver=await this.driverRepo.findOne({where:{id},relations:['cars']})
      if(!driver) throw new BadRequestException("Driver not found")
      return driver
    }

    async Update(id:number,dto:UpdateDriver){
    await this.findOne(id)
    await this.Update(id,dto)
    return this.findOne(id)
    }

    async remove(id:number){

        const deleted=await this.findOne(id)
        return this.driverRepo.remove(deleted)
    }



}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import { Car } from './car.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CarBrand } from 'src/car-brand/car_brand.entity';
import { CarType } from 'src/car-type/car-type.entity';
import { Driver } from 'src/driver/driver.entity';


@Injectable()
export class CarService {

  constructor(private readonly datasource: DataSource,
    @InjectRepository(Car)
      private readonly carRepo:Repository<Car>,
    
      @InjectRepository(CarBrand)
      private readonly CarBrandRepo:Repository<CarBrand>,

      @InjectRepository(CarType)
      private readonly CarTypeRepo:Repository<CarType>,


      @InjectRepository(Driver)
      private readonly DriverRepo:Repository<Driver>
    ) { }


  async getAll() {
    return this.carRepo.find({
      relations:['carType','brand','driver']
    })
  }

  async getById(id: number):Promise<Car|null> {
     const result=await this.datasource.query(`select * from car where id=?`, [id]);
     return  result[0]|| null;
  } 


  async Update(id: number, dto: UpdateCarDto) {
    const car = await this.carRepo.findOne({
      where: { id },
      relations: ['brand', 'carType', 'driver'],
    });
  
    if (!car) throw new BadRequestException("Car not found");
  
    // Assign scalar fields
    Object.assign(car, {
      carNo: dto.carNo ?? car.carNo,
      model: dto.model ?? car.model,
      fuelType: dto.fuelType ?? car.fuelType,
      noOfSeats: dto.noOfSeats ?? car.noOfSeats,
      ac: dto.ac ?? car.ac,
      description: dto.description ?? car.description,
    });
  
    // Handle relations
    if (dto.brand) {
      const brand = await this.CarBrandRepo.findOneBy({ id: dto.brand });
      if (!brand) throw new BadRequestException("Brand not found");
      car.brand = brand;
    }
  
    if (dto.carType) {
      const type = await this.CarTypeRepo.findOneBy({ id: dto.carType });
      if (!type) throw new BadRequestException("Car type not found");
      car.carType = type;
    }
  
    if (dto.driverId) {
      const driver = await this.DriverRepo.findOneBy({ id: dto.driverId });
      if (!driver) throw new BadRequestException("Driver not found");
      car.driver = driver;
    }
  
    return this.carRepo.save(car);
  }
  
  
  
  async create(dto:CreateCarDto){
    console.log("create called")
    const driver=await this.DriverRepo.findOneBy({id:dto.driverId})
    console.log(dto.driverId)
    if(!driver) throw new BadRequestException("Driver not found")

    const brand=await this.CarBrandRepo.findOneBy({id:dto.brandId})
    if(!brand) throw new BadRequestException("brand not found")
console.log(dto.brandId)
    const carType=await this.CarTypeRepo.findOneBy({id:dto.carTypeId})
    if(!carType) throw new BadRequestException("Type not found")

    const newCar = this.carRepo.create({
      ...dto,
      driver,
      brand,
    carType,
    });
    
    console.log(dto.carTypeId)
    

  return this.carRepo.save(newCar);

  }


  async delete(id:number){
    const exist=await this.getById(id);
    console.log(exist)
    if(!exist) throw new BadRequestException(`car with ${id} not found`)
    await this.datasource.query(`delete from car where id=?`,[id]);
    return `car with ${id} deleted successfully`
  }

  
}


  





















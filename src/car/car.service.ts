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
    return await this.datasource.query(`select * from car`);
  }

  async getById(id: number):Promise<Car|null> {
     const result=await this.datasource.query(`select * from car where id=?`, [id]);
     return  result[0]|| null;
  } 

  async update(id: number, dto: UpdateCarDto) {
    await this.datasource.query(`update car set carNo=? ,carTypeId=?,brandId=?,model=?,fuelType=?,noOfSeats=?,ac=?,description=? where id=?`,[dto.carNo,dto.carTypeId,dto.brandId,dto.model,dto.fuelType,dto.noOfSeats,dto.ac,dto.description,id]);
    return `car with ${id} is updated`;
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

  



  //   constructor(
  //     @InjectRepository(Car)
  //     private readonly carRepo:Repository<Car>,

  //   ){}


  //   async GetAll():Promise<Car[]>{
  //     return await this.carRepo.find();
  //   }

  //   async GetByCarNo(id:number):Promise<Car|null>{

  //     return await this.carRepo.findOneBy({id})
  //   }

  //   async Create(Dto:CreateCarDto):Promise<Car>{
  //     const newcar= this.carRepo.create(Dto)

  //  return await this.carRepo.save(newcar)

  //   }

  //   async Update(id:number,Dto:UpdateCarDto):Promise<Car|null>{

  //     const car=await this.carRepo.findOneBy({id})

  //     if(!car) throw new BadRequestException("car not found")

  //     Object.assign(car,Dto);
  //     return await this.carRepo.save(car);
  //   }

  //   async Delete(id:number):Promise<string>{
  //     const car=await this.carRepo.findOneBy({id})

  //     if(!car) throw new BadRequestException("Car  not found")

  //    await this.carRepo.delete(car)
  //    return `the brand with id ${id} is deleted `
  //   }





























  // private carFile = path.join(process.cwd(), 'src', 'car', 'data', 'car.json');
  // private brandFile = path.join(process.cwd(), 'src', 'car-brand', 'data', 'car-brand.json');
  // private typeFile = path.join(process.cwd(), 'src', 'car-type', 'data', 'car-type.json');

  // private readJson(filePath: string) {
  //   if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  //   return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  // }

  // private writeJson(filePath: string, data: any) {
  //   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  // }

  // getAll() {
  //   const cars = this.readJson(this.carFile);
  //   const types = this.readJson(this.typeFile);
  //   const brands = this.readJson(this.brandFile);

  //   return cars.map(car => ({
  //     ...car,
  //     carTypeName: types.find(t => t.id === car.carTypeId)?.name || 'Unknown Type',
  //     brandName: brands.find(b => b.id === car.brandId)?.name || 'Unknown Brand',
  //   }));
  // }

  // create(createDto: CreateCarDto) {
  //   const cars = this.readJson(this.carFile);
  //   const types = this.readJson(this.typeFile);
  //   const brands = this.readJson(this.brandFile);

  //   // Optional: Validate type/brand existence
  //   if (!types.find(t => t.id === createDto.carTypeId)) {
  //     throw new NotFoundException('Car type ID does not exist');
  //   }
  //   if (!brands.find(b => b.id === createDto.brandId)) {
  //     throw new NotFoundException('Car brand ID does not exist');
  //   }

  //   const newCar = {
  //     id: Date.now(), 
  //     ...createDto,
  //   };
  //   cars.push(newCar);
  //   this.writeJson(this.carFile, cars);
  //   return newCar;
  // }

  // update(id: number, updateDto: UpdateCarDto) {
  //   const cars = this.readJson(this.carFile);
  //   const index = cars.findIndex(c => c.id === id);
  //   if (index === -1) throw new NotFoundException('Car not found');
  //   cars[index] = { ...cars[index], ...updateDto };
  //   this.writeJson(this.carFile, cars);
  //   return cars[index];
  // }

  // delete(id: number) {
  //   const cars = this.readJson(this.carFile);
  //   const updatedCars = cars.filter(c => c.id !== id);
  //   if (cars.length === updatedCars.length) throw new NotFoundException('Car not found');
  //   this.writeJson(this.carFile, updatedCars);
  //   return { message: `Deleted car with ID ${id}` };
  // }

  // getOne(id: number) {
  //   const cars = this.readJson(this.carFile);
  //   const car = cars.find(c => c.id === id);
  //   if (!car) throw new NotFoundException('Car not found');
  //   return car;
  // }
}

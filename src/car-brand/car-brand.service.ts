import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarBrand } from './car_brand.entity';



@Injectable()
export class CarBrandService {


  constructor(
    @InjectRepository(CarBrand)
    private readonly car_BrandRepo: Repository<CarBrand>) { }


  async GetAll(): Promise<CarBrand[]> {
    return await this.car_BrandRepo.find();
  }

  async GetById(id: number): Promise<CarBrand | null> {

    return await this.car_BrandRepo.findOneBy({ id })
  }

  async Create(Dto: CreateBrandDto): Promise<CarBrand> {
    const newcar = this.car_BrandRepo.create(Dto)

    return await this.car_BrandRepo.save(newcar)

  }

  async Update(id: number, Dto: UpdateBrandDto): Promise<CarBrand | null> {

    const car_brand = await this.car_BrandRepo.findOneBy({ id })

    if (!car_brand) throw new BadRequestException("Brand Not found")

    Object.assign(car_brand, Dto);
    return await this.car_BrandRepo.save(car_brand);
  }

  async Delete(id: number): Promise<string> {
    const car_brand = await this.car_BrandRepo.findOneBy({ id })

    if (!car_brand) throw new BadRequestException("Car brand not found")

    await this.car_BrandRepo.delete(id)
    return `the brand with id ${id} is deleted `
  }

}

  
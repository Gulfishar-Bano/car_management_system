import { Injectable,BadRequestException } from '@nestjs/common';

import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarBrand } from './car_brand.entity';
import { DataSource } from 'typeorm';
import { Car } from 'src/car/car.entity';


@Injectable()
export class CarBrandService {

  //using Raw sql (datasource)

  constructor (private readonly dataSource:DataSource){}

  async getAll():Promise<CarBrand[]>{

    return await this.dataSource.query(`select * from car_brand`)

  }

  async getById(id:number):Promise<CarBrand|null>{
     const result=await this.dataSource.query(`select * from car_brand where id=?`,[id]);
     return result[0]||null
  } 

  async create(Dto:CreateBrandDto):Promise<string>{

    await this.dataSource.query(`insert into car_brand(name) values (?)`,[Dto.name]);
    return 'car brand is added'
  }

  async update(id:number,Dto:UpdateBrandDto):Promise<string>{
    const updatedItem= await this.dataSource.query(`update car_brand set name=? where id=? `,[Dto.name,id]);
   
    return `the brand with ${id} is updated`;

  }

	async delete(id: number): Promise<string> {
		const deleted=await this.getById(id);

    if(!deleted) throw new BadRequestException(`car brand with ${id} not exists`)
	
		await this.dataSource.query(`DELETE FROM car_brand WHERE id = ?`, [id]);
	
		return `The car brand with ${id} is deleted successfully`;
	}
	

	
	



    //using typeOrm methods
  // @InjectRepository(CarBrand)
  // private readonly car_BrandRepo:Repository<CarBrand>
  // ){}

//   async GetAll():Promise<CarBrand[]>{
//     return await this.car_BrandRepo.find();
//   }

//   async GetById(id:number):Promise<CarBrand|null>{

//     return await this.car_BrandRepo.findOneBy({id})
//   }

//   async Create(Dto:CreateBrandDto):Promise<CarBrand>{
//     const newcar= this.car_BrandRepo.create(Dto)
    
//  return await this.car_BrandRepo.save(newcar)

//   }

//   async Update(id:number,Dto:UpdateBrandDto):Promise<CarBrand|null>{

//     const car_brand=await this.car_BrandRepo.findOneBy({id})

//     if(!car_brand) throw new BadRequestException("Brand Not found")

//     Object.assign(car_brand,Dto);
//     return await this.car_BrandRepo.save(car_brand);
//   }

//   async Delete(id:number):Promise<string>{
//     const car_brand=await this.car_BrandRepo.findOneBy({id})

//     if(!car_brand) throw new BadRequestException("Car brand not found")

//    await this.car_BrandRepo.delete(car_brand)
//    return `the brand with id ${id} is deleted `
//   }
 


//using json database

  
  //   private filePath = path.join(process.cwd(), 'src', 'car-brand', 'data', 'car-brand.json');
  // private readData() {

  //   return JSON.parse(fs.readFileSync(this.filePath, 'utf8') || '[]');
  // }

  // private writeData(data) {
  //   fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  // }

  // getAll() {
  //   return this.readData();
  // }

  // create(createDto: CreateBrandDto) {
  //   const types = this.readData();
  //   const newId = types.length > 0 ? Number(types[types.length - 1].id) + 1 : 1;
  //   const newType = { id: newId, ...createDto };
  //   types.push(newType);
  //   this.writeData(types);
  //   return newType;
  // }

  // update(id: number, updateDto: UpdateBrandDto) {
  //   const brands = this.readData();
  //   const index = brands.findIndex((b) => b.id === id);
  //   if (index === -1) return { message: 'Brand not found' };
  //   brands[index] = { ...brands[index], ...updateDto };
  //   this.writeData(brands);
  //   return brands[index];
  // }

  // delete(id: number) {
  //   const brands = this.readData();
  //   const updated = brands.filter((b) => b.id !== id);
  //   this.writeData(updated);
  //   return { message: `Deleted brand with ID ${id}` };
  // }

  
}

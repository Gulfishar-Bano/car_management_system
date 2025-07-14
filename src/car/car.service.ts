import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CarService {
  private carFile = path.join(process.cwd(), 'src', 'car', 'data', 'car.json');
  private brandFile = path.join(process.cwd(), 'src', 'car-brand', 'data', 'car-brand.json');
  private typeFile = path.join(process.cwd(), 'src', 'car-type', 'data', 'car-type.json');

  private readJson(filePath: string) {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  private writeJson(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  getAll() {
    const cars = this.readJson(this.carFile);
    const types = this.readJson(this.typeFile);
    const brands = this.readJson(this.brandFile);

    return cars.map(car => ({
      ...car,
      carTypeName: types.find(t => t.id === car.carTypeId)?.name || 'Unknown Type',
      brandName: brands.find(b => b.id === car.brandId)?.name || 'Unknown Brand',
    }));
  }

  create(createDto: CreateCarDto) {
    const cars = this.readJson(this.carFile);
    const types = this.readJson(this.typeFile);
    const brands = this.readJson(this.brandFile);

    // Optional: Validate type/brand existence
    if (!types.find(t => t.id === createDto.carTypeId)) {
      throw new NotFoundException('Car type ID does not exist');
    }
    if (!brands.find(b => b.id === createDto.brandId)) {
      throw new NotFoundException('Car brand ID does not exist');
    }

    const newCar = {
      id: Date.now(), // or you can use custom ID logic
      ...createDto,
    };
    cars.push(newCar);
    this.writeJson(this.carFile, cars);
    return newCar;
  }

  update(id: number, updateDto: UpdateCarDto) {
    const cars = this.readJson(this.carFile);
    const index = cars.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException('Car not found');
    cars[index] = { ...cars[index], ...updateDto };
    this.writeJson(this.carFile, cars);
    return cars[index];
  }

  delete(id: number) {
    const cars = this.readJson(this.carFile);
    const updatedCars = cars.filter(c => c.id !== id);
    if (cars.length === updatedCars.length) throw new NotFoundException('Car not found');
    this.writeJson(this.carFile, updatedCars);
    return { message: `Deleted car with ID ${id}` };
  }

  getOne(id: number) {
    const cars = this.readJson(this.carFile);
    const car = cars.find(c => c.id === id);
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }
}

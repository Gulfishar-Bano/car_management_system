import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateBrandDto } from './Dto/create-brand.dto';
import { UpdateBrandDto } from './Dto/update-brand.dto';

@Injectable()
export class CarBrandService {
  
    private filePath = path.join(process.cwd(), 'src', 'car-brand', 'data', 'car-brand.json');
  private readData() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf8') || '[]');
  }

  private writeData(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  getAll() {
    return this.readData();
  }

  create(createDto: CreateBrandDto) {
    const types = this.readData();
    const newId = types.length > 0 ? Number(types[types.length - 1].id) + 1 : 1;
    const newType = { id: newId, ...createDto };
    types.push(newType);
    this.writeData(types);
    return newType;
  }

  update(id: number, updateDto: UpdateBrandDto) {
    const brands = this.readData();
    const index = brands.findIndex((b) => b.id === id);
    if (index === -1) return { message: 'Brand not found' };
    brands[index] = { ...brands[index], ...updateDto };
    this.writeData(brands);
    return brands[index];
  }

  delete(id: number) {
    const brands = this.readData();
    const updated = brands.filter((b) => b.id !== id);
    this.writeData(updated);
    return { message: `Deleted brand with ID ${id}` };
  }
}

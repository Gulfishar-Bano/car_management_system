import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriver } from './Dto/create-driver.dto';
import { UpdateDriver } from './Dto/update-driver.dto';
import { Booking } from 'src/booking/entities/booking.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepo: Repository<Driver>,
   
  ) {}

  async create(dto: CreateDriver): Promise<Driver> {
    const NewDriver = this.driverRepo.create(dto);
    return this.driverRepo.save(NewDriver);
  }

 
  
async findAll(): Promise<Driver[]> {
  // Let TypeORM handle the dates as Date objects based on the Entity definition
  const drivers = await this.driverRepo.find({ relations: ['cars','bookings'] });
  
  return drivers; 
}

  async findOne(id: number) {
    const driver = await this.driverRepo.findOne({
      where: { id },
      relations: ['cars','bookings'],
    });
    if (!driver) throw new BadRequestException('Driver not found');
    return driver;
  }

  async Update(id: number, dto: UpdateDriver): Promise<Driver> {
    const driver = await this.findOne(id);

    // If DTO is { isActive: false }, Object.assign updates *only* that field.
    Object.assign(driver, dto); 
    return this.driverRepo.save(driver);
}

  async remove(id: number): Promise<String> {
    const deleted = await this.findOne(id);
    this.driverRepo.remove(deleted);
    return `Driver ${id} deleted successfully`
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { CreateDriver } from './Dto/create-driver.dto';
import { UpdateDriver } from './Dto/update-driver.dto';

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
    const drivers = await this.driverRepo.find({ relations: ['cars'] });

    // Convert validity to Date if needed (for GraphQL DateTime serialization)
    return drivers.map((driver) => {
      if (driver.validity && typeof driver.validity === 'string') {
        driver.validity = new Date(driver.validity);
        console.log('Driver validity:', driver.validity, typeof driver.validity);

      }
      return driver;
    });
  }

  async findOne(id: number) {
    const driver = await this.driverRepo.findOne({
      where: { id },
      relations: ['cars'],
    });
    if (!driver) throw new BadRequestException('Driver not found');
    return driver;
  }

  async Update(id: number, dto: UpdateDriver): Promise<Driver> {
    const driver = await this.findOne(id);

    Object.assign(driver, dto);
    return this.driverRepo.save(driver);
  }

  async remove(id: number): Promise<String> {
    const deleted = await this.findOne(id);
    this.driverRepo.remove(deleted);
    return `Driver ${id} deleted successfully`
  }
}

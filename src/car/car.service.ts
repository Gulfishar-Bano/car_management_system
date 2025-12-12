import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './Dto/create-car.dto';
import { UpdateCarDto } from './Dto/update-car.dto';
import { Car } from './car.entity';
import * as fs from 'fs'; // <-- RE-ADDED for file system operations
import * as path from 'path'; // <-- RE-ADDED for path resolution
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CarBrand } from 'src/car-brand/car_brand.entity';
import { CarType } from 'src/car-type/car-type.entity';
import { Driver } from 'src/driver/driver.entity';
import * as Express from 'express'; // Keep for type resolution (or use 'any')


@Injectable()
export class CarService {

    constructor(
        private readonly datasource: DataSource,
        @InjectRepository(Car) private readonly carRepo: Repository<Car>,
        @InjectRepository(CarBrand) private readonly CarBrandRepo: Repository<CarBrand>,
        @InjectRepository(CarType) private readonly CarTypeRepo: Repository<CarType>,
        @InjectRepository(Driver) private readonly DriverRepo: Repository<Driver>
    ) { }


    async getAll() {
        return this.carRepo.find({
            relations: ['carType', 'brand', 'driver']
        })
    }

    async getById(id: number): Promise<Car | null> {
        const result = await this.datasource.query(`select * from car where id=?`, [id]);
        return result[0] || null;
    }

async Update(id: number, dto: any, file?:any) {
  // 1️⃣ Fetch existing car with relations
  const car = await this.carRepo.findOne({
    where: { id },
    relations: ['brand', 'carType'],
  });

  if (!car) throw new BadRequestException("Car not found");

  // 2️⃣ Handle image update
  if (file && file.filename) {
    // Delete old image if exists
    if (car.imageUrl) {
      const oldFilePath = path.join(process.cwd(), car.imageUrl);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (err) {
          console.error("Failed to delete old car image:", err);
        }
      }
    }
    car.imageUrl = `/uploads/cars/${file.filename}`;
  }

  // 3️⃣ Update basic fields
  car.model = dto.model ?? car.model;
  car.carNo = dto.carNo ?? car.carNo;
  car.fuelType = dto.fuelType ?? car.fuelType;
  car.description = dto.description ?? car.description;

  // Convert noOfSeats string to number safely
  if (dto.noOfSeats && !isNaN(Number(dto.noOfSeats))) {
    car.noOfSeats = Number(dto.noOfSeats);
  }

  // Convert ac string to boolean
  if (dto.ac === 'true') car.ac = true;
  else if (dto.ac === 'false') car.ac = false;

  // 4️⃣ Update relations using correct IDs
  if (dto.brandId) {
    const brand = await this.CarBrandRepo.findOneBy({ id: Number(dto.brandId) });
    if (!brand) throw new BadRequestException("Brand not found");
    car.brand = brand;
  }

  if (dto.carTypeId) {
    const type = await this.CarTypeRepo.findOneBy({ id: Number(dto.carTypeId) });
    if (!type) throw new BadRequestException("Car type not found");
    car.carType = type;
  }


  // 5️⃣ Save updated car
  return this.carRepo.save(car);
}



    async create(dto: CreateCarDto, file?:any) { // Use Express.Multer.File or 'any'
        console.log("create called")
        const driver = await this.DriverRepo.findOneBy({ id: dto.driverId })
        if (!driver) throw new BadRequestException("Driver not found")

        const brand = await this.CarBrandRepo.findOneBy({ id: dto.brandId })
        if (!brand) throw new BadRequestException("brand not found")

        const carType = await this.CarTypeRepo.findOneBy({ id: dto.carTypeId })
        if (!carType) throw new BadRequestException("Type not found")

        let imageUrl: string | undefined;

        // --- LOGIC: SAVE IMAGE URL ---
        if (file && file.filename) {
            imageUrl = `/uploads/cars/${file.filename}`;
        }
        // -----------------------------

        const newCar = this.carRepo.create({
            ...dto,
            driver,
            brand,
            carType,
            imageUrl,
        });

        return this.carRepo.save(newCar);
    }


    async delete(id: number) {
        // 1. Fetch the car to get the image URL
        const carToDelete = await this.carRepo.findOneBy({ id });

        if (!carToDelete) throw new BadRequestException(`car with ${id} not found`)

        // --- LOGIC: HANDLE IMAGE DELETION ---
        if (carToDelete.imageUrl) {
            const filePath = path.join(process.cwd(), carToDelete.imageUrl);

            if (fs.existsSync(filePath)) {
                try {
                    fs.unlinkSync(filePath);
                } catch (error) {
                    console.error('Failed to delete car image during car deletion:', error);
                }
            }
        }
        // ------------------------------------

        // 2. Delete the record from the database
        await this.carRepo.delete(id); // Using TypeORM's delete method

        return `car with ${id} deleted successfully`
    }
}
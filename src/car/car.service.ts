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


    async Update(id: number, dto: UpdateCarDto, file?:any) { // <-- ADDED file parameter
        const car = await this.carRepo.findOne({
            where: { id },
            relations: ['brand', 'carType', 'driver'],
        });

        if (!car) throw new BadRequestException("Car not found");

        // --- LOGIC: HANDLE IMAGE REPLACEMENT ---
        if (file && file.filename) {
            // 1. Delete the old image file if it exists
            if (car.imageUrl) {
                // Construct the absolute path: ProjectRoot/uploads/cars/filename.ext
                const oldFilePath = path.join(process.cwd(), car.imageUrl);

                if (fs.existsSync(oldFilePath)) {
                    try {
                        fs.unlinkSync(oldFilePath);
                    } catch (error) {
                        console.error('Failed to delete old car image:', error);
                    }
                }
            }
            // 2. Assign the new image URL
            car.imageUrl = `/uploads/cars/${file.filename}`;
        }
        // ------------------------------------------

        // Assign scalar fields (existing logic)
        Object.assign(car, {
            carNo: dto.carNo ?? car.carNo,
            model: dto.model ?? car.model,
            fuelType: dto.fuelType ?? car.fuelType,
            noOfSeats: dto.noOfSeats ?? car.noOfSeats,
            ac: dto.ac ?? car.ac,
            description: dto.description ?? car.description,
        });

        // Handle relations (existing logic)
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
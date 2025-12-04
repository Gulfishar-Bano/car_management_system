import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Car } from './car.entity';
import { CarTypeModule } from 'src/car-type/car-type.module';
import { CarBrandModule } from 'src/car-brand/car-brand.module';
import { CarBrand } from 'src/car-brand/car_brand.entity';
import { CarType } from 'src/car-type/car-type.entity';
import { Driver } from 'src/driver/driver.entity';
import { CarResolver } from './car.resolver';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const editFileName = (req, file, callback) => {
    // Check for missing file
    if (!file) {
        // Return immediately with null error and null filename
        return callback(null, null); 
    }
    
    // Ensure all variables are defined before use
    const fileName = file.originalname;
    const fileExtName = path.extname(fileName);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // Final callback structure
    callback(null, `${file.fieldname}-${uniqueSuffix}${fileExtName}`);
};
@Module({
  imports: [TypeOrmModule.forFeature([Car,CarBrand,CarType,Driver]),AuthModule,CarTypeModule, 
  CarBrandModule,
 MulterModule.register({
        storage: diskStorage({
            // Ensure this folder exists or Multer will throw an error
            destination: './uploads/cars', 
            // Use the helper function for unique file naming
            filename: editFileName,
        }),
        // Optional: Add file filters or size limits here if needed
    }),

],
 
  controllers: [CarController],
  providers: [CarService, CarResolver],
  exports:[TypeOrmModule]
 
})
export class CarModule {}

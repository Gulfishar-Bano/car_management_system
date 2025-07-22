import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { CarTypeModule } from './car-type/car-type.module';
import { CarBrandModule } from './car-brand/car-brand.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { Car } from './car/car.entity';
import { CarBrand } from './car-brand/car_brand.entity';
import { CarType } from './car-type/car-type.entity';
import { CarBrandExternalService } from './car_brand_external/car_brand_external.service';
import { CarBrandExternalController } from './car_brand_external/car_brand_external.controller';
import { CarBrandExternalModule } from './car_brand_external/car_brand_external.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // Load .env file
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // entities: [Car,CarBrand,CarType],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    CarModule,
    CarTypeModule,
    CarBrandModule,
    JwtAuthModule,
    CarBrandExternalModule,
    HttpModule
  ],
  controllers: [AppController, CarBrandExternalController],
  providers: [AppService, CarBrandExternalService],
})
export class AppModule {}

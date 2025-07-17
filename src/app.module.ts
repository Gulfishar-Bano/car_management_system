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
      entities: [Car,CarBrand,CarType],
      synchronize: true,
    }),

    CarModule,
    CarTypeModule,
    CarBrandModule,
    JwtAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

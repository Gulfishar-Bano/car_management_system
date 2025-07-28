import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis'; // ✅ fixed import

import { CarModule } from './car/car.module';
import { CarBrandModule } from './car-brand/car-brand.module';
import { CarTypeModule } from './car-type/car-type.module';
import { DriverModule } from './driver/driver.module';
import { FareModule } from './fare/fare.module';
import { SearchModule } from './search/search.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { MarkupModule } from './markup/markup.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'gulfisha@18',
      database: process.env.DB_NAME || 'car_management',
      autoLoadEntities: true,
      synchronize: true,
    }),

    CacheModule.registerAsync({
      useFactory: async () => ({
        store: redisStore, // ✅ No await, just pass the reference
        host: 'localhost',
        port: 6379,
        ttl: 36000,
      }),
    }),

    CarModule,
    CarBrandModule,
    CarTypeModule,
    DriverModule,
    FareModule,
    SearchModule,
    JwtAuthModule,
    MarkupModule,
  ],
})
export class AppModule {}

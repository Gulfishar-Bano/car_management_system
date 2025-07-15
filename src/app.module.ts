// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CarModule } from './car/car.module';
import { CarTypeModule } from './car-type/car-type.module';
import { CarBrandModule } from './car-brand/car-brand.module';

//import { AuthModule } from './auth/auth.module'; 
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';

@Module({
  imports: [
    CarModule,
    CarTypeModule,
    CarBrandModule,
    JwtAuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}

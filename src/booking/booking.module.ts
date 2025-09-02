import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Car } from 'src/car/car.entity';
import { Driver } from 'src/driver/driver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fare } from 'src/fare/fare.entity';
import { Booking } from './entities/booking.entity';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car,Driver,Fare,Booking]),
MailModule
],
  
  exports:[TypeOrmModule],
 
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

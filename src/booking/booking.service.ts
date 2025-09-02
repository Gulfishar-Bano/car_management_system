import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/car/car.entity';
import { Repository } from 'typeorm';
import { Driver } from 'src/driver/driver.entity';
import { Fare } from 'src/fare/fare.entity';
import { NotFoundException } from '@nestjs/common';
import { Booking, BookingStatus } from './entities/booking.entity';
import { MailService } from './mail/mail.service';


@Injectable()
export class BookingService {

  constructor(
    @InjectRepository(Car) private readonly CarRepo:Repository<Car>,
    @InjectRepository(Driver) private readonly DriverRepo:Repository<Driver>,
    @InjectRepository(Fare) private readonly FareRepo:Repository<Fare>,
    @InjectRepository(Booking) private readonly BookingRepo:Repository<Booking>,
    private readonly MailService:MailService
  ){}

  

  async create(Dto: CreateBookingDto) {
   
    const booking = this.BookingRepo.create({  
      ...Dto,
      Status:BookingStatus.Pending
    });
    return this.BookingRepo.save(booking);
  }
  

  findAll() {
    return this.BookingRepo.find({relations:["car"]});
  }

  findOne(id: number) {
    return this.BookingRepo.findOne({
      where:{id},
      relations:["car"]
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {

    const ValidTransaction:Record<BookingStatus,BookingStatus[]>={

      [BookingStatus.Pending]:[BookingStatus.Confirmed,BookingStatus.Cancelled],
      [BookingStatus.Confirmed]:[BookingStatus.Completed,BookingStatus.Cancelled],
      [BookingStatus.Completed]:[],
      [BookingStatus.Cancelled]:[]
     };
      
    const booking=await this.BookingRepo.findOneBy({id})
    

    if(!booking){
      throw new NotFoundException("Booking not found");
    }

     console.log(updateBookingDto.Status)
    if(updateBookingDto.Status){
      
      const allowed = ValidTransaction[booking.Status];

      if(!allowed.includes(updateBookingDto.Status)){
        throw new BadRequestException(
          `Invalid Status transition ${booking.Status}=>${updateBookingDto.Status}`
        )
      }
    }
    Object.assign(booking,updateBookingDto);
    const UpdatedBooking= await this.BookingRepo.save(booking);

    console.log(updateBookingDto.Status);

    if(updateBookingDto.Status===BookingStatus.Confirmed){
     await this.MailService.SendBookingConfirmation(
     booking.Email,
     '"Car Booking App" <no-reply@yourdomain.com>',
     {name:booking.Name,
      pickup:booking.PickUpLocation,
      drop:booking.DropLocation,
      bookingId:booking.id
     })
    }

    return UpdatedBooking;

  }

  remove(id: number) {
    return this.BookingRepo.delete(id);
  }

  async AssignCarDriver(bookingId:number,carId:number,driverId:number){
    
    const booking=await this.BookingRepo.findOne({where:{id:bookingId}})

    if(!booking){
      throw new NotFoundException ("Booking not found")
    }
    const driver=await this.DriverRepo.findOneBy({id:driverId});

    if(!driver){
      throw new NotFoundException("driver not found")
    }
    booking.driver=driver;

    const car=await this.CarRepo.findOneBy({id:carId});
    if(!car){
      throw new NotAcceptableException("car not found")
    }
    booking.car=car;

    const fare=await this.FareRepo.findOne({where:{
     FromLocation:booking.PickUpLocation,
     ToLocation:booking.DropLocation
    }})

    if(!fare){
      throw new NotFoundException("Fare not found");
    }
    booking.fare=fare
    return await this.BookingRepo.save(booking);

  }




}

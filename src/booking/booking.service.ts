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
   private readonly mailService:MailService
  ){}

  

  async create(Dto: CreateBookingDto) {
  
    const car = await this.CarRepo.findOne({ where: { id: Dto.carId } });
    
    if (!car) {
        throw new NotFoundException(`Car with ID ${Dto.carId} not found.`);
    }

   
    const fare = await this.FareRepo.findOne({ where: { id: Dto.fareId } });
    
    if (!fare) {
        throw new NotFoundException(`Fare with ID ${Dto.fareId} not found.`);
    }
    
    
    const booking = this.BookingRepo.create({  
      ...Dto,
    
      car: car,
      fare: fare, 
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
     await this.mailService.sendBookingConfirmation(booking)
    console.log("mail sent ")
    }

    return UpdatedBooking;

  }

  remove(id: number) {
    return this.BookingRepo.delete(id);
  }

async AssignCarDriver(bookingId: number, driverId: number) {
  // 1. Fetch booking with all necessary relations for the email
  const booking = await this.BookingRepo.findOne({ 
    where: { id: bookingId }, 
    relations: ['car', 'fare'] 
  });
  if (!booking) throw new NotFoundException('Booking not found');

  // 2. Find the driver
  const driver = await this.DriverRepo.findOneBy({ id: driverId });
  if (!driver) throw new NotFoundException('Driver not found');

  // 3. Assign and Save
  booking.driver = driver;
  booking.Status =BookingStatus.Confirmed; // Update status to confirmed
  const savedBooking = await this.BookingRepo.save(booking);

  // 4. Trigger the Email
  try {
    // Pass the savedBooking which now contains car, fare, and driver
    await this.mailService.sendBookingConfirmation(savedBooking);
    console.log("mail sent")
  } catch (error) {
    console.error("Email failed but booking was saved:", error);
  }

  return savedBooking;
}

// Fetch a booking with car, driver, fare
async getBookingWithDetails(bookingId: number) {
  const booking = await this.BookingRepo.findOne({
    where: { id: bookingId },
relations: ['car', 'driver', 'fare'],
  });
console.log("booking",booking)

  if (!booking) {
    throw new NotFoundException(`Booking with ID ${bookingId} not found`);
  }

  // Because of eager:true, booking.car, booking.driver, booking.fare are already loaded
  return booking;
}
}
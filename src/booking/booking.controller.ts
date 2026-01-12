import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe  } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UseInterceptors } from '@nestjs/common';
import { SimpleInterceptor } from './logging.interceptor';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';
import { MailService } from './mail/mail.service';

@ApiTags('Booking')
@Controller('booking')
@UseInterceptors(SimpleInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService,
    
    ) {}


  @ApiOperation({summary:"New Booking created successfully"})
  @ApiResponse({status:201,description:"Booking created successfuly"})
  @Post('CreateBooking')
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

@Get('user/:email') 
findUserBookings(@Param('email') email: string) {
  console.log("Backend received email:", email); // This will help you debug
  return this.bookingService.findByUser(email);
}

  @ApiOperation({summary:"List of Bookings"})
  @ApiResponse({status:201,description:"List of Bookings"})
  @Get('list')
  findAll() {
    return this.bookingService.findAll();
  }

 
  
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

  @Post('assign')
  Assign(@Body('bookingId') id:number, @Body('driverId') driverId:number){
    return this.bookingService.AssignCarDriver(id,driverId)
  }

 


 @Get(':id/voucher')
  async getBookingVoucher(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.getBookingWithDetails(id);
  }

 

}

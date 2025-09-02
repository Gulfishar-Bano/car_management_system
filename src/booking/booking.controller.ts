import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UseInterceptors } from '@nestjs/common';
import { SimpleInterceptor } from './logging.interceptor';
import { MailService } from './mail/mail.service';
import { ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';


@ApiTags('Booking')
@Controller('booking')
@UseInterceptors(SimpleInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService,
    private readonly mailService:MailService
    ) {}


  @ApiOperation({summary:"New Booking created successfully"})
  @ApiResponse({status:201,description:"Booking created successfuly"})
  @Post('CreateBooking')
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
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
  Assign(@Body('bookingId') id:number, @Body('driverId') driverId:number, @Body('carId') carId:number){
    return this.bookingService.AssignCarDriver(id,carId,driverId)
  }

  @Get('test-email')
  async testEmail() {
  return await this.mailService.SendBookingConfirmation(
    'gulfisha9886@gmail.com',
    '"Car Booking App" <no-reply@yourdomain.com>',
    { name: 'Test', bookingId: 123, pickup: 'A', drop: 'B' }
  );
}

}

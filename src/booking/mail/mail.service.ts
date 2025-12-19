import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as pdf from 'html-pdf-node'; // Modern version

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBookingConfirmation(booking: any) {
    // 1. Define the HTML for the PDF (You can use your HBS style here)
    const htmlContent = `
      <div style="font-family: Arial; padding: 40px; border: 10px solid #2c3e50;">
        <h1 style="color: #2c3e50; text-align: center;">CARISMA RENTALS VOUCHER</h1>
        <hr>
        <div style="margin-top: 20px;">
          <p><strong>Booking ID:</strong> #${booking.id}</p>
          <p><strong>Customer:</strong> ${booking.Name}</p>
          <p><strong>Pickup:</strong> ${booking.PickUpLocation} to ${booking.DropLocation}</p>
        </div>
        <div style="background: #f8f9fa; padding: 20px; margin-top: 20px;">
          <h3>Driver & Vehicle Details</h3>
          <p><strong>Driver:</strong> ${booking.driver?.firstName} ${booking.driver?.lastName}</p>
          <p><strong>Phone:</strong> ${booking.driver?.phone}</p>
          <p><strong>Car Model:</strong> ${booking.car?.model}</p>
        </div>
        <h2 style="text-align: right; color: #2c3e50;">Total Paid: ₹${booking.fare?.fare}</h2>
      </div>
    `;

    // 2. Generate the PDF buffer
    const file = { content: htmlContent };
    const options = { format: 'A4' };
    
    const pdfBuffer = await pdf.generatePdf(file, options);

    // 3. Send the email with the HTML template AND the PDF attachment
    await this.mailerService.sendMail({
      to: booking.Email,
      subject: `Booking Confirmed: #${booking.id} - Voucher Attached`,
      template: './confirmation', // Your HBS template for the email body
      context: { 
       name: booking.Name,
        bookingId: booking.id,
        pickup: booking.PickUpLocation,
        drop: booking.DropLocation,
   driverName: booking.driver 
        ? `${booking.driver.firstName} ${booking.driver.lastName}` 
        : 'Assigned',
        driverPhoneNumber:booking.driver.phone,
        carModel: booking.car?.model,
        fare: booking.fare?.fare
      },
      attachments: [
        {
          filename: `Voucher_${booking.id}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
  }
}
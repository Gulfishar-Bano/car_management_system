import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  async create(@Body('amount') amount: number) {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Invalid amount');
    }
    return await this.paymentService.createOrder(amount);
  }

  @Post('verify')
  async verify(
    @Body('razorpay_payment_id') paymentId: string,
    @Body('razorpay_order_id') orderId: string,
    @Body('razorpay_signature') signature: string,
  ) {
    const isValid = await this.paymentService.verifyPayment(paymentId, orderId, signature);
    
    if (isValid) {
      // Here is where you would update your Database (e.g., mark order as paid)
      return { status: 'success', message: 'Mock Payment Verified Successfully' };
    } else {
      throw new BadRequestException('Invalid mock payment signature');
    }
  }
}
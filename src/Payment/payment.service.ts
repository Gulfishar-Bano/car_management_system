import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {

  private generateMockSignature(orderId: string, paymentId: string): string {
    return crypto
      .createHmac('sha256', 'static_mock_secret') 
      .update(orderId + "|" + paymentId)
      .digest('hex');
  }

  async createOrder(amount: number, currency: string = 'INR') {
    try {
   
      return {
        id: `order_mock_${crypto.randomBytes(6).toString('hex')}`,
        currency: currency,
        amount: amount, // Paise
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
      };
    } catch (error) {
      throw new InternalServerErrorException('Mock: Failed to create order');
    }
  }



async verifyPayment(paymentId: string, orderId: string, signature: string) {
  
  if (signature === 'mock_sig') return true; 

  const expectedSignature = this.generateMockSignature(orderId, paymentId);
  return expectedSignature === signature;
}

}
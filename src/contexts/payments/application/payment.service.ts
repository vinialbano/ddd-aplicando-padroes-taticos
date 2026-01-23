import { Injectable } from '@nestjs/common';
import { Money } from 'src/contexts/shared/value-objects/money';
import { ProcessPaymentDto } from './process-payment.dto';

export type PaymentResult =
  | { success: true; paymentId: string }
  | { success: false; reason: string };

@Injectable()
export class PaymentService {
  async processPayment(dto: ProcessPaymentDto): Promise<PaymentResult> {
    const orderId = dto.orderId;
    const amount = new Money(dto.amount, dto.currency);

    const validation = this.validatePayment(orderId, amount);
    if (!validation.valid) {
      return Promise.resolve({ success: false, reason: validation.reason });
    }

    const paymentId = this.generatePaymentId(orderId);

    return Promise.resolve({ success: true, paymentId });
  }

  private generatePaymentId(orderId: string) {
    return `PAY-${orderId}`;
  }

  private validatePayment(orderId: string, amount: Money) {
    if (amount.amount > 1000) {
      return { valid: false, reason: 'Fraud check failed' };
    }
    return { valid: true, reason: '' };
  }
}

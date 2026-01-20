import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '../application/payment.service';
import { ProcessPaymentDto } from '../application/process-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async processPayment(@Body() dto: ProcessPaymentDto) {
    const result = await this.paymentService.processPayment(dto);

    if (!result.success) {
      throw new BadRequestException(result.reason);
    }

    return {
      paymentId: result.paymentId,
      status: 'approved',
      orderId: dto.orderId,
    };
  }
}

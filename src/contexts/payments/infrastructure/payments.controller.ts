import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OrdersPaymentsKernel } from 'src/contexts/shared/orders-payments.kernel';
import { PaymentService } from '../application/payment.service';
import { ProcessPaymentDto } from '../application/process-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly ordersPaymentsKernel: OrdersPaymentsKernel,
  ) {}

  @Post()
  async processPayment(@Body() dto: ProcessPaymentDto) {
    const result = await this.paymentService.processPayment(dto);

    if (!result.success) {
      throw new BadRequestException(result.reason);
    }

    await this.ordersPaymentsKernel.notifyOrderPaid({
      orderId: dto.orderId,
      paymentId: result.paymentId,
      timestamp: new Date().getTime().toString(),
    });

    return {
      paymentId: result.paymentId,
      status: 'approved',
      orderId: dto.orderId,
    };
  }
}

import { Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { MarkOrderAsPaidDTO } from '../orders/application/dtos/mark-order-as-paid.dto';
import { OrderService } from '../orders/application/order.service';

/**
 * Published Language
 */
type NotifyOrderPaidRequest = {
  orderId: string;
  paymentId: string;
  timestamp: string;
};

export interface OrderPlacedPayload {
  orderId: string;
  customerId: string;
  cartId: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  currency: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  timestamp: string;
}

export interface PaymentApprovedPayload {
  orderId: string;
  paymentId: string;
  approvedAmount: number;
  currency: string;
  timestamp: string;
}

/**
 * Shared Kernel
 */
@Injectable()
export class OrdersPaymentsKernel {
  private readonly logger = new Logger(OrdersPaymentsKernel.name);
  private readonly validationPipe = new ValidationPipe({
    transform: true,
  });
  constructor(private readonly orderService: OrderService) {}

  async notifyOrderPaid(request: NotifyOrderPaidRequest) {
    const dto = (await this.validationPipe.transform(
      {
        orderId: request.orderId,
        paymentId: request.paymentId,
      },
      {
        type: 'custom',
        metatype: MarkOrderAsPaidDTO,
      },
    )) as MarkOrderAsPaidDTO;
    await this.orderService.markOrderAsPaid(dto);
    this.logger.log(`Order ${request.orderId} paid at ${request.timestamp}`);
  }
}

import { OrderService } from '../orders/application/order.service';

/**
 * Published Language
 */
type NotifyOrderPaidRequest = {
  orderId: string;
  paymentId: string;
  timestamp: string;
};

/**
 * Shared Kernel
 */
export class OrdersPaymentsKernel {
  constructor(private readonly orderService: OrderService) {}

  async notifyOrderPaid(request: NotifyOrderPaidRequest) {
    const dto = {};
    await this.orderService.markOrderAsPaid(dto);
  }
}

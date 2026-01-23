import { Inject, Injectable, Logger } from '@nestjs/common';
import { parseError } from 'src/contexts/shared/errors';
import type { PaymentApprovedPayload } from '../../shared/orders-payments.kernel';
import { OrderId } from '../domain/order/order-id';
import type { OrderRepository } from '../domain/order/order.repository';
import { ORDER_REPOSITORY } from '../orders.tokens';

@Injectable()
export class PaymentApprovedHandler {
  private readonly logger = new Logger(PaymentApprovedHandler.name);

  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async handle(payload: PaymentApprovedPayload): Promise<void> {
    const { orderId, paymentId } = payload;

    const order = await this.orderRepository.findById(
      OrderId.fromString(orderId),
    );

    if (!order) {
      this.logger.warn(
        `Order ${orderId} not found, ignoring payment.approved message for payment ${paymentId}`,
      );
      return;
    }

    try {
      order.markAsPaid(paymentId);
    } catch (error) {
      const { message, stack } = parseError(error);
      this.logger.error(
        `Failed to mark order ${orderId} as paid: ${message}`,
        stack,
      );
      throw error;
    }

    await this.orderRepository.save(order);

    this.logger.log(`Order ${orderId} payment processing complete`);
  }
}

import { Inject, Injectable, Logger, ValidationPipe } from '@nestjs/common';
import type { MessageBus } from '../../shared/events/message-bus.interface';
import {
  IntegrationMessage,
  MESSAGE_BUS,
} from '../../shared/events/message-bus.interface';
import {
  OrderPlacedPayload,
  PaymentApprovedPayload,
} from '../../shared/orders-payments.kernel';
import { PaymentService } from '../application/payment.service';
import { ProcessPaymentDto } from '../application/process-payment.dto';

@Injectable()
export class OrderEventsConsumer {
  private readonly logger = new Logger(OrderEventsConsumer.name);
  private readonly validator = new ValidationPipe();

  constructor(
    @Inject(MESSAGE_BUS)
    private readonly messageBus: MessageBus,
    private readonly paymentService: PaymentService,
  ) {}

  initialize(): void {
    const enableAutomaticPayment =
      process.env.ENABLE_AUTOMATIC_PAYMENT !== 'false';

    if (!enableAutomaticPayment) {
      this.logger.warn(
        '[PAYMENTS BC] Automatic payment DISABLED. Use POST /payments for manual payment processing.',
      );
      return;
    }

    this.messageBus.subscribe<OrderPlacedPayload>(
      'order.placed',
      this.handleOrderPlaced.bind(this),
    );
    this.logger.log('[PAYMENTS BC] Subscribed to order.placed topic');
  }

  private async handleOrderPlaced(
    message: IntegrationMessage<OrderPlacedPayload>,
  ): Promise<void> {
    const { payload, messageId } = message;
    const { orderId, totalAmount, currency } = payload;

    this.logger.log(
      `[PAYMENTS BC] Received order.placed message ${messageId} for order ${orderId}`,
    );

    const dto = (await this.validator.transform(
      {
        orderId,
        amount: totalAmount,
        currency,
      },
      {
        metatype: ProcessPaymentDto,
        type: 'custom',
      },
    )) as ProcessPaymentDto;

    const result = await this.paymentService.processPayment(dto);

    if (!result.success) {
      await this.messageBus.publish('payment.denied', {
        orderId,
        reason: result.reason,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const approvedPayload: PaymentApprovedPayload = {
      orderId,
      paymentId: result.paymentId,
      approvedAmount: totalAmount,
      currency,
      timestamp: new Date().toISOString(),
    };
    await this.messageBus.publish('payment.approved', approvedPayload);
  }
}

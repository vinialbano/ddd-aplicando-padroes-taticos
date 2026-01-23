import { Inject, Injectable, Logger } from '@nestjs/common';
import { parseError } from 'src/contexts/shared/errors';
import {
  IntegrationMessage,
  MESSAGE_BUS,
  type MessageBus,
} from '../../shared/events/message-bus.interface';
import { PaymentApprovedPayload } from '../../shared/orders-payments.kernel';
import { PaymentApprovedHandler } from '../application/payment-approved.handler';

@Injectable()
export class PaymentEventsConsumer {
  private readonly logger = new Logger(PaymentEventsConsumer.name);

  constructor(
    @Inject(MESSAGE_BUS)
    private readonly messageBus: MessageBus,
    private readonly paymentApprovedHandler: PaymentApprovedHandler,
  ) {}

  initialize(): void {
    this.logger.log('[Orders BC] Subscribed to payment.approved events');
    this.messageBus.subscribe<PaymentApprovedPayload>(
      'payment.approved',
      async (message) => {
        await this.handlePaymentApproved(message);
      },
    );
  }

  private async handlePaymentApproved(
    message: IntegrationMessage<PaymentApprovedPayload>,
  ) {
    const { messageId, payload } = message;

    try {
      await this.paymentApprovedHandler.handle(payload);
    } catch (error) {
      const { message: errorMessage, stack } = parseError(error);
      this.logger.error(
        `Failed to handle payment.approved message ${messageId}: ${errorMessage}`,
        stack,
      );
      // In production, this might publish to a dead-letter queue
      throw error;
    }
  }
}

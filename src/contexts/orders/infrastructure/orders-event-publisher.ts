import { Inject, Injectable, Logger } from '@nestjs/common';
import { DomainEventPublisher } from 'src/contexts/shared/events/domain-event.publisher';
import { DomainEvent } from '../../shared/events/domain-event';
import type { MessageBus } from '../../shared/events/message-bus.interface';
import { MESSAGE_BUS } from '../../shared/events/message-bus.interface';
import { OrderPlacedPayload } from '../../shared/orders-payments.kernel';
import { OrderPlaced } from '../domain/order/order-placed.event';

@Injectable()
export class OrdersEventPublisher implements DomainEventPublisher {
  private readonly logger = new Logger(OrdersEventPublisher.name);

  constructor(@Inject(MESSAGE_BUS) private readonly messageBus: MessageBus) {}

  async publishDomainEvents(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      switch (true) {
        case event instanceof OrderPlaced: {
          const payload = extractOrderPlacedPayload(event);
          await this.messageBus.publish<OrderPlacedPayload>(
            'order.placed',
            payload,
          );
          return;
        }
        default:
          // Unknown event types are silently ignored
          this.logger.warn(
            `Unknown event ${event.constructor.name}. Discarded.`,
          );
      }
    }
  }
}

function extractOrderPlacedPayload(event: OrderPlaced): OrderPlacedPayload {
  return {
    orderId: event.orderId.getValue(),
    customerId: event.customerId.getValue(),
    cartId: event.cartId.getValue(),
    items: event.items.map((item) => ({
      productId: item.productId.getValue(),
      quantity: item.quantity.getValue(),
      unitPrice: item.unitPrice.amount,
    })),
    totalAmount: event.totalAmount.amount,
    currency: event.totalAmount.currency,
    shippingAddress: {
      street: event.shippingAddress.street,
      city: event.shippingAddress.city,
      state: event.shippingAddress.stateOrProvince,
      zipCode: event.shippingAddress.postalCode,
      country: event.shippingAddress.country,
    },
    timestamp: event.occurredAt.toISOString(),
  };
}

import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { SharedKernelModule } from '../shared/shared-kernel.module';
import { PaymentService } from './application/payment.service';
import { OrderEventsConsumer } from './infrastructure/order-events-consumer';
import { PaymentController } from './infrastructure/payments.controller';

@Module({
  imports: [SharedKernelModule],
  controllers: [PaymentController],
  providers: [PaymentService, OrderEventsConsumer],
})
export class PaymentsModule implements OnModuleInit {
  private readonly logger = new Logger(PaymentsModule.name);

  constructor(private readonly ordersConsumer: OrderEventsConsumer) {}

  onModuleInit() {
    this.logger.log('Initializing bounded context consumers...');
    this.ordersConsumer.initialize();
  }
}

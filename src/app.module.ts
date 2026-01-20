import { Module } from '@nestjs/common';
import { OrdersModule } from './contexts/orders/orders.module';
import { PaymentsModule } from './contexts/payments/payments.module';

@Module({
  imports: [OrdersModule, PaymentsModule],
})
export class AppModule {}

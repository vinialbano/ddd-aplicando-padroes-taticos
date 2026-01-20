import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { OrdersPaymentsKernel } from './orders-payments.kernel';

@Module({
  imports: [OrdersModule],
  providers: [OrdersPaymentsKernel],
  exports: [OrdersPaymentsKernel],
})
export class SharedKernelModule {}

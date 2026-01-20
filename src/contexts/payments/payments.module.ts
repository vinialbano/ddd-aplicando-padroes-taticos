import { Module } from '@nestjs/common';
import { SharedKernelModule } from '../shared/shared-kernel.module';
import { PaymentService } from './application/payment.service';
import { PaymentController } from './infrastructure/payments.controller';

@Module({
  imports: [SharedKernelModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentsModule {}

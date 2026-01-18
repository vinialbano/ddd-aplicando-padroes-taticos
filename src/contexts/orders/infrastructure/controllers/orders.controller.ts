import { Controller } from '@nestjs/common';
import { OrderService } from '../../application/order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}
}

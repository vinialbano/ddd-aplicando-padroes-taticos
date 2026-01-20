import { Controller, Get, Param } from '@nestjs/common';
import { OrderIdDto } from '../../application/dtos/order-id.dto';
import { OrderResponseDTO } from '../../application/dtos/order-response.dto';
import { OrderService } from '../../application/order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Get(':orderId')
  async getOrder(@Param() orderIdDto: OrderIdDto): Promise<OrderResponseDTO> {
    return await this.ordersService.getOrder(orderIdDto);
  }
}

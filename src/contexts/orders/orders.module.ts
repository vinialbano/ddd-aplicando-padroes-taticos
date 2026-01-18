import { Module } from '@nestjs/common';
import { CartService } from './application/cart.service';
import { OrdersService } from './application/orders.service';
import { CartController } from './infrastructure/controllers/cart.controller';
import { OrdersController } from './infrastructure/controllers/orders.controller';
import { InMemoryShoppingCartRepository } from './infrastructure/database/in-memory-shopping-cart.repository';
import { SHOPPING_CART_REPOSITORY } from './orders.tokens';

@Module({
  controllers: [CartController, OrdersController],
  providers: [
    OrdersService,
    CartService,
    {
      provide: SHOPPING_CART_REPOSITORY,
      useClass: InMemoryShoppingCartRepository,
    },
  ],
})
export class OrdersModule {}

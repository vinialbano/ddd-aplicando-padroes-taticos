import { CustomerId } from '../shared/customer-id';
import { CartId } from './cart-id';
import { ShoppingCart } from './shopping-cart';

export interface ShoppingCartRepository {
  save(cart: ShoppingCart): Promise<void>;

  findById(cartId: CartId): Promise<ShoppingCart | null>;

  findByCustomerId(customerId: CustomerId): Promise<ShoppingCart[]>;

  delete(cartId: CartId): Promise<void>;
}

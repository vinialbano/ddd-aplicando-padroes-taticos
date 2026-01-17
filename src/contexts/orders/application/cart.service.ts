import { Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingCart } from '../domain/shopping-cart';
import type { ShoppingCartRepository } from '../domain/shopping-cart.repository';
import { CartId } from '../domain/value-objects/cart-id';
import { CustomerId } from '../domain/value-objects/customer-id';
import { ProductId } from '../domain/value-objects/product-id';
import { Quantity } from '../domain/value-objects/quantity';
import { AddItemDto } from './dtos/add-item.dto';
import { CartItemResponseDto, CartResponseDto } from './dtos/cart-response.dto';
import { CreateCartDto } from './dtos/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly repository: ShoppingCartRepository) {}

  async createCart(dto: CreateCartDto): Promise<CartResponseDto> {
    const customerId = CustomerId.fromString(dto.customerId);

    const cart = ShoppingCart.create(customerId);

    await this.repository.save(cart);
    return this.mapToDto(cart);
  }

  async addItem(dto: AddItemDto): Promise<CartResponseDto> {
    const cartId = CartId.fromString(dto.cartId);
    const cart = await this.repository.findById(cartId);

    if (!cart) {
      throw new NotFoundException(`Cart ${cartId.getValue()} not found`);
    }

    const productId = ProductId.fromString(dto.productId);
    const quantity = Quantity.of(dto.quantity);
    cart.addItem(productId, quantity);

    await this.repository.save(cart);
    return this.mapToDto(cart);
  }

  async getCart(cartIdStr: string): Promise<CartResponseDto> {
    const cartId = CartId.fromString(cartIdStr);
    const cart = await this.repository.findById(cartId);

    if (!cart) {
      throw new NotFoundException(`Cart ${cartId.getValue()} not found`);
    }

    return this.mapToDto(cart);
  }

  private mapToDto(cart: ShoppingCart): CartResponseDto {
    const items: CartItemResponseDto[] = cart.getItems();
    return {
      cartId: cart.getCartId().getValue(),
      customerId: cart.getCustomerId().getValue(),
      items,
      itemCount: cart.getItemCount(),
      isConverted: cart.isConverted(),
    };
  }
}

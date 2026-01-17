import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from '../../application/cart.service';
import { AddItemDto } from '../../application/dtos/add-item.dto';
import { CartIdDto } from '../../application/dtos/cart-id.dto';
import { CartResponseDto } from '../../application/dtos/cart-response.dto';
import { CreateCartDto } from '../../application/dtos/create-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart(
    @Body() createCartDto: CreateCartDto,
  ): Promise<CartResponseDto> {
    return await this.cartService.createCart(createCartDto);
  }

  @Post(':cartId/items')
  @HttpCode(HttpStatus.OK)
  async addItem(
    @Param() cartIdDto: CartIdDto,
    @Body() addItemDto: AddItemDto,
  ): Promise<CartResponseDto> {
    return await this.cartService.addItem(cartIdDto, addItemDto);
  }

  @Get(':cartId')
  async getCart(@Param() cartIdDto: CartIdDto): Promise<CartResponseDto> {
    return await this.cartService.getCart(cartIdDto);
  }
}

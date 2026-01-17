import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  cartId!: string;

  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsNumber()
  @IsPositive()
  quantity!: number;
}

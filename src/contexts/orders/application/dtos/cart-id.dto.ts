import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CartIdDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  cartId!: string;
}

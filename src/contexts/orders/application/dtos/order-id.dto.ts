import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class OrderIdDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  orderId!: string;
}

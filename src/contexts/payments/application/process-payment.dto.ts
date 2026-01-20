import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class ProcessPaymentDto {
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @Min(0.01)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;
}

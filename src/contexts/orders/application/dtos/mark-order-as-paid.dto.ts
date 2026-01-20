import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MarkOrderAsPaidDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsString()
  @IsNotEmpty()
  paymentId!: string;
}

import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ShippingAddressDTO {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  stateOrProvince!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsOptional()
  @IsString()
  deliveryInstructions?: string;
}

export class CheckoutDTO {
  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  @IsNotEmpty()
  shippingAddress!: ShippingAddressDTO;
}

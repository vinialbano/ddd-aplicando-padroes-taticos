const CART_STATUS = {
  ACTIVE: 'active',
  CONVERTED: 'converted',
} as const;

type CartStatusType = (typeof CART_STATUS)[keyof typeof CART_STATUS];

export class CartStatus {
  private readonly status: CartStatusType;

  private constructor(status: CartStatusType) {
    this.validateStatus(status);
    this.status = status;
  }

  private validateStatus(status: CartStatusType) {
    if (status !== 'active' && status !== 'converted') {
      throw new Error(
        `Invalid status: ${String(status)}. Must be 'active' or 'converted'`,
      );
    }
  }

  static asActive(): CartStatus {
    return new CartStatus(CART_STATUS.ACTIVE);
  }

  static asConverted(): CartStatus {
    return new CartStatus(CART_STATUS.CONVERTED);
  }

  toConverted(): CartStatus {
    return CartStatus.asConverted();
  }

  isConverted(): this is { status: typeof CART_STATUS.CONVERTED } {
    return this.status === CART_STATUS.CONVERTED;
  }
}

/**
 * Money amounts are represented as simple numbers with currency at order level
 */
export class OrderItemDTO {
  productId!: string;
  quantity!: number;
  unitPrice!: number;
  itemDiscount!: number;
  lineTotal!: number;

  constructor(
    productId: string,
    quantity: number,
    unitPrice: number,
    itemDiscount: number,
    lineTotal: number,
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.itemDiscount = itemDiscount;
    this.lineTotal = lineTotal;
  }
}

export class ShippingAddressResponseDTO {
  street!: string;
  addressLine2?: string;
  city!: string;
  stateOrProvince!: string;
  postalCode!: string;
  country!: string;
  deliveryInstructions?: string;

  constructor(data: {
    street: string;
    addressLine2?: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
    deliveryInstructions?: string;
  }) {
    this.street = data.street;
    this.addressLine2 = data.addressLine2;
    this.city = data.city;
    this.stateOrProvince = data.stateOrProvince;
    this.postalCode = data.postalCode;
    this.country = data.country;
    this.deliveryInstructions = data.deliveryInstructions;
  }
}

/**
 * Money amounts are flattened to simple numbers with a single currency field
 * Shipping address remains as a nested object for clarity
 */
export class OrderResponseDTO {
  orderId!: string;
  cartId!: string;
  customerId!: string;
  status!: string;

  // Order items
  items!: OrderItemDTO[];

  // Shipping address (kept as nested object)
  shippingAddress!: ShippingAddressResponseDTO;

  // Monetary amounts (flattened - all in same currency)
  currency!: string;
  globalDiscount!: number;
  totalAmount!: number;

  // Payment
  paymentId!: string | null;

  constructor(data: {
    orderId: string;
    cartId: string;
    customerId: string;
    status: string;
    items: OrderItemDTO[];
    shippingAddress: ShippingAddressResponseDTO;
    currency: string;
    globalDiscount: number;
    totalAmount: number;
    paymentId: string | null;
  }) {
    this.orderId = data.orderId;
    this.cartId = data.cartId;
    this.customerId = data.customerId;
    this.status = data.status;
    this.items = data.items;
    this.shippingAddress = data.shippingAddress;
    this.currency = data.currency;
    this.globalDiscount = data.globalDiscount;
    this.totalAmount = data.totalAmount;
    this.paymentId = data.paymentId;
  }
}

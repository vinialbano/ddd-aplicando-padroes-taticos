interface ShoppingCart {
  cartId: string;
  customerId: string;
  status: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;

  create: () => void;
  addItem: () => void;
  getItem: () => void;
  markAsConverted: () => void;
}

export type CartItem = {
  variantId: number;
  qty: number;
};

export type Cart = {
  cartId: number;
  userId: number;
  sessionToken: string;
  status: string;
  items: CartItem[];
};

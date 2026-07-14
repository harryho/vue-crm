import type { Payment } from './payment';
import type { Shipment } from './shipment';

export type OrderItem = {
  variantId: number;
  productName: string;
  sku: string;
  unitPrice: number;
  qty: number;
  discount: number;
  lineTotal: number;
};

export type OrderStatusHistory = {
  status: string;
  changedAt: string;
};

export type OrderShipTo = {
  name?: string;
  line1?: string;
  city?: string;
  region?: string | null;
  postalCode?: string;
  countryCode?: string;
};

export type Order = {
  orderId: number;
  orderNumber: string;
  userId: number;
  status: string;
  currency: string;
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  grandTotal: number;
  shipTo: OrderShipTo;
  orderedAt: string;
  items: OrderItem[];
  statusHistory: OrderStatusHistory[];
  payment?: Payment;
  shipment?: Shipment;
};

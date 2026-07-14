export type Carrier = {
  carrierId: number;
  name: string;
  phone?: string;
};

export type Shipment = {
  carrierId: number;
  carrierName: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
};

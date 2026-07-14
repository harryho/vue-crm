import { defineStore } from 'pinia';

import * as repository from '@/data/repository';
import type { Order, OrderShipTo } from '@/types';

const STATUS_SEQUENCE = ['pending', 'paid', 'shipped', 'delivered'];

const emptyOrder = (): Order => ({
  orderId: 0,
  orderNumber: '',
  userId: 0,
  status: 'pending',
  currency: 'USD',
  subtotal: 0,
  discountTotal: 0,
  shippingTotal: 0,
  grandTotal: 0,
  shipTo: {},
  orderedAt: '',
  items: [],
  statusHistory: [],
});

export const useOrdersStore = defineStore('Orders', {
  state: () => ({
    orders: [] as Array<Order>,
    loading: false,
    filter: '',
    order: emptyOrder(),
  }),
  getters: {
    filteredData(): Order[] {
      return this.orders;
    },
    // -1 when the order is cancelled (not part of the linear sequence at all)
    getStepVal(): string {
      return (STATUS_SEQUENCE.indexOf(this.order.status) + 1).toString();
    },
  },
  actions: {
    async getAll() {
      this.loading = true;
      this.orders = await repository.getOrders();
      this.loading = false;
    },
    async getOrderById(id: number) {
      this.loading = true;
      this.order = await repository.getOrderById(id);
      this.loading = false;
    },
    async createOrder(data: { userId: number; items: { variantId: number; qty: number }[]; shipTo: OrderShipTo }) {
      return repository.createOrder(data);
    },
    async recordPayment(data: { provider: string; amount: number; providerRef?: string }) {
      this.order = await repository.recordPayment(this.order.orderId, data);
      return this.order;
    },
    async recordShipment(data: { carrierId: number; trackingNumber?: string }) {
      this.order = await repository.recordShipment(this.order.orderId, data);
      return this.order;
    },
    async markDelivered() {
      this.order = await repository.updateOrderStatus(this.order.orderId, 'delivered');
      return this.order;
    },
    async cancelOrder() {
      this.order = await repository.updateOrderStatus(this.order.orderId, 'cancelled');
      return this.order;
    },
  },
});

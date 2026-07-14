import { defineStore } from 'pinia';

import * as repository from '@/data/repository';
import type { Order } from '@/types';

const STATUS_SEQUENCE = ['pending', 'processing', 'shipped', 'delivered'];

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
    // Advances the order to its next status - this app has no order-creation
    // or line-item-editing UI yet (that's real checkout, a net-new M4
    // feature), so "saving" an order here only ever means moving it forward
    // one step in STATUS_SEQUENCE.
    async advanceStatus() {
      const currentIdx = STATUS_SEQUENCE.indexOf(this.order.status);
      const nextStatus = STATUS_SEQUENCE[currentIdx + 1];
      this.order = await repository.updateOrderStatus(this.order.orderId, nextStatus);
      return this.order;
    },
  },
});

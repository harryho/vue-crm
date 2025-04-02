import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { ThreedCubeSphereIcon } from 'vue-tabler-icons';
import type { Address, Order } from '@/types';

const baseUrl = `${import.meta.env.VITE_API_URL}/orders`;


export const useOrdersStore = defineStore("Orders", {

  state: () => ({
    orders: [] as Array<Order>,
    loading: false,
    filter: '',
    order: {} as Order
  }),
  getters: {
    filteredData(): Order[] {
      return this.orders;
    },
    getStepVal(): string {
      return (['packing','shipping','customs-clearance','delivered']
        .findIndex(s=> s===this.order.delivery)+1).toString()
    }
  },
  actions: {
    async getAll() {
      this.loading = true;
      this.orders = await fetchWrapper.get(baseUrl)
      this.loading = false;
    },
    async delteOrder(id: string) {
      const res = await fetchWrapper.delete(`${baseUrl}/${id}`)
      if (res.error) {
        console.log(res.error)
      }
      return res
    },
    async getOrderById(id: string) {
      this.loading = true
      const c = await fetchWrapper.get(`${baseUrl}/${id}`)
      this.order = c
      this.loading = false
    },
    async saveOrder(order: Order) {
      let res
      if (order.id)
        res = await fetchWrapper.put(`${baseUrl}/${order.id}`, order)
      else
        res = await fetchWrapper.post(`${baseUrl}`, order)
      return res
    },
    async newOrder() {
      this.loading = true
      setTimeout(() => {
        this.order = {
          id: '',
          reference: '',
          customer: '',
          lineItems: [],
          amount: 0,
          billingDate: '',
          shippingDate: '',
          shippingAddress: {} as Address,
          delivery: '',
        }
        this.loading = false
      }
        , 500)

    }
  }
});

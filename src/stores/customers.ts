import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { ThreedCubeSphereIcon } from 'vue-tabler-icons';
import type { Customer } from '@/types';

const baseUrl = `${import.meta.env.VITE_API_URL}/customers`;


export const useCustomersStore = defineStore("Customers", {

  state: () => ({
    customers: [] as Array<Customer>,
    loading: false,
    filter: '',
    customer: {} as Customer
  }),
  getters: {
    filteredData(): Customer[] {
      return this.customers;
    },
  },
  actions: {
    async getAll() {
      this.loading = true;
      this.customers = await fetchWrapper.get(baseUrl)
      this.loading = false;
    },
    async delteCustomer(id: string) {
      const res = await fetchWrapper.delete(`${baseUrl}/${id}`)
      if (res.error) {
        console.log(res.error)
      }
      return res
    },
    async getCustomerById(id: string) {
      this.loading = true
      this.customer = await fetchWrapper.get(`${baseUrl}/${id}`)
      this.loading = false
    },
    async saveCustomer(customer: Customer) {
      let res
      if (customer.id)
        res = await fetchWrapper.put(`${baseUrl}/${customer.id}`, customer)
      else
        res = await fetchWrapper.post(`${baseUrl}`, customer)
      return res
    },
    async newCustomer() {
      this.loading = true
      setTimeout(() => {
        this.customer = {
          id: '',
          firstname: '',
          lastname: '',
          fullname: '',
          email: '',
          avatar: '',
          mobile: '',
          phone: '',
          membership: '',
          rewards: 0,
          hasItemInShoppingCart: false
        }
        this.loading = false
      }
        , 500)

    }
  }
});

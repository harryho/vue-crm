import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type { Product } from '@/types';
import { formatToCurrencyNumber } from '@/utils/locales/format';

const baseUrl = `${import.meta.env.VITE_API_URL}/products`;



export const useProductsStore = defineStore("Products", {
  state: () => ({
    products: [] as Array<Product>,
    loading: false,
    filter: '',
    pageSize: 10,
    currentPage: 1,
    product: {} as Product
  }),
  getters: {
    filteredData(state): Product[] {
      const filtered = this.products.filter(p =>
        !this.filter ? true : p.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
      const paginated = filtered.slice((state.currentPage - 1) * this.pageSize, state.currentPage * this.pageSize)
      return paginated

    },
    totalPages(): number {
      return Math.ceil(this.products.length / this.pageSize);
    },
    totalCount(): number {
      return this.products.length
    }
  },
  actions: {
    async getAll() {
      this.loading = true;
      const list = await fetchWrapper.get(baseUrl)
      this.products = list
      this.loading = false;
    },
    async delteProduct(id: string) {
      const res = await fetchWrapper.delete(`${baseUrl}/${id}`)
      if (res.error) {
        console.log(res.error)
      }
      return res
    },
    async getProductById(id: string) {
      this.loading = true
      const c = await fetchWrapper.get(`${baseUrl}/${id}`)
      this.product = {
        ...c,
        price: formatToCurrencyNumber(c.price),
        retailPrice: formatToCurrencyNumber(c.price * 1.1),
      }
      this.loading = false
    },
    async saveProduct(product: Product) {
      let res
      if (product.id)
        res = await fetchWrapper.put(`${baseUrl}/${product.id}`, product)
      else
        res = await fetchWrapper.post(`${baseUrl}`, product)
      return res
    },
    async newProduct() {
      this.loading = true
      setTimeout(() => {
        this.product = {
          id: '',
          name: '',
          category: '',
          unitInStock: '',
          price: 0,
          retailPrice: 0,
          // category: Category,
          imageUri: '',
          releaseDate: ''
        }
        this.loading = false
      }
        , 500)

    }
  }
});

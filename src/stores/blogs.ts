import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type { Blog } from '@/types';
import {  formatToCurrencyNumber } from '@/utils/locales/format';

const baseUrl = `${import.meta.env.VITE_API_URL}/blogs`;


export const useBlogsStore = defineStore("Blogs", {
  state: () => ({
    blogs: [] as Array<Blog>,
    loading: false,
    filter: '',
    pageSize: 10,
    currentPage: 1,
    blog: {} as Blog
  }),
  getters: {
    filteredData(state): Blog[] {
      const filtered = this.blogs.filter(p =>
        !this.filter ? true : p.title.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
      const paginated = filtered.slice((state.currentPage - 1) * this.pageSize, state.currentPage *this.pageSize)
      return paginated

    },
    totalPages(): number {
      return Math.ceil(this.blogs.length / this.pageSize);
    },
    totalCount(): number {
      return this.blogs.length
    }
  },
  actions: {
    async getAll() {
      this.loading = true;
      this.blogs = await fetchWrapper.get(baseUrl)
      this.loading = false;
    },
    async delteBlog(id: string) {
      const res = await fetchWrapper.delete(`${baseUrl}/${id}`)
      if (res.error) {
        console.log(res.error)
      }
      return res
    },
    async getBlogById(id: string) {
      this.loading = true
      const c = await fetchWrapper.get(`${baseUrl}/${id}`)
      this.blog = {   ...c,
        price: formatToCurrencyNumber(c.price), 
        retailPrice: formatToCurrencyNumber(c.retailPrice*1.1), 
      }
      this.loading = false
    },
    async saveBlog(blog: Blog) {
      let res
      if (blog.id)
        res = await fetchWrapper.put(`${baseUrl}/${blog.id}`, blog)
      else
        res = await fetchWrapper.post(`${baseUrl}`, blog)
      return res
    
    }
  }
});

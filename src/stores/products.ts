import { defineStore } from 'pinia';

import * as repository from '@/data/repository';
import type { Product } from '@/types';

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptyProduct = (): Product => ({
  productId: 0,
  categoryId: 0,
  categoryName: '',
  name: '',
  slug: '',
  isActive: true,
  images: [],
  variants: [{ variantId: 0, sku: '', name: 'Default', price: 0, currency: 'USD', isActive: true, quantityOnHand: 0 }],
});

export const useProductsStore = defineStore('Products', {
  state: () => ({
    products: [] as Array<Product>,
    loading: false,
    filter: '',
    pageSize: 10,
    currentPage: 1,
    product: emptyProduct(),
  }),
  getters: {
    filteredData(state): Product[] {
      const filtered = this.products.filter((p) =>
        !this.filter ? true : p.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
      );
      return filtered.slice((state.currentPage - 1) * this.pageSize, state.currentPage * this.pageSize);
    },
    totalPages(): number {
      return Math.ceil(this.products.length / this.pageSize);
    },
    totalCount(): number {
      return this.products.length;
    },
  },
  actions: {
    async getAll() {
      this.loading = true;
      this.products = await repository.getProducts();
      this.loading = false;
    },
    async deleteProduct(id: number) {
      await repository.deleteProduct(id);
    },
    async getProductById(id: number) {
      this.loading = true;
      this.product = await repository.getProductById(id);
      this.loading = false;
    },
    async saveProduct(product: Product) {
      const slug = product.slug || slugify(product.name);
      if (product.productId) {
        const { productId, ...data } = product;
        return repository.updateProduct(productId, { ...data, slug });
      }
      const { productId, ...data } = product;
      return repository.createProduct({ ...data, slug });
    },
    newProduct() {
      this.loading = true;
      setTimeout(() => {
        this.product = emptyProduct();
        this.loading = false;
      }, 500);
    },
  },
});

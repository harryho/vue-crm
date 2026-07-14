import { defineStore } from 'pinia';
import type { CartItem } from '@/types';

const STORAGE_KEY = 'vue-crm-cart';

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = defineStore('Cart', {
  state: () => ({
    items: readStoredCart(),
  }),
  getters: {
    totalItems(): number {
      return this.items.reduce((sum, item) => sum + item.qty, 0);
    },
  },
  actions: {
    addItem(variantId: number, qty = 1) {
      const existing = this.items.find((item) => item.variantId === variantId);
      if (existing) {
        existing.qty += qty;
      } else {
        this.items.push({ variantId, qty });
      }
      persist(this.items);
    },
    removeItem(variantId: number) {
      this.items = this.items.filter((item) => item.variantId !== variantId);
      persist(this.items);
    },
    setQty(variantId: number, qty: number) {
      if (qty <= 0) {
        this.removeItem(variantId);
        return;
      }
      const item = this.items.find((i) => i.variantId === variantId);
      if (item) {
        item.qty = qty;
        persist(this.items);
      }
    },
    clear() {
      this.items = [];
      persist(this.items);
    },
  },
});

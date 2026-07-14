<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCartStore } from '@/stores/cart';
import * as repository from '@/data/repository';
import { ref, computed } from 'vue';
import { router } from '@/router';
import { formatToCurrencyString } from '@/utils/locales/format';
import type { Product } from '@/types';

const cartStore = useCartStore();
const products = ref<Product[]>([]);
repository.getProducts().then((p) => (products.value = p));

const rows = computed(() =>
  cartStore.items.map((item) => {
    const product = products.value.find((p) => p.variants.some((v) => v.variantId === item.variantId));
    const variant = product?.variants.find((v) => v.variantId === item.variantId);
    return { item, product, variant };
  })
);

const subtotal = computed(() =>
  rows.value.reduce((sum, { variant, item }) => sum + (variant?.price ?? 0) * item.qty, 0)
);

function onContinueShopping() {
  router.replace({ path: '/product' });
}

function onCheckout() {
  router.replace({ path: '/checkout' });
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Cart">
      <div v-if="rows.length === 0" class="text-center pa-10">
        <p class="text-h6">Your cart is empty.</p>
        <v-btn class="mt-4" color="secondary" variant="flat" @click="onContinueShopping">Continue Shopping</v-btn>
      </div>
      <div v-else>
        <v-table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th class="text-right">Unit Price</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Line Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ item, product, variant } in rows" :key="item.variantId">
              <td>{{ product?.name ?? `Variant ${item.variantId}` }}</td>
              <td>{{ variant?.sku }}</td>
              <td class="text-right">AUD {{ variant ? formatToCurrencyString(variant.price) : '-' }}</td>
              <td class="text-right">
                <v-text-field type="number" density="compact" hide-details style="width: 90px; display: inline-block"
                  :model-value="item.qty"
                  @update:model-value="(v) => cartStore.setQty(item.variantId, Number(v))"></v-text-field>
              </td>
              <td class="text-right">AUD {{ variant ? formatToCurrencyString(variant.price * item.qty) : '-' }}</td>
              <td class="text-right">
                <v-icon color="disabled" icon="$delete" @click="cartStore.removeItem(item.variantId)"></v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-divider class="my-5" />
        <div class="d-flex flex-column align-end ga-2">
          <span class="text-h6">Subtotal: AUD {{ formatToCurrencyString(subtotal) }}</span>
          <div class="d-flex ga-4">
            <v-btn variant="outlined" color="primary" @click="onContinueShopping">Continue Shopping</v-btn>
            <v-btn color="secondary" variant="flat" @click="onCheckout">Proceed to Checkout</v-btn>
          </div>
        </div>
      </div>
    </UiParentCard>
  </UiMainContainer>
</template>

<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCartStore } from '@/stores/cart';
import { useOrdersStore } from '@/stores/orders';
import * as repository from '@/data/repository';
import { ref, computed } from 'vue';
import { router } from '@/router';
import { formatToCurrencyString } from '@/utils/locales/format';
import type { Product, User } from '@/types';

const SHIPPING_FLAT_FEE = 9.99;

const cartStore = useCartStore();
const ordersStore = useOrdersStore();
const products = ref<Product[]>([]);
const users = ref<User[]>([]);
const placing = ref(false);
const userId = ref<number | undefined>(undefined);

const shipTo = ref({ name: '', line1: '', city: '', region: '', postalCode: '', countryCode: '' });

Promise.all([repository.getProducts(), repository.getUsers()]).then(([p, u]) => {
  products.value = p;
  users.value = u;
  if (u[0]) onUserChange(u[0].userId);
});

function onUserChange(id: number) {
  userId.value = id;
  const user = users.value.find((u) => u.userId === id);
  const address = user?.addresses.find((a) => a.isDefaultShipping) ?? user?.addresses[0];
  shipTo.value = {
    name: user ? `${user.firstName} ${user.lastName}` : '',
    line1: address?.line1 ?? '',
    city: address?.city ?? '',
    region: address?.region ?? '',
    postalCode: address?.postalCode ?? '',
    countryCode: address?.countryCode ?? '',
  };
}

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
const grandTotal = computed(() => subtotal.value + SHIPPING_FLAT_FEE);
const canPlaceOrder = computed(() => !!userId.value && rows.value.length > 0 && !placing.value);

async function handlePlaceOrder() {
  if (!userId.value) return;
  placing.value = true;
  const order = await ordersStore.createOrder({
    userId: userId.value,
    items: cartStore.items,
    shipTo: shipTo.value,
  });
  cartStore.clear();
  router.replace({ path: `/order/${order.orderId}` });
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Checkout">
      <v-row v-if="rows.length === 0">
        <v-col cols="12" class="text-center pa-10">
          <p class="text-h6">Your cart is empty - add some products first.</p>
          <v-btn class="mt-4" color="secondary" variant="flat" @click="router.replace({ path: '/product' })">Browse Products</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="7">
          <v-card-subtitle class="f-w-800 pl-0">Order Items</v-card-subtitle>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Product</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Qty</th>
                <th class="text-right">Line Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ item, product, variant } in rows" :key="item.variantId">
                <td>{{ product?.name ?? `Variant ${item.variantId}` }}</td>
                <td class="text-right">AUD {{ variant ? formatToCurrencyString(variant.price) : '-' }}</td>
                <td class="text-right">{{ item.qty }}</td>
                <td class="text-right">AUD {{ variant ? formatToCurrencyString(variant.price * item.qty) : '-' }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-divider class="my-3" />
          <div class="d-flex flex-column align-end ga-1">
            <span>Subtotal: AUD {{ formatToCurrencyString(subtotal) }}</span>
            <span>Shipping: AUD {{ formatToCurrencyString(SHIPPING_FLAT_FEE) }}</span>
            <span class="text-h6">Grand Total: AUD {{ formatToCurrencyString(grandTotal) }}</span>
          </div>
        </v-col>

        <v-col cols="12" md="5">
          <v-card-subtitle class="f-w-800 pl-0">Customer &amp; Shipping</v-card-subtitle>
          <v-select label="Placing order for" :model-value="userId"
            :items="users.map((u) => ({ title: `${u.firstName} ${u.lastName} (${u.email})`, value: u.userId }))"
            variant="solo-filled" @update:model-value="onUserChange"></v-select>

          <v-text-field v-model="shipTo.name" label="Ship-to Name" variant="solo-filled"></v-text-field>
          <v-text-field v-model="shipTo.line1" label="Address Line 1" variant="solo-filled"></v-text-field>
          <v-text-field v-model="shipTo.city" label="City" variant="solo-filled"></v-text-field>
          <v-text-field v-model="shipTo.postalCode" label="Postal Code" variant="solo-filled"></v-text-field>
          <v-text-field v-model="shipTo.countryCode" label="Country Code" variant="solo-filled"></v-text-field>

          <div class="d-flex justify-end mt-4">
            <v-btn :loading="placing" :disabled="!canPlaceOrder" color="secondary" variant="flat"
              @click="handlePlaceOrder">Place Order</v-btn>
          </div>
        </v-col>
      </v-row>
    </UiParentCard>
  </UiMainContainer>
</template>

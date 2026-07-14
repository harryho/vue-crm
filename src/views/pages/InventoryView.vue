<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import * as repository from '@/data/repository';
import { ref, computed } from 'vue';
import { formatToCurrencyString } from '@/utils/locales/format';
import type { Product } from '@/types';

const LOW_STOCK_THRESHOLD = 10;

const products = ref<Product[]>([]);
const loading = ref(true);
const search = ref('');

repository.getProducts().then((p) => {
  products.value = p;
  loading.value = false;
});

const rows = computed(() =>
  products.value.flatMap((product) =>
    product.variants.map((variant) => ({
      productId: product.productId,
      productName: product.name,
      categoryName: product.categoryName,
      variantId: variant.variantId,
      sku: variant.sku,
      variantName: variant.name,
      price: variant.price,
      quantityOnHand: variant.quantityOnHand,
    }))
  )
);

const filtered = computed(() =>
  rows.value.filter(
    (row) =>
      !search.value ||
      row.productName.toLowerCase().includes(search.value.toLowerCase()) ||
      row.sku.toLowerCase().includes(search.value.toLowerCase())
  )
);

const totalUnits = computed(() => filtered.value.reduce((sum, row) => sum + row.quantityOnHand, 0));
const lowStockCount = computed(() => filtered.value.filter((row) => row.quantityOnHand < LOW_STOCK_THRESHOLD).length);

function stockColor(qty: number): string {
  if (qty === 0) return 'error';
  if (qty < LOW_STOCK_THRESHOLD) return 'warning';
  return 'success';
}

function stockLabel(qty: number): string {
  if (qty === 0) return 'OUT OF STOCK';
  if (qty < LOW_STOCK_THRESHOLD) return 'LOW';
  return 'OK';
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Inventory">
      <div v-if="loading">
        <v-progress-linear color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <div v-else>
        <v-row class="mb-4">
          <v-col cols="12" sm="4">
            <v-card variant="tonal">
              <v-card-text>
                <div class="text-caption">Total SKUs</div>
                <div class="text-h5">{{ filtered.length }}</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal">
              <v-card-text>
                <div class="text-caption">Units on Hand</div>
                <div class="text-h5">{{ totalUnits }}</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card variant="tonal">
              <v-card-text>
                <div class="text-caption">Low Stock (&lt; {{ LOW_STOCK_THRESHOLD }})</div>
                <div class="text-h5" :class="lowStockCount > 0 ? 'text-error' : ''">{{ lowStockCount }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-text-field v-model="search" variant="solo-filled" class="pa-2" label="Search by product name or SKU"></v-text-field>

        <v-table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Variant</th>
              <th class="text-right">Price</th>
              <th class="text-right">Qty on Hand</th>
              <th>Stock Level</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filtered" :key="row.variantId">
              <td>{{ row.productName }}</td>
              <td>{{ row.categoryName }}</td>
              <td>{{ row.sku }}</td>
              <td>{{ row.variantName }}</td>
              <td class="text-right">AUD {{ formatToCurrencyString(row.price) }}</td>
              <td class="text-right">{{ row.quantityOnHand }}</td>
              <td><v-chip :color="stockColor(row.quantityOnHand)" size="small">{{ stockLabel(row.quantityOnHand) }}</v-chip></td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </UiParentCard>
  </UiMainContainer>
</template>

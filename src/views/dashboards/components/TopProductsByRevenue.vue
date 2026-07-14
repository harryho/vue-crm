<script setup lang="ts">
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import { formatToCurrencyString } from '@/utils/locales/format';

defineProps<{
  list: { label: string; total: number }[];
}>();
</script>

<template>
  <UiTitleCard title="Top Products by Revenue" :className="'pt-2'">
    <v-table density="compact" v-if="list.length">
      <tbody>
        <tr v-for="(product, index) in list" :key="product.label">
          <td class="text-medium-emphasis" style="width: 32px">{{ index + 1 }}</td>
          <td>{{ product.label }}</td>
          <td class="text-right">AUD {{ formatToCurrencyString(product.total) }}</td>
        </tr>
      </tbody>
    </v-table>
    <p v-else class="text-medium-emphasis">No revenue yet.</p>
  </UiTitleCard>
</template>

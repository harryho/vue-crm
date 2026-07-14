<script setup lang="ts">
import { computed } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const props = defineProps<{
  categories: string[];
  series: number[];
}>();

const chartOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'inherit' },
  labels: props.categories,
  legend: { position: 'bottom' },
  dataLabels: { enabled: true }
}));
</script>

<template>
  <UiTitleCard title="Orders by Status" :className="'pt-2'">
    <apexchart v-if="series.length" type="donut" height="320" :options="chartOptions" :series="series"></apexchart>
    <p v-else class="text-medium-emphasis">No orders yet.</p>
  </UiTitleCard>
</template>

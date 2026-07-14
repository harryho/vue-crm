<script setup lang="ts">
import { computed } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import { formatToCurrencyString } from '@/utils/locales/format';

const props = defineProps<{
  categories: string[];
  series: number[];
}>();

const chartOptions = computed(() => ({
  chart: { type: 'bar', height: 320, fontFamily: 'inherit', toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: '45%' } },
  dataLabels: { enabled: false },
  xaxis: { categories: props.categories },
  yaxis: { labels: { formatter: (v: number) => `$${v}` } },
  tooltip: { y: { formatter: (v: number) => `$${v.toFixed(2)}` } }
}));

const chartSeries = computed(() => [{ name: 'Revenue', data: props.series }]);
const total = computed(() => props.series.reduce((s, v) => s + v, 0));
</script>

<template>
  <UiTitleCard title="Revenue by Category" :className="'pt-2'">
    <p class="text-medium-emphasis mb-3">Total: AUD {{ formatToCurrencyString(total) }}</p>
    <apexchart type="bar" height="320" :options="chartOptions" :series="chartSeries"></apexchart>
  </UiTitleCard>
</template>

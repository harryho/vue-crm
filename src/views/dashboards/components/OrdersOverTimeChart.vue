<script setup lang="ts">
import { computed } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const props = defineProps<{
  categories: string[];
  series: number[];
}>();

const chartOptions = computed(() => ({
  chart: { type: 'area', height: 320, fontFamily: 'inherit', toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: { categories: props.categories },
  yaxis: { labels: { formatter: (v: number) => v.toFixed(0) } }
}));

const chartSeries = computed(() => [{ name: 'Orders', data: props.series }]);
</script>

<template>
  <UiTitleCard title="Orders Over Time" :className="'pt-2'">
    <p class="text-medium-emphasis mb-3">Orders placed per month</p>
    <apexchart type="area" height="320" :options="chartOptions" :series="chartSeries"></apexchart>
  </UiTitleCard>
</template>

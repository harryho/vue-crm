<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  total: string;
  color?: string;
  series: number[];
}>();

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 60,
    fontFamily: 'inherit',
    sparkline: { enabled: true }
  },
  dataLabels: { enabled: false },
  colors: ['#fff'],
  stroke: { curve: 'smooth', width: 2 },
  tooltip: { enabled: false }
}));

const chartSeries = computed(() => [{ name: props.title, data: props.series }]);
</script>

<template>
  <v-card :class="`bg-${color ?? 'primary'}`" elevation="0" class="overflow-hidden">
    <v-card-text>
      <span class="text-subtitle-1 text-white text-medium-emphasis">{{ title }}</span>
      <h2 class="text-h2 font-weight-medium text-white mt-1">{{ total }}</h2>
      <apexchart v-if="series.length" type="line" height="60" :options="chartOptions" :series="chartSeries"></apexchart>
    </v-card-text>
  </v-card>
</template>

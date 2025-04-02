<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const primaryColor = theme.current.value.colors.primary;
const darkprimaryColor = theme.current.value.colors.darkprimary;

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 450,
      fontFamily: `inherit`,
      foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))',
      toolbar: false
    },
    colors: [primaryColor, darkprimaryColor],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.4,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
      },
      axisTicks: {
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
      }
    },
    legend: {
      show: true
    }
  };
});

const chartOptions2 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 450,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      toolbar: false
    },
    colors: [primaryColor, darkprimaryColor],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.4,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
      },
      axisTicks: {
        color: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
      }
    },
    legend: {
      show: true
    },
    tooltip: {
      theme: 'dark'
    }
  };
});

// chart 1
const areaChart1 = {
  series: [
    {
      name: 'Page Views',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'Sessions',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ]
};

const areaChart2 = {
  series: [
    {
      name: 'Page Views',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
    },
    {
      name: 'Sessions',
      data: [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
    }
  ]
};

const tab = ref(1);
</script>

<template>
  <v-card class="title-card" variant="text">
    <v-card-item class="pb-2 px-0 pt-0">
      <div class="d-flex justify-space-between">
        <v-card-title class="text-h5">Unique Visitor</v-card-title>
        <div class="d-flex flex-wrap">
          <v-tabs v-model="tab" color="primary" class="tabBtn" density="compact" hide-slider>
            <v-tab value="one" class="mr-1" variant="outlined" rounded="md"> Month </v-tab>
            <v-tab value="two" variant="outlined" rounded="md" > Week </v-tab>
          </v-tabs>
        </div>
      </div>
    </v-card-item>
    <v-card-text class="rounded-md overflow-hidden">
      <v-window v-model="tab">
        <v-window-item value="one">
          <apexchart type="area" height="450" :options="chartOptions2" :series="areaChart2.series"> </apexchart>
        </v-window-item>

        <v-window-item value="two">
          <apexchart type="area" height="450" :options="chartOptions1" :series="areaChart1.series"> </apexchart>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>


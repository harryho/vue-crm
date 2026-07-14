<script setup lang="ts">
import { ref, computed } from 'vue';

// import icons
import { ChevronUpIcon, ChevronDownIcon } from 'vue-tabler-icons';

// chart 1
const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 95,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      sparkline: {
        enabled: true
      }
    },
    colors: ['#5e35b1'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      theme: 'light',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Ticket '
        }
      },
      marker: {
        show: false
      }
    }
  };
});

// chart 1
const lineChart1 = {
  series: [
    {
      data: [0, 15, 10, 50, 30, 40, 25]
    }
  ]
};

const revenues = ref([
  {
    name: 'Bajaj Finery',
    price: 145.58,
    profit: 10
  },
  {
    name: 'TTML',
    price: 6.368,
    profit: 10
  },
  {
    name: 'Reliance',
    price: 458.63,
    profit: 10
  },
  {
    name: 'TTML',
    price: 5.631,
    profit: 10
  },
  {
    name: 'Stolon',
    price: 6.368,
    profit: 10
  }
]);
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <div class="d-flex align-center">
          <h4 class="text-h4 mt-1">Popular Stocks</h4>
          <div class="ml-auto">
            <v-menu transition="slide-y-transition">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" size="small" icon rounded="sm" variant="text" v-bind="props">
                  <DotsIcon stroke-width="1.5" width="25" />
                </v-btn>
              </template>
              <v-sheet rounded="md" width="150" class="elevation-10">
                <v-list>
                  <v-list-item value="1">
                    <v-list-item-title>Today</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="2">
                    <v-list-item-title>This Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="3">
                    <v-list-item-title>This Year</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-menu>
          </div>
        </div>

        <v-card class="bg-lightsecondary mt-5">
          <div class="pa-5">
            <div class="d-flex align-start justify-space-between">
              <div>
                <h6 class="text-secondary text-h5">Bajaj Finery</h6>
                <span class="text-subtitle-2 text-medium-emphasis font-weight-bold">10% Profit</span>
              </div>
              <h4 class="text-h4">$1839.00</h4>
            </div>
          </div>
          <apexchart type="area" height="95" :options="chartOptions1" :series="lineChart1.series"> </apexchart>
        </v-card>
        <div class="mt-4">
          <!-- <perfect-scrollbar v-bind:style="{ height: '270px'}" > -->
            <v-list lines="two" class="py-0">
              <v-list-item v-for="(revenue, i) in revenues" :key="i" :value="revenue" color="secondary" rounded="sm">
                <template v-slot:append>
                  <div
                    class="bg-lightsuccess rounded-sm d-flex align-center justify-center ml-3"
                    style="width: 20px; height: 20px"
                    v-if="revenue.price > 145"
                  >
                    <ChevronUpIcon stroke-width="1.5" width="20" class="text-success" />
                  </div>
                  <div class="bg-lighterror rounded-sm d-flex align-center justify-center ml-3" style="width: 20px; height: 20px" v-else>
                    <ChevronDownIcon stroke-width="1.5" width="20" class="text-error" />
                  </div>
                </template>
                <div class="d-inline-flex align-center justify-space-between w-100">
                  <div>
                    <h6 class="text-subtitle-1 text-medium-emphasis font-weight-bold">
                      {{ revenue.name }}
                    </h6>
                    <span v-if="revenue.price > 145" class="text-success text-subtitle-2">{{ revenue.profit }}% Profit</span>
                    <span v-else class="text-error text-subtitle-2">{{ revenue.profit }}% Profit</span>
                  </div>

                  <div class="ml-auto text-subtitle-1 text-medium-emphasis font-weight-bold">${{ revenue.price }}</div>
                </div>
              </v-list-item>
            </v-list>
          <!-- </perfect-scrollbar> -->

          <div class="text-center mt-3">
            <v-btn color="primary" variant="text"
              >View All
              <template v-slot:append>
                <ChevronRightIcon stroke-width="1.5" width="20" />
              </template>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

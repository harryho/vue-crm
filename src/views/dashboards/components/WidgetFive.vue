<script setup lang="ts">
import { shallowRef } from 'vue';

// icons
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';

const fivecards = shallowRef([
  {
    name: 'Total Page Views',
    earn: '4,42,236',
    percent: '59.3%',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },
  {
    name: 'Total Users',
    earn: '78,250',
    percent: '70.5%',
    color: 'success',
    icon: RiseOutlined,
    text: '8,900'
  },
  {
    name: 'Total Order',
    earn: '18,800',
    percent: '27.4%',
    color: 'warning',
    icon: FallOutlined,
    text: '1,943'
  },
  {
    name: 'Total Sales',
    earn: '$35,078',
    percent: '27.4%',
    color: 'error',
    icon: FallOutlined,
    text: '$20,395'
  }
]);
</script>
<template>
  <v-row class="my-0">
    <v-col cols="12" sm="6" md="3" v-for="(card5, i) in fivecards" :key="i" :value="card5">
      <v-card elevation="0">
        <v-card variant="outlined">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1">{{ card5.name }}</h6>
                <h4 class="text-h4 d-flex align-center mb-0">
                  {{ card5.earn }}
                  <v-chip :color="card5.color" :border="`${card5.color} solid thin opacity-50`" class="ml-2" size="small" label>
                    <template v-slot:prepend>
                      <component :is="card5.icon" :style="{ fontSize: '12px' }" :class="'mr-1 text-' + card5.color" />
                    </template>
                    {{ card5.percent }}
                  </v-chip>
                </h4>
                <span class="text-lightText text-caption pt-5 d-block"
                  >You made an extra <span :class="'text-' + card5.color">{{ card5.text }}</span> this year</span
                >
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

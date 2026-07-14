<script setup lang="ts">
import { shallowRef } from 'vue';
// common components
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

// icons
import { SettingOutlined, GiftOutlined, MessageOutlined } from '@ant-design/icons-vue';

const transaction = shallowRef([
  {
    icon: GiftOutlined,
    subtitle: 'Today, 2:00 AM',
    title: 'Order #002434',
    color: 'success',
    price: '+ $1,430',
    pricepercent: '78%'
  },
  {
    icon: MessageOutlined,
    subtitle: '5 August, 1:45 PM',
    title: 'Order #984947',
    color: 'primary',
    price: '+ $302',
    pricepercent: '8%'
  },
  {
    icon: SettingOutlined,
    subtitle: '7 hours ago',
    title: 'Order #988784',
    color: 'error',
    price: '+ $682',
    pricepercent: '16%'
  }
]);
</script>
<template>
  <UiTitleCard title="Transaction History" class-name="px-0 pb-0 rounded-md overflow-hidden">
    <v-list lines="two" class="py-0" aria-busy="true" aria-label="Order list">
      <v-list-item v-for="history in transaction" :key="history.title" :value="history.title" border>
        <template v-slot:prepend>
          <v-avatar size="36" :color="history.color" :class="`text-${history.color}`" variant="tonal">
            <component :is="history.icon" :style="{ fontSize: '16px' }" />
          </v-avatar>
        </template>
        <div class="d-flex align-center justify-space-between w-100 ga-2">
          <div>
            <h6 class="text-subtitle-1 mb-0">{{ history.title }}</h6>
            <span class="text-subtitle-2 text-lightText font-weight-regular">{{ history.subtitle }}</span>
          </div>
          <div class="text-right">
            <h6 class="text-subtitle-1 mb-0">{{ history.price }}</h6>
            <span class="text-h6 text-lightText">{{ history.pricepercent }}</span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </UiTitleCard>
</template>

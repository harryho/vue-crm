<script setup lang="ts">
import { ref } from 'vue';
import * as repository from '@/data/repository';
import { computeDashboardAnalytics, type DashboardAnalytics } from '@/utils/analytics';
import { formatToCurrencyString } from '@/utils/locales/format';
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import AnalyticsSummaryCard from './components/AnalyticsSummaryCard.vue';
import RevenueByCategoryChart from './components/RevenueByCategoryChart.vue';
import OrdersByStatusChart from './components/OrdersByStatusChart.vue';
import OrdersOverTimeChart from './components/OrdersOverTimeChart.vue';
import RecentOrderActivity from './components/RecentOrderActivity.vue';
import TopProductsByRevenue from './components/TopProductsByRevenue.vue';

const loading = ref(true);
const analytics = ref<DashboardAnalytics | null>(null);

Promise.all([repository.getOrders(), repository.getProducts(), repository.getUsers()]).then(([orders, products, users]) => {
  analytics.value = computeDashboardAnalytics(orders, products, users);
  loading.value = false;
});
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Dashboard">
      <div v-if="loading">
        <v-progress-linear color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <v-row v-else-if="analytics">
        <v-col cols="12" sm="6" md="3">
          <AnalyticsSummaryCard title="Total Revenue" :total="`AUD ${formatToCurrencyString(analytics.totalRevenue)}`"
            color="primary" :series="analytics.revenueByCategory.series" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <AnalyticsSummaryCard title="Active Users" :total="String(analytics.activeUsers)" color="secondary"
            :series="analytics.ordersByMonth.series" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <AnalyticsSummaryCard title="Total Orders" :total="String(analytics.totalOrders)" color="warning"
            :series="analytics.ordersByStatus.series" />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <AnalyticsSummaryCard title="Low Stock SKUs" :total="String(analytics.lowStockCount)" color="error"
            :series="analytics.stockByCategory.lowStock" />
        </v-col>

        <v-col cols="12" lg="8">
          <RevenueByCategoryChart :categories="analytics.revenueByCategory.categories" :series="analytics.revenueByCategory.series" />
        </v-col>
        <v-col cols="12" lg="4">
          <RecentOrderActivity :list="analytics.recentStatusChanges" />
        </v-col>

        <v-col cols="12" lg="8">
          <OrdersOverTimeChart :categories="analytics.ordersByMonth.categories" :series="analytics.ordersByMonth.series" />
        </v-col>
        <v-col cols="12" lg="4">
          <OrdersByStatusChart :categories="analytics.ordersByStatus.categories" :series="analytics.ordersByStatus.series" />
        </v-col>

        <v-col cols="12">
          <TopProductsByRevenue :list="analytics.topProductsByRevenue" />
        </v-col>
      </v-row>
    </UiParentCard>
  </UiMainContainer>
</template>

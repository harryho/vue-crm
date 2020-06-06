<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <info-box />
    <v-layout class="" row wrap>
      <v-flex md6 xs12>
        <v-card light elevation="4">
          <monthly-sales />
        </v-card>
      </v-flex>
      <v-flex md6 xs12>
        <v-card light elevation="4">
          <order-forecast />
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="" row wrap>
      <v-flex md6 xs12 >
        <v-card light elevation="4">
          <horizontal-bar-chart />
        </v-card>
      </v-flex>
      <v-flex md6 xs12 >
        <v-card light elevation="4">
          <doughnut-chart></doughnut-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import InfoBox from "@/components/dashboard/InfoBox.vue";
import MonthlySales from "@/components/dashboard/MonthlySales";
import OrderForecast from "@/components/dashboard/OrderForecast";
import BarChart from "@/components/dashboard/Bar";
import DoughnutChart from "@/components/dashboard/Doughnut";
import HorizontalBarChart from "@/components/dashboard/HorizontalBarChart";
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component({
  name: "Dashboard",
  components: {
    InfoBox,
    MonthlySales,
    OrderForecast,
    BarChart,
    DoughnutChart,
    HorizontalBarChart
  }
})
export default class Dashboard extends Vue {}
</script>

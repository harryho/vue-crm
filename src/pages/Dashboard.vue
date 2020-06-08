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
          <product-analysis />
        </v-card>
      </v-flex>
      <v-flex md6 xs12 >
        <v-card light elevation="4">
          <browser-usage></browser-usage>
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
import BrowserUsage from "@/components/dashboard/BrowserUsage";
import ProductAnalysis from "@/components/dashboard/ProductAnalysis";
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component({
  name: "Dashboard",
  components: {
    InfoBox,
    MonthlySales,
    OrderForecast,
    BarChart,
    BrowserUsage,
    ProductAnalysis
  }
})
export default class Dashboard extends Vue {}
</script>

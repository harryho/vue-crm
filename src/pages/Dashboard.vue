<template>
  <v-container id="dashboard" fluid grid-list-lg class="mx-0 pa-0">
    <v-layout row wrap>
      <v-flex
        md3
        sm6
        xs12
        v-for="(stat, index) in monthlyStats"
        v-bind:key="index"
      >
        <v-card :class="stat.bgColor" dark>
          <v-container fluid grid-list-sm dark>
            <v-layout class="mt-0 mb-0 mx-1" row wrap>
              <v-flex sm3 hidden-xs-only>
                <v-icon class="mx-0" x-large dark>{{ stat.icon }}</v-icon>
              </v-flex>
              <v-flex sm9 xs12>
                <v-layout class="mt-0 mb-0 pa-0" row wrap>
                  <v-flex d-flex xs12>
                    <div class="silver--text subheading">{{ stat.title }}</div>
                  </v-flex>
                  <v-flex d-flex xs12>
                    <div class="silver--text display-1">{{ stat.data }}</div>
                    <v-spacer></v-spacer>
                    <v-btn
                      outlined
                      class="darkgrey--text darken-1"
                      right
                      text
                      small
                      >{{ stat.action.label }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="" row wrap>
      <v-flex md4 xs12>
        <v-card light>
          <doughnut-chart></doughnut-chart>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card light>
          <bar-chart></bar-chart>
        </v-card>
      </v-flex>
      <v-flex md4 xs12>
        <v-card light>
          <line-chart></line-chart>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import BarChart from "@/components/chart/Bar";
import DoughnutChart from "@/components/chart/Doughnut";
import LineChart from "@/components/chart/LineChart";
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component({
  name: "Dashboard",
  components: {
    BarChart,
    DoughnutChart,
    LineChart
  }
})
export default class Dashboard extends Vue {
  monthlyStats = [
    {
      bgColor: "cyan darken-3",
      icon: "mdi-wallet-membership",
      title: "New Order",
      data: "120",
      action: {
        label: "More Info",
        link: ""
      }
    },
    {
      bgColor: "deep-orange  lighten-3",
      icon: "mdi-wallet-giftcard",
      title: "User Registrationsr",
      data: "780",
      action: {
        label: "More Info",
        link: ""
      }
    },
    {
      bgColor: "blue-grey darken-1",
      icon: "mdi-wallet-travel",
      title: "Unique Visitors",
      data: "78",
      action: {
        label: "More Info",
        link: ""
      }
    },
    {
      bgColor: "pink  lighten-4",
      icon: "mdi-wall",
      title: "Bounce Rate",
      data: "53%",
      action: {
        label: "More Info",
        link: ""
      }
    }
  ];

}
</script>

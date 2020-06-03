<template>
  <div>
    <v-btn   elevation="4" class="blue-grey mr-2" fab small dark @click.native.stop="updateSearchPanel">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn   elevation="4" class="brown lighten-1  mr-2" fab small dark @click.native="reloadData()">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn   elevation="4" class="teal darken-2  mr-2" fab small dark @click.native="print()">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
    <v-btn   elevation="4" class="deep-orange darken-3" fab small dark @click.native="add">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class TableHeaderButtons extends Vue {
  @Prop() reloadData: () => void;
  @Prop() updateSearchPanel: () => void;
  @Prop() add: () => void;

  print() {
    window.print();
  }
}
</script>

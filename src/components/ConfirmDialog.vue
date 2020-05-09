<template>
  <v-dialog v-model="dialog" persistent max-width="320">
    <v-card>
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-card-text>{{ dialogText }}</v-card-text>
      <v-card-actions>
        <v-btn
          class="green--text darken-1"
          text="text"
          @click.native="$emit('onConfirm')"
          >Confirm</v-btn
        >
        <v-btn
          class="orange--text darken-1"
          text="text"
          @click.native="$emit('onCancel')"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component
export default class ConfirmDialog extends Vue {
  @Prop() dialogText!: string;
  @Prop() dialogTitle!: string;
  @Prop() dialog!: string;
  mini = false;
  isRootComponent = true;

  drawer = true;
  fixed = false;
  created() {}
  mounted() {}
}
</script>

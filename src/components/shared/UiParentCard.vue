<script setup lang="ts">

export interface UiParentCardProps {
  title: String;
  createFn?: () => {}
}


const props = defineProps({
  title: String,
  createFn:Function
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <v-card variant="elevated">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title>{{ props.title }}</v-card-title>
        <slot name="action">
          <v-btn v-if="props.createFn!==undefined" 
          @click="props.createFn" color="primary" variant="outlined">
          <template v-slot:prepend> <v-icon icon="$new" size="x-large"></v-icon></template> 
          New
          </v-btn>
        </slot>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

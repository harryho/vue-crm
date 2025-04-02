<template>
  <div class="logo">
    <RouterLink to="/" >
   
    <div>
    <v-avatar size="x-large" class="mr-2">
    <img src="@/assets/images/logos/it-logo-mid.png" width="60" /></v-avatar>
     <v-label class="secondary text-h2 cursor-pointer">Vue Demo V3</v-label>
    </div>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>

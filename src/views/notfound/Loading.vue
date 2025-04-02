<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { router } from "@/router";
const authStore = useAuthStore()

const isAuthenticated = authStore.isAuthenticated()

if(isAuthenticated){
  router.replace({path:'/error'})
}
else {
  router.replace({path:'/notfound'})
}

</script>

<template>

<v-progress-circular
  color="primary"
  indeterminate
  :size="96"
  :width="7"
></v-progress-circular>

</template>
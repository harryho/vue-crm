<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Tabler Icons' });
const icons = ref('<iframe src="https://tabler.io/icons" frameborder="0"  width="100%" height="600"></iframe>');
const breadcrumbs = ref([
  {
    title: 'Icons',
    disabled: false,
    href: '#'
  },
  {
    title: 'Tabler Icons',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Tabler Icons">
        <div v-html="icons"></div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

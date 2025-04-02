<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const page = ref({ title: 'Colors Page' });
const breadcrumbs = ref([
  {
    title: 'Utilities',
    disabled: false,
    href: '#'
  },
  {
    title: 'Colors',
    disabled: true,
    href: '#'
  }
]);

const colors = ref([
  'primary',
  'lightprimary',
  'secondary',
  'lightsecondary',
  'info',
  'success',
  'accent',
  'warning',
  'error',
  'darkText',
  'lightText',
  'borderLight',
  'inputBorder',
  'containerBg'
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Color Palette">
        <v-row>
          <v-col md="3" cols="12" v-for="(color, index) in colors" :key="index">
            <v-sheet rounded="md" class="align-center justify-center d-flex" height="100" width="100%" :color="color"
              >class: {{ color }}
            </v-sheet>
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

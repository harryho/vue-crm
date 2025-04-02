<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';

const page = ref({ title: 'Typography Page' });
const headings = ref([
  ['Heading 1', 'text-h1'],
  ['Heading 2', 'text-h2'],
  ['Heading 3', 'text-h3'],
  ['Heading 4', 'text-h4'],
  ['Heading 5', 'text-h5'],
  ['Heading 6', 'text-h6'],
  ['Subtitle 1', 'text-subtitle-1'],
  ['Subtitle 2', 'text-subtitle-2'],
  ['Body 1', 'text-body-1'],
  ['Body 2', 'text-body-2'],
  ['Button', 'text-button'],
  ['Caption', 'text-caption'],
  ['Overline', 'text-overline']
]);
const breadcrumbs = ref([
  {
    title: 'Utilities',
    disabled: false,
    href: '#'
  },
  {
    title: 'Typography',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Basic Typography">
        <UiChildCard title="Heading">
          <div class="d-flex flex-column gap-1">
            <v-card variant="outlined" v-for="[name, cls] in headings" :key="name" class="my-4">
              <div :class="[cls, 'pa-2']">{{ name }}</div>
              <div class="text-caption pa-2 bg-lightprimary">
                <div class="text-grey">Class</div>
                <div class="font-weight-medium">{{ cls }}</div>
              </div>
            </v-card>
          </div>
        </UiChildCard>
        <UiChildCard title="Text-alignment" class="mt-8">
          <div>
            <p class="text-left">Left aligned on all viewport sizes.</p>
            <p class="text-center">Center aligned on all viewport sizes.</p>
            <p class="text-right">Right aligned on all viewport sizes.</p>

            <p class="text-sm-left">Left aligned on viewports SM (small) or wider.</p>
            <p class="text-right text-md-left">Left aligned on viewports MD (medium) or wider.</p>
            <p class="text-right text-lg-left">Left aligned on viewports LG (large) or wider.</p>
            <p class="text-right text-xl-left">Left aligned on viewports XL (extra-large) or wider.</p>
          </div>
        </UiChildCard>
        <UiChildCard title="Decoration" class="mt-8">
          <div class="d-flex justify-space-between flex-wrap">
            <a href="#" class="text-decoration-none">Non-underlined link</a>

            <div class="text-decoration-line-through">Line-through text</div>

            <div class="text-decoration-overline">Overline text</div>

            <div class="text-decoration-underline">Underline text</div>
          </div>
        </UiChildCard>
        <UiChildCard title="Opacity" class="mt-8">
          <div>
            <p class="text-high-emphasis">High-emphasis has an opacity of 87% in light theme and 100% in dark.</p>
            <p class="text-medium-emphasis">Medium-emphasis text and hint text have opacities of 60% in light theme and 70% in dark.</p>
            <p class="text-disabled">Disabled text has an opacity of 38% in light theme and 50% in dark.</p>
          </div>
        </UiChildCard>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

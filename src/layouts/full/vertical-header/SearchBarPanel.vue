<script setup>
import { SearchIcon, AdjustmentsHorizontalIcon, XIcon } from 'vue-tabler-icons';

const props = defineProps({
  closesearch: {
    type: Function,
    required: false
  }
});
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- searchbar -->
  <!-- ---------------------------------------------- -->
  <v-text-field persistent-placeholder placeholder="Search" color="primary" variant="outlined" hide-details>
    <template v-slot:prepend-inner>
      <SearchIcon stroke-width="1.5" size="17" class="text-lightText SearchIcon" />
    </template>
    <template v-slot:append-inner>
      <v-btn color="lightsecondary" icon rounded="sm" variant="flat" size="small" class="text-secondary SearchSetting">
        <AdjustmentsHorizontalIcon stroke-width="1.5" size="20" />
      </v-btn>
      <v-btn
        color="lighterror"
        icon
        rounded="sm"
        variant="flat"
        size="small"
        class="text-error SearchSetting ml-3 d-block d-lg-none"
        @click="props.closesearch"
      >
        <XIcon stroke-width="1.5" size="20" />
      </v-btn>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

defineProps<{
  list: { id: string; type: string; title: string; time: string }[];
}>();

const DOT_COLOR: Record<string, string> = {
  order1: 'warning',
  order2: 'info',
  order3: 'primary',
  order4: 'success',
  order5: 'error'
};
</script>

<template>
  <UiTitleCard title="Recent Order Activity" :className="'pt-2'">
    <v-timeline density="compact" side="end" v-if="list.length">
      <v-timeline-item v-for="entry in list" :key="entry.id" :dot-color="DOT_COLOR[entry.type] ?? 'primary'" size="x-small">
        <div class="text-body-2 font-weight-medium">{{ entry.title }}</div>
        <div class="text-caption text-medium-emphasis">{{ new Date(entry.time).toLocaleString() }}</div>
      </v-timeline-item>
    </v-timeline>
    <p v-else class="text-medium-emphasis">No recent order activity.</p>
  </UiTitleCard>
</template>

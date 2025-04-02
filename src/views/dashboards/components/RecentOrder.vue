<script setup lang="ts">
import { shallowRef } from 'vue';

import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const projects = shallowRef([
  {
    number: 13256498,
    order: 125,
    name: 'Keyboard',
    amount: '$70,999',
    priority: 'rejected'
  },
  {
    number: 13286564,
    order: 100,
    name: 'Computer Accessories',
    amount: '$83,348',
    priority: 'approved'
  },
  {
    number: 84564564,
    order: 40,
    name: 'Camera Lens',
    amount: '$40,570',
    priority: 'rejected'
  },
  {
    number: 86739658,
    order: 99,
    name: 'TV',
    amount: '$410,780',
    priority: 'pending'
  },
  {
    number: 98652366,
    order: 50,
    name: 'Handset',
    amount: '$10,239',
    priority: 'approved'
  },
  {
    number: 98753263,
    order: 89,
    name: 'Mouse',
    amount: '$10,570',
    priority: 'rejected'
  },
  {
    number: 98753275,
    order: 185,
    name: 'Desktop',
    amount: '$98,063',
    priority: 'approved'
  },
  {
    number: 98753291,
    order: 100,
    name: 'Chair',
    amount: '$14,001',
    priority: 'pending'
  },
  {
    number: 98756325,
    order: 355,
    name: 'Mobile',
    amount: '$90,989',
    priority: 'approved'
  },
  {
    number: 98764564,
    order: 300,
    name: 'Laptop',
    amount: '$180,139',
    priority: 'pending'
  }
]);
</script>

<template>
  <UiTitleCard title="Recent Orders" class-name="px-0 pb-0 rounded-md">
    <v-table class="bordered-table" hover density="comfortable">
      <thead class="bg-containerBg">
        <tr>
          <th class="text-left text-caption font-weight-bold text-uppercase">Tracking no.</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Product name</th>
          <th class="text-right text-caption font-weight-bold text-uppercase" style="min-width: 100px">Total order</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Status</th>
          <th class="text-right text-caption font-weight-bold text-uppercase">Total amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projects" :key="item.name">
          <td class="py-3">
            <router-link to="/dashboard" class="text-secondary link-hover">{{ item.number }}</router-link>
          </td>
          <td class="py-3">{{ item.name }}</td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.order }}</td>
          <td class="py-3">
            <v-chip variant="text" size="small" class="px-0" v-if="item.priority === 'rejected'">
              <v-avatar size="8" color="error" variant="flat" class="mr-2"></v-avatar>
              <p class="text-h6 mb-0">Rejected</p>
            </v-chip>
            <v-chip variant="text" size="small" class="px-0" v-else-if="item.priority === 'approved'">
              <v-avatar size="8" color="success" variant="flat" class="mr-2"></v-avatar>
              <p class="text-h6 mb-0">Approved</p>
            </v-chip>
            <v-chip variant="text" size="small" class="px-0" v-else>
              <v-avatar size="8" color="warning" variant="flat" class="mr-2"></v-avatar>
              <p class="text-h6 mb-0">Pending</p>
            </v-chip>
          </td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.amount }}</td>
        </tr>
      </tbody>
    </v-table>
  </UiTitleCard>
</template>

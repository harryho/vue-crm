<script setup lang="ts">
import { useOrdersStore } from "@/stores/orders";
import * as repository from "@/data/repository";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import UiMainContainer from "@/components/shared/UiMainContainer.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { router } from "@/router";
import { toTitleCase, formatToCurrencyString } from "@/utils/locales/format";
import type { User } from "@/types";

const headers = [
  { title: "Order No.", key: "orderNumber", algin: "start" },
  { title: "Customer", key: "userId", algin: "start" },
  { title: "Amount", key: "grandTotal", algin: "end" },
  { title: "Shipped At", key: "shippedAt", algin: "end" },
  { title: "Status", key: "status", algin: "start" },
  { title: "", key: "orderId", algin: "end" },
];

const orderStore = useOrdersStore();
orderStore.getAll()
const { filteredData } = storeToRefs(orderStore)
const search = ref('')
const users = ref<User[]>([])
repository.getUsers().then((u) => (users.value = u))

function customerName(userId: number): string {
  const user = users.value.find((u) => u.userId === userId)
  return user ? `${user.firstName} ${user.lastName}` : `User ${userId}`
}

function editOrder(id: number) {
  router.replace({ path: `/order/${id}` });
}

function getColor(status: string): string {
  switch (status) {
    case 'delivered':
      return 'success'
    case 'pending':
      return 'warning'
    case 'paid':
      return 'info'
    case 'shipped':
      return 'info'
    case 'cancelled':
      return 'error'
    default:
      return ''
  }
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Orders">
      <div v-if="orderStore.loading">
        <v-progress-linear  color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <div v-if="!orderStore.loading">
        <v-data-table :headers="headers" :items="filteredData" :search="search" show-expand>
          <template v-slot:top>
            <v-text-field v-model="search" variant="solo-filled" class="pa-2" label="Filter"></v-text-field>
          </template>
          <template v-slot:item.userId="{ value }">
            {{ customerName(value) }}
          </template>
          <template v-slot:item.grandTotal="{ value }">
            AUD {{ formatToCurrencyString(value) }}
          </template>
          <template v-slot:item.shippedAt="{ item }">
            {{ item.shipment?.shippedAt ? new Date(item.shipment.shippedAt).toLocaleDateString() : '-' }}
          </template>
          <template v-slot:item.status="{ value }">
            <v-chip :border="`${getColor(value)} thin opacity-10`"  :color="getColor(value)" :text="toTitleCase(value)"
              size="small"></v-chip>
          </template>
          <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand }">
            <v-btn :append-icon="isExpanded(internalItem) ? '$collapse' : '$expand'"
              :text="isExpanded(internalItem) ? 'Collapse' : 'Address'" class="text-none" color="medium-emphasis"
              size="small" variant="text" border slim @click="toggleExpand(internalItem)"></v-btn>
          </template>

          <template v-slot:expanded-row="{ columns, item }">
            <tr>
              <td :colspan="columns.length" class="py-2">
                <v-sheet rounded="lg" border>
                  <v-table density="compact">
                    <tbody class="bg-surface-light">
                      <tr>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Postal Code</th>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr>
                        <td>
                          {{ item.shipTo.line1 }}
                        </td>
                        <td>{{ item.shipTo.city }}</td>
                        <td>{{ item.shipTo.countryCode }}</td>
                        <td>{{ item.shipTo.postalCode }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-sheet>
              </td>
            </tr>
          </template>
          <template v-slot:item.orderId="{ value }">
            <div class="d-flex ga-6 p-r-5 justify-end">
              <v-icon color="secondary" icon="$edit" size="x-large" @click="editOrder(value)"></v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </UiParentCard>
  </UiMainContainer>
</template>

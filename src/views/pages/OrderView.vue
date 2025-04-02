<script setup lang="ts">
import { useOrdersStore } from "@/stores/orders";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import UiMainContainer from "@/components/shared/UiMainContainer.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import NotificationBar from "@/components/shared/NotificeBar.vue";
import { router } from "@/router";
import { toTitleCase } from "@/utils/locales/format";

const headers = [
  { title: "Reference No.", key: "reference", algin: "start" },
  { title: "Customer", key: "customer", algin: "start" },
  { title: "Amount", key: "amount", algin: "end" },
  { title: "Shipping Date", key: "shippingDate", algin: "end" },
  { title: "Delivery", key: "delivery", algin: "start" },
  { title: "", key: "id", algin: "end" },
];

const orderStore = useOrdersStore();
orderStore.getAll()
const { filteredData } = storeToRefs(orderStore)
const dialog = ref(false)
const search = ref('')
const notice = ref(false)
const selectedId = ref('')
const AVATAR_PLACEHOLDER = "/src/assets/images/order/avatar-0.webp"

function editOrder(id: string) {
  router.replace({ path: `/order/${id}` });
}

function deleteOrder(id: string) {
  dialog.value = true
  selectedId.value = id
}

function onConfirm() {
  if (selectedId.value) {
    orderStore.delteOrder(selectedId.value)
      .then((res) => {
        dialog.value = false
        if (res.status) {
          notice.value = true
          setTimeout(() => {
            notice.value = false;
            orderStore.getAll()
          }, 1000)
        }
      })
      .finally(() => selectedId.value = '');
  }
}

function onCancel() {
  dialog.value = false
}

function onClose() {
  notice.value = false
}


function getColor(deliveryStatus: string): string {
  switch (deliveryStatus) {
    case 'delivered':
      return 'success'
    case 'packaging':
      return 'error'
    case 'customs-clearance':
      return 'info'
    case 'shipping':
      return 'warning'
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
          <template v-slot:item.delivery="{ value }">
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
                        <th>Street</th>
                        <th>City</th>
                        <th>County</th>
                        <th>Zip Code</th>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr>
                        <td>
                          {{ item.shippingAddress.street }}
                        </td>
                        <td>{{ item.shippingAddress.city }}</td>
                        <td>{{ item.shippingAddress.country }}</td>
                        <td>{{ item.shippingAddress.zipcode }}</td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-sheet>
              </td>
            </tr>
          </template>
          <template v-slot:item.id="{ value }" v-slot:append>
            <div class="d-flex ga-6 p-r-5 justify-end">
              <v-icon color="secondary" icon="$edit" size="x-large" @click="editOrder(value)"></v-icon>
              <v-icon color="disabled" icon="$delete" size="x-large" @click="deleteOrder(value)"></v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </UiParentCard>
    <ConfirmDialog :dialog="dialog" @onConfirm="onConfirm" @onCancel="onCancel" />
    <NotificationBar :notice="notice" @onClose="onClose" />
  </UiMainContainer>
</template>

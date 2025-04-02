<script setup lang="ts">
import { useCustomersStore } from "@/stores/customers";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import UiMainContainer from "@/components/shared/UiMainContainer.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import NotificationBar from "@/components/shared/NotificeBar.vue";
import { router } from "@/router";
const headers = [
  { title: "", key: "avatar", algin: "start" },
  { title: "First Name", key: "firstname", algin: "start" },
  { title: "Last Name", key: "lastname", algin: "start" },
  { title: "E-mail", key: "email", algin: "start" },
  { title: "Membership", key: "membership", algin: "start" },
  { title: "Rewards", key: "rewards", algin: "end" },
  { title: "Pending Sales", key: "hasItemInShoppingCart", algin: "start" },
  { title: "", key: "id", algin: "end" },
];

const customerStore = useCustomersStore();
customerStore.getAll()
const { filteredData } = storeToRefs(customerStore)
const dialog = ref(false)
const search = ref('')
const notice = ref(false)
const selectedId = ref('')
const AVATAR_PLACEHOLDER = "/src/assets/images/customer/avatar-0.webp"

function editCustomer(id: string) {
  router.replace({ path: `/customer/${id}` });
}

function deleteCustomer(id: string) {
  dialog.value = true
  selectedId.value = id
}

function onConfirm() {
  if (selectedId.value) {
    customerStore.delteCustomer(selectedId.value)
      .then((res) => {
        dialog.value = false
        if (res.status) {
          notice.value = true
          setTimeout(() => {
            notice.value = false;
            customerStore.getAll()
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

function onCreate() {
  router.replace({ path: '/customer/new' })
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Customers" :createFn="onCreate">
      <div v-if="customerStore.loading">
        <v-progress-linear color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <div v-if="!customerStore.loading">
        <v-data-table :headers="headers" :items="filteredData" :search="search">
          <template v-slot:top>
            <v-text-field v-model="search" variant="solo-filled" class="pa-2" label="Filter"></v-text-field>
          </template>
          <template v-slot:item.avatar="{ value }">
            <v-avatar size="36px">
              <v-img alt="Avatar" v-if="value" :src="value"></v-img>
              <v-img alt="Avatar" v-if="!value" :src="AVATAR_PLACEHOLDER"></v-img>
            </v-avatar>
          </template>
          <template v-slot:item.membership="{ value }" class="d-flex justify-centre">
            <v-avatar size="60">
              <v-tooltip text="Standard" location="top">
                <template  v-slot:activator="{ props }">
                  <v-icon size="x-large" v-bind="props"  v-if="value === 'standard'" alt="Standard" title="Standard" icon="$standard"
                    color="info"></v-icon>
                </template>
              </v-tooltip>
              <v-tooltip text="VIP" location="top">
                <template v-slot:activator="{ props }">
                  <v-icon size="x-large" v-bind="props" v-if="value === 'vip'" alt="VIP" icon="$vip"
                    color="warning"></v-icon></template>
              </v-tooltip>
            </v-avatar>
          </template>

          <template v-slot:item.hasItemInShoppingCart="{ value }">
            <v-avatar size="60">
              <v-icon size="x-large" v-if="value" icon="$pendingShopping" color="error"></v-icon>
            </v-avatar>
          </template>
          <template v-slot:item.id="{ value }">
            <div class="d-flex ga-6 p-r-5 justify-end">
              <v-icon color="secondary" icon="$edit" size="x-large" @click="editCustomer(value)"></v-icon>
              <v-icon color="disabled" icon="$delete" size="x-large" @click="deleteCustomer(value)"></v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </UiParentCard>
    <ConfirmDialog :dialog="dialog" @onConfirm="onConfirm" @onCancel="onCancel" />
    <NotificationBar :notice="notice" @onClose="onClose" />
  </UiMainContainer>
</template>

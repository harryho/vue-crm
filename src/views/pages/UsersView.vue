<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import UiMainContainer from "@/components/shared/UiMainContainer.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import NotificationBar from "@/components/shared/NotificeBar.vue";
import { router } from "@/router";
import { assetUrl } from "@/utils/asset-url";

const headers = [
  { title: "", key: "avatarUrl", algin: "start" },
  { title: "First Name", key: "firstName", algin: "start" },
  { title: "Last Name", key: "lastName", algin: "start" },
  { title: "E-mail", key: "email", algin: "start" },
  { title: "Location", key: "location", algin: "start" },
  { title: "Status", key: "isActive", algin: "start" },
  { title: "", key: "userId", algin: "end" },
];

const usersStore = useUsersStore();
usersStore.getAll();
const { filteredData } = storeToRefs(usersStore);
const dialog = ref(false);
const search = ref('');
const notice = ref(false);
const selectedId = ref(0);
const AVATAR_PLACEHOLDER = "/assets/images/customer/avatar-0.webp";

function defaultAddress(user: (typeof filteredData.value)[number]) {
  return user.addresses.find((a) => a.isDefaultShipping) ?? user.addresses[0];
}

function editUser(id: number) {
  router.replace({ path: `/user/${id}` });
}

function deleteUser(id: number) {
  dialog.value = true;
  selectedId.value = id;
}

function onConfirm() {
  if (selectedId.value) {
    usersStore.deleteUser(selectedId.value)
      .then(() => {
        dialog.value = false;
        notice.value = true;
        setTimeout(() => {
          notice.value = false;
          usersStore.getAll();
        }, 1000);
      })
      .finally(() => selectedId.value = 0);
  }
}

function onCancel() {
  dialog.value = false;
}

function onClose() {
  notice.value = false;
}

function onCreate() {
  router.replace({ path: '/user/new' });
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Users" :createFn="onCreate">
      <div v-if="usersStore.loading">
        <v-progress-linear color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <div v-if="!usersStore.loading">
        <v-data-table :headers="headers" :items="filteredData" :search="search">
          <template v-slot:top>
            <v-text-field v-model="search" variant="solo-filled" class="pa-2" label="Filter"></v-text-field>
          </template>
          <template v-slot:item.avatarUrl="{ value }">
            <v-avatar size="36px">
              <v-img alt="Avatar" v-if="value" :src="assetUrl(value)"></v-img>
              <v-img alt="Avatar" v-if="!value" :src="assetUrl(AVATAR_PLACEHOLDER)"></v-img>
            </v-avatar>
          </template>
          <template v-slot:item.location="{ item }">
            <span v-if="defaultAddress(item)">{{ defaultAddress(item)!.city }}, {{ defaultAddress(item)!.countryCode }}</span>
            <span v-else>-</span>
          </template>
          <template v-slot:item.isActive="{ value }">
            <v-chip :color="value ? 'success' : 'default'" size="small">{{ value ? 'Active' : 'Inactive' }}</v-chip>
          </template>
          <template v-slot:item.userId="{ value }">
            <div class="d-flex ga-6 p-r-5 justify-end">
              <v-icon color="secondary" icon="$edit" size="x-large" @click="editUser(value)"></v-icon>
              <v-icon color="disabled" icon="$delete" size="x-large" @click="deleteUser(value)"></v-icon>
            </div>
          </template>
        </v-data-table>
      </div>
    </UiParentCard>
    <ConfirmDialog :dialog="dialog" @onConfirm="onConfirm" @onCancel="onCancel" />
    <NotificationBar :notice="notice" @onClose="onClose" />
  </UiMainContainer>
</template>

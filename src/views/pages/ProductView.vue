<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import UiParentCard from "@/components/shared/UiParentCard.vue";
import UiMainContainer from "@/components/shared/UiMainContainer.vue";

import { storeToRefs } from "pinia";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import NotificationBar from "@/components/shared/NotificeBar.vue";
import { router } from "@/router";
import { formatToCurrencyString } from "@/utils/locales/format";
import { ref } from "vue";


const productStore = useProductsStore();
productStore.getAll()
const { filteredData, filter, totalPages, currentPage, totalCount } = storeToRefs(productStore)
const dialog = ref(false)

const notice = ref(false)
const selectedId = ref(0)
const AVATAR_PLACEHOLDER = "/src/assets/images/product/product-0.webp"

function editProduct(id: number) {
  router.replace({ path: `/product/${id}` });
}

function deleteProduct(id: number) {
  dialog.value = true
  selectedId.value = id
}

function onConfirm() {
  if (selectedId.value) {
    productStore.deleteProduct(selectedId.value)
      .then(() => {
        dialog.value = false
        notice.value = true
        setTimeout(() => {
          notice.value = false;
          productStore.getAll()
        }, 1000)
      })
      .finally(() => selectedId.value = 0);
  }
}

function onCancel() {
  dialog.value = false
}

function onClose() {
  notice.value = false
}

function onCreate() {
  router.replace({ path: '/product/new' })
}
</script>

<template>
  <UiMainContainer>
    <UiParentCard title="Products" :createFn="onCreate">
      <div v-if="productStore.loading">
        <v-progress-linear color="secondary" height="6" indeterminate rounded></v-progress-linear>
      </div>
      <div v-if="!productStore.loading">

        <v-text-field v-model="filter" variant="solo-filled" class="pa-2" label="Filter"></v-text-field>

        <v-divider class="mb-10" />
        <v-row>
          <v-col cols="12" md="4" sm="6" v-for="(product, index) in filteredData" :key="index">
            <v-card variant="elevated" class="mx-auto ma-5" max-width="360">
              <v-img class="product-img align-end text-primary b-r-25" height="250" :src="product.images[0]?.url" cover>

              </v-img>
              <v-card-title class=" text-h3"> {{ product.name }}
              </v-card-title>

              <v-card-text class="d-flex justify-space-between">
                <div class="ml-0 text-h4 price">
                  AUD {{ formatToCurrencyString(product.variants[0].price) }}</div>
                <v-chip color="primary" size="small">{{ product.categoryName }}</v-chip>
              </v-card-text>

              <v-card-actions class="d-flex justify-space-between">
                <div>
                  <v-chip v-if="product.variants[0].quantityOnHand === 0" color="error">out of stock</v-chip>
                  <v-chip v-else color="success">in stock</v-chip>
                  <v-spacer />
                </div>
                <div>
                  <v-btn color="secondary mb-0" variant="outlined" text="Edit" title="Edit" size="small"
                    @click="editProduct(product.productId)"></v-btn>
                  <v-btn color="primary" variant="plain" text="Delete" size="large"
                    @click="deleteProduct(product.productId)"></v-btn>

                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" lg="12" class="d-flex  justify-center">
            <v-chip class="text-h5" color="primary"> Total: {{ totalCount }}</v-chip>
          </v-col>
        </v-row>
        <v-divider class="my-5" />

        <v-pagination v-model="currentPage" :length="totalPages" rounded="circle"></v-pagination>
      </div>
    </UiParentCard>
    <ConfirmDialog :dialog="dialog" @onConfirm="onConfirm" @onCancel="onCancel" />
    <NotificationBar :notice="notice" @onClose="onClose" />
  </UiMainContainer>
</template>
<style lang="scss">
.product-img {
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;

}

.price {
  color: rgb(226, 163, 45)
}
</style>

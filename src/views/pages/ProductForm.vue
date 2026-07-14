<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useProductsStore } from '@/stores/products';
import * as repository from '@/data/repository';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import type { Category } from '@/types';

const AVATAR_PLACEHOLDER = "/src/assets/images/product/product-0.webp"

const route = useRoute();
const router = useRouter();
const title = ref('')
const valid = ref(false)
const loading = ref(false)
const form = ref()
const productStore = useProductsStore()
const categories = ref<Category[]>([])
repository.getCategories().then((c) => (categories.value = c))

if (route.params['id']) {
    title.value = 'Edit Product'
    productStore.getProductById(Number(route.params['id']))
}
else {
    title.value = 'New Product'
    productStore.newProduct()
}

const { product } = storeToRefs(productStore)

const requiredRule = (value: any) => value ? true : 'This field is required.'
const postiveNumberRule = (value: any) => value > 0 ? true : 'This number must be greater than 0.'
const nameRules = [
    requiredRule,
    (value: any) =>
        (value?.length <= 30) ? true :
            'Name must be less than 30 characters.']

function onCategoryChange(categoryId: number) {
    const category = categories.value.find((c) => c.categoryId === categoryId)
    product.value.categoryName = category?.name ?? ''
}

function onCancel() {
    router.replace({ path: `/product` });
}

async function submit(event: any) {
    event.preventDefault();

    const { valid } = await form.value.validate()

    if (valid) {
        loading.value = true
        await productStore.saveProduct(product.value)
        router.replace({ path: '/product' })
        loading.value = false
    }
}
</script>

<template>

    <UiMainContainer>

        <UiParentCard :title="title">

            <div v-if="!productStore.loading">
                <v-form ref="form" v-model="valid" @submit.prevent>
                    <v-container>
                        <v-row justify="start">
                            <v-col cols="12" md="4">

                                <v-img size="500" alt="Product" v-if="product.images[0]?.url" :src="product.images[0].url"></v-img>
                                <v-img alt="Product" v-if="!product.images[0]?.url" :src="AVATAR_PLACEHOLDER"></v-img>

                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="product.name" :rules="nameRules" label="Product Name"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-select label="Category" v-model="product.categoryId" :rules="[requiredRule]"
                                    :items="categories.map((c) => ({ title: c.name, value: c.categoryId }))"
                                    variant="solo-filled" @update:model-value="onCategoryChange"></v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field type="number" v-model="product.variants[0].quantityOnHand"
                                    :rules="[requiredRule]" variant="solo-filled" increment="1" label="Unit In Stock"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field type="number" v-model="product.variants[0].price"
                                    :rules="[requiredRule, postiveNumberRule]" label="Unit Price"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                    <v-row justify="end">
                        <v-col cols="12" lg="2" md="6" sm="12" justify="end" class="">
                            <v-spacer></v-spacer>
                            <div class="d-flex ga-6 mt-8 justify-end">
                                <v-btn :loading="loading" color="secondary" variant="flat" type="submit"
                                    @click="submit">
                                    Submit
                                </v-btn>

                                <v-btn @click="onCancel" color="primary" variant="outlined">
                                    Cancel
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>

            </div>
        </UiParentCard>

    </UiMainContainer>

</template>

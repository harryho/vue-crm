<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useProductsStore } from '@/stores/products';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';



const AVATAR_PLACEHOLDER = "/src/assets/images/product/product-0.webp"


const route = useRoute();
const router = useRouter();
const title = ref('')
const valid = ref(false)
const loading = ref(false)
const form = ref()
const productStore = useProductsStore()

if (route.params['id']) {
    title.value = 'Edit Product'
    productStore.getProductById(route.params['id'] as any)
}
else {
    title.value = 'New Product'
    productStore.newProduct()
}

const { product } = storeToRefs(productStore)

const requiredRule =  (value: any) =>  value? true:'This field is required.'
const postiveNumberRule =  (value: any) =>  value>0? true:'This number must be greater than 0.'
const nameRules = [
    requiredRule,
    (value: any) => 
         (value?.length <= 30) ? true:
         'Name must be less than 30 characters.']
const emailRules = [
    requiredRule,
    (value: any) => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    },
]

function onCancel() {
    if (productStore.product)
        productStore.product = {} as any
    router.replace({ path: `/product` });
}

async function submit(event:any) {
    event.preventDefault();

    const { valid } = await form.value.validate()

    if (valid) {
        loading.value = true
        const results: any = await productStore.saveProduct(product.value)

        if (results.status) {
            router.replace({ path: '/product' })
        }
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
            
                                    <v-img  size="500" alt="Avatar" v-if="product.imageUri" :src="product.imageUri"></v-img>
                                    <v-img alt="Avatar" v-if="!product.imageUri" :src="AVATAR_PLACEHOLDER"></v-img>
                
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <!-- -->
                                <v-text-field v-model="product.name" :rules="nameRules" label="Product Name"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field type="number" v-model="product.unitInStock" :rules="[requiredRule]" variant="solo-filled"
                                 increment="1"   label="Unit In Stock" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="product.price" :rules="[requiredRule,postiveNumberRule]" label="Unit Price"
                                    variant="solo-filled" required></v-text-field>
                            </v-col>


                            <v-col cols="12" md="4">
                      
                                <v-text-field v-model="product.retailPrice" :rules="[requiredRule]"label="Retail Price"
                               disabled   variant="solo-filled" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                    <v-row justify="end">
                        <v-col cols="12" lg="2" md="6" sm="12" justify="end" class="">
                            <v-spacer></v-spacer>
                            <div class="d-flex ga-6 mt-8 justify-end">
                                <v-btn      :loading="loading" color="secondary" variant="flat" type="submit" @click="submit">
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
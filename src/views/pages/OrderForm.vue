<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useOrdersStore } from '@/stores/orders';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { formatToCurrencyString } from '@/utils/locales/format';

const route = useRoute();
const router = useRouter();
const title = ref('')
const valid = ref(false)
const loading = ref(false)
const form = ref()
const orderStore = useOrdersStore()
const DELIVERY_STATUS=          ['packing','shipping','customs-clearance','delivered']

if (route.params['id']) {
    title.value = 'Edit Order'
    orderStore.getOrderById(route.params['id'] as any)
}


const { order, getStepVal } = storeToRefs(orderStore)

const requiredRule = (value: any) => value ? true : 'This field is required.'
const nameRules = [
    requiredRule,
    (value: any) =>
        (value?.length <= 20) ? true :
            'Name must be less than 10 characters.']
const emailRules = [
    requiredRule,
    (value: any) => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    },
]

function onCancel() {
    if (orderStore.order)
        orderStore.order = {} as any
    router.replace({ path: `/order` });
}

async function submit(event: any) {
    event.preventDefault();


    const valid = order.value.delivery !== 'delivered'

    if (valid) {
        loading.value = true
        const currentIdx =  DELIVERY_STATUS.findIndex( s=>s === order.value.delivery )

        order.value.delivery = DELIVERY_STATUS[currentIdx+1]

        const results: any = await orderStore.saveOrder(order.value)

        if (results.status) {
            router.replace({ path: '/order' })
        }
        loading.value = false
    }
}


</script>

<template>

    <UiMainContainer>

        <UiParentCard :title="title">

            <div v-if="!orderStore.loading">

                <v-stepper v-model="getStepVal" class="mb-10">
                    <v-stepper-header variant="flat">
                        <v-stepper-item title="Packing" value="1" complete></v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item title="Shipping" value="2"></v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item title="Customs Clearance" value="3"></v-stepper-item>
                        <v-divider></v-divider>

                        <v-stepper-item title="Delivered" value="4"></v-stepper-item>
                    </v-stepper-header>
                </v-stepper>

                <v-divider />
                <v-form ref="form" v-model="valid" @submit.prevent>
                    <v-container>

                        <v-row>
                            <v-col cols="12" md="4">
                
                                <v-text-field class="disable" v-model="order.reference" :rules="nameRules"
                                    label="First name" disabled variant="solo-filled" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="order.customer" :rules="nameRules" variant="solo-filled" disabled
                                    label="Customer" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="order.amount" :rules="emailRules" label="Amount" disabled
                                    variant="solo-filled" required></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-date-input v-model="order.billingDate" clearable prepend-inner-icon="$calendar"
                                    disabled prepend-icon="" label="Billing Date" variant="solo-filled"></v-date-input>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-date-input :rules="[requiredRule]" v-model="order.shippingDate" clearable disabled
                                    prepend-inner-icon="$calendar" prepend-icon="" label="Date input"
                                    variant="solo-filled"></v-date-input>

                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider class="my-5" />

                    <v-card variant="flat">
                        <v-card-subtitle class="f-w-800">Address</v-card-subtitle>
                        <v-card-text>
                        <v-sheet rounded="0" border>
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
                                            {{ order.shippingAddress.street }}
                                        </td>
                                        <td>{{ order.shippingAddress.city }}</td>
                                        <td>{{ order.shippingAddress.country }}</td>
                                        <td>{{ order.shippingAddress.zipcode }}</td>
                                    </tr>
                                </tbody>
                            </v-table>

                        </v-sheet>
                        </v-card-text>
                    </v-card>
                    <v-divider class="my-5" />
                    <v-card variant="flat">
                        <v-card-subtitle class="f-w-800">Items</v-card-subtitle>
                        <v-card-text>
                    <v-sheet rounded="" border>
                        <v-table density="compact">
                            <tbody class="bg-surface-light">
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>

                                    <th>Category</th>
                                    <th>Price</th>

                                </tr>
                            </tbody>

                            <tbody>
                                <tr v-for="(lineItem, index) in order.lineItems" :key="index" height="100">
                                    <td><v-img :src="lineItem.imageUri" size="100" /></td>
                                    <td>
                                        {{ lineItem.name }}
                                    </td>

                                    <td>{{ lineItem.category }}</td>
                                    <td>AUD {{ formatToCurrencyString(lineItem.price) }}</td>

                                </tr>
                            </tbody>
                        </v-table>
                    </v-sheet>
                    </v-card-text>
                    </v-card>

                    <v-divider class="my-5" />

                    <v-row justify="end">
                        <v-col cols="12" lg="2" md="6" sm="12" justify="end" class="">
                            <v-spacer></v-spacer>
                            <div class="d-flex ga-6 mt-8 justify-end">
                                <v-btn :loading="loading" :disabled="order.delivery==='delivered'" color="secondary" variant="flat" type="submit"
                                    @click="submit">
                                   {{ order.delivery==='delivered'?'Done':'Move to Next Step' }} 
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
<style lang="scss" scoped>
.disable {
    color: rgb(76, 75, 78)
}
</style>

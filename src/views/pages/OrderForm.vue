<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useOrdersStore } from '@/stores/orders';
import * as repository from '@/data/repository';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { formatToCurrencyString } from '@/utils/locales/format';
import type { User } from '@/types';

const route = useRoute();
const router = useRouter();
const title = ref('Edit Order')
const loading = ref(false)
const orderStore = useOrdersStore()
const customer = ref<User | undefined>(undefined)

if (route.params['id']) {
    orderStore.getOrderById(Number(route.params['id']))
        .then(() => repository.getUserById(order.value.userId))
        .then((u) => (customer.value = u))
}

const { order, getStepVal } = storeToRefs(orderStore)

function onCancel() {
    router.replace({ path: `/order` });
}

async function submit(event: any) {
    event.preventDefault();

    if (order.value.status !== 'delivered') {
        loading.value = true
        await orderStore.advanceStatus()
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
                        <v-stepper-item title="Pending" value="1" complete></v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item title="Processing" value="2"></v-stepper-item>

                        <v-divider></v-divider>

                        <v-stepper-item title="Shipped" value="3"></v-stepper-item>
                        <v-divider></v-divider>

                        <v-stepper-item title="Delivered" value="4"></v-stepper-item>
                    </v-stepper-header>
                </v-stepper>

                <v-divider />
                <v-container>

                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field class="disable" :model-value="order.orderNumber" label="Order No."
                                disabled variant="solo-filled"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field :model-value="customer ? `${customer.firstName} ${customer.lastName}` : ''"
                                variant="solo-filled" disabled label="Customer"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field :model-value="`AUD ${formatToCurrencyString(order.grandTotal)}`"
                                label="Amount" disabled variant="solo-filled"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field :model-value="new Date(order.orderedAt).toLocaleDateString()"
                                disabled label="Ordered At" variant="solo-filled"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" v-if="order.shipment?.shippedAt">
                            <v-text-field :model-value="new Date(order.shipment.shippedAt).toLocaleDateString()"
                                disabled label="Shipped At" variant="solo-filled"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider class="my-5" />

                <v-card variant="flat">
                    <v-card-subtitle class="f-w-800">Ship To</v-card-subtitle>
                    <v-card-text>
                    <v-sheet rounded="0" border>
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
                                        {{ order.shipTo.line1 }}
                                    </td>
                                    <td>{{ order.shipTo.city }}</td>
                                    <td>{{ order.shipTo.countryCode }}</td>
                                    <td>{{ order.shipTo.postalCode }}</td>
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
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Line Total</th>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr v-for="(lineItem, index) in order.items" :key="index">
                                <td>{{ lineItem.productName }}</td>
                                <td>{{ lineItem.sku }}</td>
                                <td>{{ lineItem.qty }}</td>
                                <td>AUD {{ formatToCurrencyString(lineItem.unitPrice) }}</td>
                                <td>AUD {{ formatToCurrencyString(lineItem.lineTotal) }}</td>
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
                            <v-btn :loading="loading" :disabled="order.status === 'delivered'" color="secondary" variant="flat"
                                @click="submit">
                               {{ order.status === 'delivered' ? 'Done' : 'Move to Next Step' }}
                            </v-btn>

                            <v-btn @click="onCancel" color="primary" variant="outlined">
                                Cancel
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

            </div>
        </UiParentCard>
    </UiMainContainer>

</template>
<style lang="scss" scoped>
.disable {
    color: rgb(76, 75, 78)
}
</style>

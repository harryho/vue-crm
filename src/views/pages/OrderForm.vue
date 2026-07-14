<script setup lang="ts">
import UiMainContainer from '@/components/shared/UiMainContainer.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useOrdersStore } from '@/stores/orders';
import * as repository from '@/data/repository';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { formatToCurrencyString } from '@/utils/locales/format';
import type { User, Carrier } from '@/types';

const route = useRoute();
const router = useRouter();
const title = ref('Edit Order')
const loading = ref(false)
const orderStore = useOrdersStore()
const customer = ref<User | undefined>(undefined)
const carriers = ref<Carrier[]>([])
repository.getCarriers().then((c) => (carriers.value = c))

if (route.params['id']) {
    orderStore.getOrderById(Number(route.params['id']))
        .then(() => repository.getUserById(order.value.userId))
        .then((u) => (customer.value = u))
}

const { order, getStepVal } = storeToRefs(orderStore)

const paymentDialog = ref(false)
const paymentProvider = ref('card')
const shipmentDialog = ref(false)
const shipmentCarrierId = ref<number | undefined>(undefined)
const trackingNumber = ref('')

function onCancelForm() {
    router.replace({ path: `/order` });
}

async function handleRecordPayment() {
    loading.value = true
    await orderStore.recordPayment({ provider: paymentProvider.value, amount: order.value.grandTotal })
    paymentDialog.value = false
    loading.value = false
}

async function handleRecordShipment() {
    if (!shipmentCarrierId.value) return
    loading.value = true
    await orderStore.recordShipment({ carrierId: shipmentCarrierId.value, trackingNumber: trackingNumber.value || undefined })
    shipmentDialog.value = false
    loading.value = false
}

async function handleMarkDelivered() {
    loading.value = true
    await orderStore.markDelivered()
    loading.value = false
}

async function handleCancelOrder() {
    loading.value = true
    await orderStore.cancelOrder()
    loading.value = false
}
</script>

<template>

    <UiMainContainer>

        <UiParentCard :title="title">

            <div v-if="!orderStore.loading">

                <v-stepper v-if="order.status !== 'cancelled'" v-model="getStepVal" class="mb-10">
                    <v-stepper-header variant="flat">
                        <v-stepper-item title="Pending" value="1"></v-stepper-item>
                        <v-divider></v-divider>
                        <v-stepper-item title="Paid" value="2"></v-stepper-item>
                        <v-divider></v-divider>
                        <v-stepper-item title="Shipped" value="3"></v-stepper-item>
                        <v-divider></v-divider>
                        <v-stepper-item title="Delivered" value="4"></v-stepper-item>
                    </v-stepper-header>
                </v-stepper>
                <v-alert v-else type="error" variant="tonal" class="mb-10">This order was cancelled.</v-alert>

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

                        <v-col cols="12" md="4" v-if="order.payment">
                            <v-text-field :model-value="`${order.payment.provider} - ${order.payment.status}`"
                                disabled label="Payment" variant="solo-filled"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" v-if="order.shipment">
                            <v-text-field
                                :model-value="`${order.shipment.carrierName}${order.shipment.trackingNumber ? ' - ' + order.shipment.trackingNumber : ''}`"
                                disabled label="Shipment" variant="solo-filled"></v-text-field>
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
                    <v-col cols="12" justify="end" class="">
                        <div class="d-flex ga-4 mt-8 justify-end">
                            <v-btn v-if="order.status === 'pending'" :loading="loading" color="secondary" variant="flat"
                                @click="paymentDialog = true">
                                Record Payment
                            </v-btn>
                            <v-btn v-if="order.status === 'paid'" :loading="loading" color="secondary" variant="flat"
                                @click="shipmentDialog = true">
                                Record Shipment
                            </v-btn>
                            <v-btn v-if="order.status === 'shipped'" :loading="loading" color="secondary" variant="flat"
                                @click="handleMarkDelivered">
                                Mark Delivered
                            </v-btn>
                            <v-btn v-if="order.status === 'pending' || order.status === 'paid'" :loading="loading"
                                color="error" variant="outlined" @click="handleCancelOrder">
                                Cancel Order
                            </v-btn>

                            <v-btn @click="onCancelForm" color="primary" variant="outlined">
                                Back
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

                <v-dialog v-model="paymentDialog" max-width="400">
                    <v-card title="Record Payment">
                        <v-card-text>
                            <v-select label="Provider" v-model="paymentProvider"
                                :items="['card', 'paypal', 'bank-transfer']" variant="solo-filled"></v-select>
                            <v-text-field :model-value="`AUD ${formatToCurrencyString(order.grandTotal)}`" disabled
                                label="Amount" variant="solo-filled"></v-text-field>
                        </v-card-text>
                        <template v-slot:actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="handleRecordPayment" color="secondary" variant="flat">Confirm</v-btn>
                            <v-btn @click="paymentDialog = false" variant="outlined">Cancel</v-btn>
                        </template>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="shipmentDialog" max-width="400">
                    <v-card title="Record Shipment">
                        <v-card-text>
                            <v-select label="Carrier" v-model="shipmentCarrierId"
                                :items="carriers.map((c) => ({ title: c.name, value: c.carrierId }))"
                                variant="solo-filled"></v-select>
                            <v-text-field v-model="trackingNumber" label="Tracking Number"
                                variant="solo-filled"></v-text-field>
                        </v-card-text>
                        <template v-slot:actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="handleRecordShipment" color="secondary" variant="flat">Confirm</v-btn>
                            <v-btn @click="shipmentDialog = false" variant="outlined">Cancel</v-btn>
                        </template>
                    </v-card>
                </v-dialog>

            </div>
        </UiParentCard>
    </UiMainContainer>

</template>
<style lang="scss" scoped>
.disable {
    color: rgb(76, 75, 78)
}
</style>

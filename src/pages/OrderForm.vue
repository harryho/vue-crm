<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <!--<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>-->
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="blue" @click.native="addProduct()">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md >
            <v-layout row wrap >
              <v-flex md4 xs12>
                <v-text-field name="reference" label="Reference" hint="Reference is required" value="Input text" v-model="order.reference"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="Amount" prefix="AUD $" label="Price" hint="Price is required" value="Input text" v-model="order.amount"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="quantity" label="Product Items" hint="Number between 1 to 100" v-model="order.products.length" class="input-group--focused"
                  required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required v-bind:items="customers" label="Customer" v-model="order.customerId"></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-menu lazy :close-on-content-click="false" v-model="orderDateMenu" transition="v-scale-transition" offset-y full-width
                  :nudge-left="40" max-width="290px">
                  <v-text-field slot="activator" label="Order Date" v-model="order.orderDate" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="order.orderDate" no-title scrollable>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-menu lazy :close-on-content-click="false" v-model="shippedDateMenu" transition="v-scale-transition" offset-y full-width
                  :nudge-left="40" max-width="290px">
                  <v-text-field slot="activator" label="Shipped Date" v-model="order.shippedDate" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="order.shippedDate" no-title scrollable>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="address" label="Address" hint="Address is required" value="Input text" v-model="order.shipAddress.address"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="city" label="City" hint="City is required" value="Input text" v-model="order.shipAddress.city" class="input-group--focused"
                  required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="zipcode" label="Zip Code" hint="Zip Code is required" value="Input text" v-model="order.shipAddress.zipcode"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="country" label="Country" hint="Country is required" value="Input text" v-model="order.shipAddress.country"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="order.products && order.products.length>0">

                <v-list class="transparent elevation-0" two-line >
                  <v-list-tile avatar ripple v-for="(item, index) in order.products"  
                  v-if="item !== null && item !== undefined" v-bind:key="index" class="grey lighten-2 mt-2 mb-2 " >                    
                      <v-list-tile-content dark >
                        <v-list-tile-title class="heading blue--text">{{ item.productName }}

                        </v-list-tile-title>
                        <v-list-tile-sub-title class="grey--text text--darken-4">AUD ${{ item.unitPrice }}</v-list-tile-sub-title>
                        <!--<v-list-tile-sub-title>{{ item.unitInStock }}
                          </v-list-tile-sub-title>-->
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn fab small class="navy" @click.native="remove(item)">
                          <v-icon v-bind:class="[item.active ? 'teal--text': 'grey--text']">delete</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                  </v-list-tile>              
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-layout row justify-center>
      <v-dialog v-model="addProductModal" width="700" persistent>
        <v-card>
          <v-card-title>{{modalTitle}}</v-card-title>
          <v-card-text>{{modalText}}</v-card-text>
          <v-card-text>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex md6 xs12>
                  <v-select required v-bind:items="categories" label="Category" v-model="categoryId"  v-on:change="getProductsByCategory"></v-select>
                </v-flex>
                <v-flex md6 xs12>
                  <v-select required v-bind:items="products" label="Product" v-model="productId"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native="saveProduct">Confirm</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="cancelAddProduct">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
      <confirm-dialog :dialog="dialog" :dialogTitle="dialogTitle" :dialogText="dialogText" @onConfirm="onConfirm" @onCancel="onCancel" ></confirm-dialog>
    <v-snackbar v-if="loading===false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar" >
      {{ notice }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
/* global Store */
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import {Product} from '../models'
import { mapState, dispatch } from 'vuex'
  export default {
    components: {
      ConfirmDialog
    },
    data () {
      return {
        categoryId: null,
        modalTitle: 'Add Product',
        modalText: 'Select the category and product from the list',
        addProductModal: false,
        dialog: false,
        dialogTitle: "Product Delete Dialog",
        dialogText: "Do you want to delete this product?",
        orderDateMenu: false,
        shippedDateMenu: false,
        errors: [],
        title: '',
        productId: null,
        snackbarStatus: false,
        timeout: 3000,
        color: '',
        selectedProduct: null
      }
    },
    computed: {
      ...mapState('orders',
        {
          order: 'order',
          customers: 'customers',
          categories: 'categories',
          products: 'products',
          loading: 'loading',
          mode: 'mode',
          snackbar: 'snackbar',
          notice: 'notice'
        }),
    },
    methods: {
      save () {
        const order = { ...this.order }
        delete order.customer
        console.log(order)
        Store.dispatch('orders/saveOrder', order)
        .then(() => {
          Store.dispatch("orders/closeSnackBar", 2000)
        })
      },
      selectCustomer (item) {
        this.order.customerId = item.value
      },
      getOrderById () {
        Store.dispatch('orders/getOrderById', this.$route.params.id)
      },
      getCustomers () {
        Store.dispatch('orders/getCustomers')
      },
      cancel () {
        this.$router.push({ name: 'Orders' })
      },
      remove (item) {
        this.selectedProduct = item;
        this.dialog = true;
      },
      onConfirm () {
        Store.dispatch(
          "orders/deleteProduct", Object.assign({}, this.selectedProduct)
        );
        this.selectedProduct = null;
        this.dialog = false;
      },
      onCancel () {
        this.selectedProduct = null;
        this.dialog = false;
      },
      addProduct () {
        this.addProductModal = true
      },
      saveProduct () {
        Store.dispatch('orders/addProductToOrder', this.productId)
        this.productId = null;
        this.addProductModal = false
      },
      cancelAddProduct () {
        this.addProductModal = false
      },
      getCategories () {
        Store.dispatch('orders/getCategories')
      },
      getProductsByCategory (){
        this.categoryId && Store.dispatch('orders/getProductsByCategory', this.categoryId)
      },
      closeSnackbar () {
        Store.commit("orders/setSnackbar", { snackbar: false });
        Store.commit("orders/setNotice", { notice: "" });
      },
    },
    created () {
      this.getCustomers()
      this.getCategories()
      this.getOrderById()
    },
    mounted () {
      if (this.$route.params.id) {
        this.title = 'Edit Order'
      } else this.title = 'New Order'
    }
  }
</script>

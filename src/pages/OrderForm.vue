<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
          {{ title }}
          <v-spacer></v-spacer>
          <v-btn   elevation="4" fab small dark class="grey mr-2" @click.native="cancel()">
            <v-icon dark="">mdi-close-circle-outline</v-icon>
          </v-btn>
          <v-btn   elevation="4"  fab small dark class="purple mr-2" @click.native="save()">
            <v-icon>mdi-content-save-all</v-icon>
          </v-btn>
          <v-btn   elevation="4" fab small dark class="blue" @click.native="addProduct()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex md4 xs12>
                <v-text-field
                  name="reference"
                  label="Reference"
                  hint="Reference is required"
                  value="Input text"
                  v-model="order.reference"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                  name="Amount"
                  prefix="AUD $"
                  label="Price"
                  hint="Price is required"
                  value="Input text"
                  v-model="order.amount"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="quantity"
                  label="Product Items"
                  hint="number between 1 to 100"
                  v-model="order.products.length"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-select required v-bind:items="customers" label="Customer" v-model="order.customerId"></v-select>
              </v-flex>
              <v-flex md4 xs12>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="orderDateMenu"
                  transition="v-scale-transition"
                  offset-y
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field lazy v-on="on" label="Order Date" v-model="order.orderDate" prepend-icon="mdi-calendar" readonly></v-text-field>
                  </template>
                  <v-date-picker v-model="order.orderDate" no-title scrollable> </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="shippedDateMenu"
                  transition="v-scale-transition"
                  offset-y
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      lazy
                      v-on="on"
                      label="Shipped Date"
                      v-model="order.shippedDate"
                      prepend-icon="mdi-calendar"
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="order.shippedDate" no-title scrollable> </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="address"
                  label="Address"
                  hint="Address is required"
                  value="Input text"
                  v-model="order.shipAddress.address"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="city"
                  label="City"
                  hint="City is required"
                  value="Input text"
                  v-model="order.shipAddress.city"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="zipcode"
                  label="Zip Code"
                  hint="Zip Code is required"
                  value="Input text"
                  v-model="order.shipAddress.zipcode"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field
                lazy
                  name="country"
                  label="Country"
                  hint="Country is required"
                  value="Input text"
                  v-model="order.shipAddress.country"
                  class="input-group--focused"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 v-if="order.products && order.products.length > 0">
                <v-list class="transparent elevation-0" two-line>
                  <v-list-item ripple v-for="(item, index) in order.products" v-bind:key="index" class="grey lighten-2 mt-2 mb-2 ">
                    <v-list-item-content dark>
                      <v-list-item-title class="heading blue--text">{{ item.productName }} </v-list-item-title>
                      <v-list-item-subtitle class="grey--text text--darken-4">AUD ${{ item.unitPrice }}</v-list-item-subtitle>
                      <!--<v-list-item-subtitle>{{ item.unitInStock }}
                          </v-list-item-subtitle>-->
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn   elevation="4" fab small  class="navy" @click.native="remove(item)">
                        <v-icon v-bind:class="[item.active ? 'teal--text' : 'grey--text']">mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
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
          <v-card-title>{{ modalTitle }}</v-card-title>
          <v-card-text>{{ modalText }}</v-card-text>
          <v-card-text>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex md6 xs12>
                  <v-select
                    required
                    v-bind:items="categories"
                    label="Category"
                    v-model="categoryId"
                    v-on:change="getProductsByCategory"
                  ></v-select>
                </v-flex>
                <v-flex md6 xs12>
                  <v-select required v-bind:items="products" label="Product" v-model="productId"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn class="green--text darken-1" text="text" @click.native="saveProduct">Confirm</v-btn>

            <v-btn class="orange--text darken-1" text="text" @click.native="cancelAddProduct">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <confirm-dialog
      :dialog="dialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    ></confirm-dialog>
    <v-snackbar v-if="loading === false" :right="true" :timeout="2000" :color="mode" v-model="snackbar">
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { Component, Watch } from 'vue-property-decorator';
import { customerModule } from '@/store/modules/customers';
import { productModule } from '@/store/modules/products';
import { orderModule } from '@/store/modules/orders';
import { appModule } from '@/store/modules/app';

@Component({
  components: {
    ConfirmDialog
  }
})
export default class OrderForm extends Vue {
 
  private modalTitle = 'Add Product';
  private modalText = 'Select the category and product from the list';
  private addProductModal = false;
  private dialog = false;
  private dialogTitle = 'Product Delete Dialog';
  private dialogText = 'Do you want to delete this product?';
  private orderDateMenu = false;
  private shippedDateMenu = false;
  private errors = [];
  private title = '';
  private productId = null;
  private categoryId = 0;
  private color = '';
  private selectedProduct: null;

@Watch('categoryId')
categoryChanged(newId: number, oldId: number){
  if(newId !== oldId){
    orderModule.getProductsByCategory(newId)
  }
}

  get customers() {
    console.log(customerModule.customer);
    return orderModule.customers;
  }

  get order() {
    return orderModule.order;
  }

  get categories() {
    console.log(productModule.categories)
    return productModule.categories;
  }

  get products() {
    return orderModule.products;
  }

  get loading() {
    return appModule.loading;
  }

  get mode() {
    return appModule.mode;
  }

  get snackbar() {
    return appModule.snackbar;
  }

  get notice() {
    return appModule.notice;
  }

  save() {
    const order = { ...this.order };
    delete order.customer;
    console.log(order);
    orderModule.saveOrder(this.order);
  }

  selectCustomer(item) {
    this.order.customerId = item.value;
  }

  getOrderById() {
    orderModule.getOrderById(this.$route.params.id);
  }

  cancel() {
    this.$router.push({ name: 'orders' });
  }

  remove(item) {
    this.selectedProduct = item;
    this.dialog = true;
  }

  onConfirm() {
    orderModule.deleteProduct(this.selectedProduct);
    this.selectedProduct = null;
    this.dialog = false;
  }

  onCancel() {
    this.selectedProduct = null;
    this.dialog = false;
  }

  addProduct() {
    this.addProductModal = true;
  }

  saveProduct() {
    orderModule.addProductToOrder(this.productId);
    this.productId = null;
    this.addProductModal = false;
  }

  cancelAddProduct() {
    this.addProductModal = false;
  }

  getProductsByCategory() {
    orderModule.getProductsByCategory(this.categoryId);
  }

  closeSnackbar() {
    appModule.closeNotice();
  }

  created() {
    // this.getCustomers();
    this.getOrderById();
    orderModule.getCustomers();
    productModule.getCategories();
  }

  mounted() {
    if (this.$route.params.id) {
      this.title = 'Edit Order';
      this.$nextTick(() => {
        // this.shippedDate = this.order.shippedDate;
        // this.orderDate = this.order.orderDate;
      });
    } else this.title = 'New Order';
  }
}
</script>

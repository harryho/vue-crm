<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <!--<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>-->
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon light>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon light>save</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="blue" @click.native="addProduct()">
            <v-icon light>add</v-icon>
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
                <v-select required v-bind:items="customerList" label="Customer" v-model="order.customerId"></v-select>
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

                <v-list class="lighten-1 elevation-0" two-line >
                  <v-list-tile avatar ripple v-for="(item, index) in order.products" class="blue py-0 mt-0 mb-1" v-bind:key="item.id">
                    <v-list-tile-content dark >
                      <v-list-tile-title>{{ item.productName }}

                      </v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">AUD ${{ item.unitPrice }}</v-list-tile-sub-title>
                      <!--<v-list-tile-sub-title>{{ item.unitInStock }}
                        </v-list-tile-sub-title>-->

                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn fab small class="navy" @click.native="remove(index)">
                        <v-icon v-bind:class="[item.active ? 'teal--text' : 'grey--text']">delete</v-icon>
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
      <v-dialog v-model="addProductDialog" width="700" persistent>
        <v-card>
          <v-card-title>{{dialogTitle}}</v-card-title>
          <v-card-text>{{dialogText}}</v-card-text>
          <v-card-text>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex md6 xs12>
                  <v-select required v-bind:items="categoryList" label="Category" v-model="categoryId"></v-select>
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

  </v-container>
</template>
<script>
  export default {
    data: function () {
      return {
        categoryId: null,
        dialogTitle: 'Add Product',
        dialogText: 'Select the category and product from the list',
        addProductDialog: false,
        orderDateMenu: false,
        shippedDateMenu: false,
        errors: [],
        title: '',
        order: {
          products: [],
          customerId: 0,
          customer: { name: '' },
          orderDate: null,
          shippedDate: null,
          shipAddress: {
            address: null,
            city: null,
            zipcode: null,
            country: null
          }
        },
        productId: null,
        customers: [],
        customerList: [],
        categoryList: [],
        products: []
      }
    },
    computed: {
      newOrder: function () {
        return 'New Order'
      }
    },
    watch: {
      categoryId: function () {
        if (this.categoryId > 0) {
          this.products = []
          this.api.getData('products?categoryId=' + this.categoryId).then((res) => {
            res.data.forEach((c) => {
              let product = c
              product.text = c.productName
              product.value = c.id
              this.products.push(product)
            })
            return this.products
          }, (err) => {
            console.log(err)
          })
        }
      }
    },
    methods: {
      save: function () {
        let order = this.order
        delete this.order.customer

        if (!order.id) {
          this.api.postData('orders', order).then((res) => {
            this.$router.push({ name: 'Orders' })
          }, (err) => {
            console.log(err)
          })
        } else {
          this.api.putData('orders/' + order.id.toString(), order).then((res) => {
            this.$router.push({ name: 'Orders' })
          }, (err) => {
            console.log(err)
          })
        }
      },
      selectCustomer(item) {
        this.order.customerId = item.value
      },
      getById: function () {
        this.api.getData('orders/' + this.$route.params.id + '?_expand=customer').then((res) => {
          this.order = res.data
          this.order.customer.name = this.order.customer.firstName + ' ' + this.order.customer.lastName
        }, (err) => {
          console.log(err)
        })
      },
      getCustomers: function () {
        this.api.getData('customers').then((res) => {
          this.customers = res.data
          this.customerList = []
          this.customers.forEach((c) => {
            let customer = c
            customer.text = c.firstName + ' ' + c.lastName
            customer.value = c.id
            this.customerList.push(customer)
          })
        }, (err) => {
          console.log(err)
        })
      },
      cancel: function () {
        this.$router.push({ name: 'Orders' })
      },
      remove: function (index) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this item?', '', () => {
            this.order.products.splice(index, 1)
          })
        }
      },
      addProduct: function () {
        this.addProductDialog = true
      },
      saveProduct: function () {
        let product = this.products.find((e) => { if (e.id === this.productId) return e })
        this.order.products.push(Object.assign({}, product))
        this.product = null
        this.addProductDialog = false
      },
      cancelAddProduct: function () {
        this.addProductDialog = false
      },
      getCategorys: function () {
        this.api.getData('categories').then((res) => {
          this.categorys = res.data
          this.categoryList = []
          this.categorys.forEach((c) => {
            let category = c
            category.text = c.categoryName
            category.value = c.id
            this.categoryList.push(category)
          })
        }, (err) => {
          console.log(err)
        })
      },
      getProducts(categoryId) {
        this.api.getData('products?_expand=category&categoryId=' + categoryId).then((res) => {
          this.products = res.data
        }, (err) => {
          console.log(err)
        })
      }
    },
    mounted: function () {
      this.getCustomers()
      this.getCategorys()
      if (this.$route.params.id) {
        this.getById()
        this.title = 'Edit Order'
      } else this.title = 'New Order'
    }
  }
</script>
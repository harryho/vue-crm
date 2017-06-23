<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <!--<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>-->
          <v-btn floating small class="grey" @click.native="cancel()">
            <v-icon light>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn floating small class="purple" @click.native="save()">
            <v-icon light>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex md4 xs12>
                <v-text-field name="product" label="Product" hint="Product is required" value="Input text" v-model="order.product" class="input-group--focused" required></v-text-field>
              </v-flex>
  
              <v-flex md4 xs12>
                <v-text-field name="price"  prefix="AUD $" label="Price" hint="Price is required" value="Input text" v-model="order.price" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="quantity" label="Quantity" hint="Number between 1 to 100" v-model="order.quantity" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <!--<v-text-field name="customer" label="Email" value="Input text" v-model="order.quantity" class="input-group--focused" required></v-text-field>-->
                 <v-select required v-bind:items="customerList" label="Customer" v-model="order.customerId"></v-select>
              </v-flex>
               <!--<v-flex md4 xs12>
                  <v-switch label="Order Status" v-model="order.isActive" dark></v-switch>
              </v-flex>-->
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      errors: [],
      title: '',
      order: {
        customerId: 0,
        customer: {name: ''}
      },
      customers: [],
      customerList: []
    }
  },
  computed: {
    newOrder: function () {
      return 'New Order'
    }
  },
  methods: {
    save: function () {
      let order = this.order
      // this.order.customerId = this.order.customer.name.value
      delete this.order.customer

      if (!order.id) {
        this.api.postData('orders', order).then((res) => {
          this.$router.push({name: 'Orders'})
        }, (err) => {
          console.log(err)
        })
      } else {
        this.api.putData('orders/' + order.id.toString(), order).then((res) => {
          this.$router.push({name: 'Orders'})
        }, (err) => {
          console.log(err)
        })
      }
    },
    selectCustomer (item) {
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
          let customer = {}
          customer.text = c.firstName + ' ' + c.lastName
          customer.value = c.id
          this.customerList.push(customer)
        })
      }, (err) => {
        console.log(err)
      })
    },
    cancel: function () {
      this.$router.push({name: 'Orders'})
    }
  },
  mounted: function () {
    this.getCustomers()
    if (this.$route.params.id) {
      this.getById()
      this.title = 'Edit Order'
    } else this.title = 'New Order'
  }
}
</script>

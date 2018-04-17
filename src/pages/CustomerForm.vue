<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="loading !== true" >
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex md4 xs12>
                <v-text-field name="firstName" label="First Name" hint="Last name is required" value="Input text" v-model="customer.firstName" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="lastName" label="Last Name" maxlength="10" hint="Last name is required" value="Input text" v-model="customer.lastName" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12 v-if="customer.avatar">
                <img v-if="customer.avatar" class="responsive" v-bind:src="customer.avatar"/>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="age" type="number" label="Age" hint="Number between 18 to 150" 
                v-bind:rules="rules.age"
                 v-model="customer.age" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="email" type="email" label="Email" value="Input text" v-model="customer.email"
                 v-bind:rules="rules.email" class="input-group--focused" required></v-text-field>
              </v-flex>
               <v-flex md4 xs12>
                  <v-switch label="Customer Status"  v-model="customer.isActive" light></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
/* global Store */
import { mapState, dispatch } from 'vuex'
export default {
  data () {
    return {
      title: '',
      rules: {
        age: [() => {
          if (this.customer && (this.customer.age < 18 || this.customer.age > 100)){
            return 'Age is required. It must be bewteen 18 and 100'
          }
          return true;
        }],
        email: [() => {
            /* eslint-disable no-useless-escape */
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (this.customer && !re.test(this.customer.email)) return 'Email is invalid.'
            return true;
        }]
      }
    }
  },
  computed: {
    ...mapState('customers',      {
        orders: 'orders',
        customer: 'customer',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
  },
  methods: {
    save () {
       const customer = { ...this.customer }
        // delete order.customer
        console.log(customer)
        Store.dispatch('customers/saveCustomer', customer)
        .then(() => {
          Store.dispatch("customers/closeSnackBar", 2000)
        })
    },
    cancel () {
      this.$router.push({name: 'Customers'})
    },
    closeSnackbar () {
      Store.commit("customers/setSnackbar", { snackbar: false });
      Store.commit("customers/setNotice", { notice: "" });
    },
  },
  created () {
    Store.dispatch('customers/getCustomerById', this.$route.params.id)
  },
  mounted () {
    if (this.$route.params.id) {
      this.title = 'Edit Order'
    } else this.title = 'New Order'
  }
}
</script>

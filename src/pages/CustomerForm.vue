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
          <v-container fluid grid-list-sm>
              <v-layout row wrap >
                    <v-flex sm2 xs12>
                      <img v-if="customer.avatar" class="profile" v-bind:src="customer.avatar"/>                    
                  </v-flex>
                <v-flex sm10 xs12>
                <v-container fluid grid-list-sm>
              <v-layout row wrap >
                <v-flex md3 sm6 xs12 class="mx-1 px-0">
                  <v-text-field name="firstName" label="First Name" hint="Last name is required" value="Input text" v-model="customer.firstName" class="input-group--focused" required></v-text-field>
                </v-flex>
                <v-flex md3 sm6  xs12  class="mx-1 px-0">
                  <v-text-field name="lastName" label="Last Name" maxlength="10" hint="Last name is required" value="Input text" v-model="customer.lastName" class="input-group--focused" required></v-text-field>
                </v-flex>            
                <v-flex md3 sm6  xs12  class="mx-1 px-0">
                  <v-text-field name="email" type="email" label="Email" value="Input text" v-model="customer.email"
                  v-bind:rules="rules.email" class="input-group--focused" required></v-text-field>
                </v-flex>
                 <v-flex md3 sm6  xs12  class="mx-1 px-0">
                  <v-text-field name="mobile" type="text" label="Mobile"                
                  v-model="customer.mobile" class="input-group--focused" required></v-text-field>
                </v-flex>
                  <v-flex md3 sm6  xs12  class="mx-1 px-0">
                  <v-text-field name="workphone" type="text" label="Work Phone"               
                  v-model="customer.workphone" class="input-group--focused" required></v-text-field>
                </v-flex>
                <v-flex md3 sm6  xs12  class="mx-1 px-0">
                  <v-text-field name="rewards" type="number" label="Rewards" hint="Number between 0 and 9999" 
                  v-bind:rules="rules.rewards"
                  v-model="customer.rewards" class="input-group--focused" required></v-text-field>
                </v-flex>
                <v-flex md3 sm6  xs12  class="mx-1 px-0">
                    <v-switch label="Membership"  v-model="customer.membership" light></v-switch>
                </v-flex>
              </v-layout>
                </v-container>
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
        rewards: [() => {
          if (this.customer && (this.customer.rewards < 0 || this.customer.rewards > 9999)){
            return 'Reward is required. It must be bewteen 0 and 9999'
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
      this.title = 'Edit Customer'
    } else this.title = 'New Customer'
  }
}
</script>
<style>
.profile {
  max-width:160px;
}
</style>

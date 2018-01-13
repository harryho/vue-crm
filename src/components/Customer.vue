<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon light>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon light>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap>

              <v-flex md4 xs12>
                <v-text-field name="firstName" label="First Name" hint="Last name is required" value="Input text" v-model="customer.firstName" class="input-group--focused" required></v-text-field>
              </v-flex>  
              <v-flex md4 xs12>
                <v-text-field name="lastName" label="Last Name" maxlength="10" hint="Last name is required" value="Input text" v-model="customer.lastName" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12 v-if="customer.avatar">
                <img v-if="customer.avatar" class="responsive" v-bind:src="customer.avatar"></img>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="age" type="number" label="Age" hint="Number between 18 to 150" v-bind:rules="rules.age" 
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
export default {
  data: function () {
    return {
      errors: [],
      title: '',
      customer: {},
      rules: {
        age: [() => {
          if (this.customer.age < 18 || this.customer.age > 100) return 'Age is required. It must be bewteen 18 and 100'
        }],
        email: [() => {
          if (this.customer.email) {
            /* eslint-disable no-useless-escape */
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(this.customer.email)) return 'Email is invalid.'
          }
        }]
      }
    }
  },
  computed: {
  },
  methods: {
    save: function () {
      let customer = this.customer
      if (!customer.id) {
        this.api.postData('customers', customer).then((res) => {
          this.$router.push({name: 'Customers'})
        }, (err) => {
          console.log(err)
        })
      } else {
        this.api.putData('customers/' + customer.id.toString(), customer).then((res) => {
          this.$router.push({name: 'Customers'})
        }, (err) => {
          console.log(err)
        })
      }
    },
    getById: function () {
      this.api.getData('customers/' + this.$route.params.id).then((res) => {
        this.customer = res.data
        // this.customer.avatar = '/assets/' + this.customer.avatar
      }, (err) => {
        console.log(err)
      })
    },
    cancel: function () {
      this.$router.push({name: 'Customers'})
    }
  },
  mounted: function () {
    if (this.$route.params.id) {
      this.getById()
      this.title = 'Edit Customer'
    } else this.title = 'New Customer'
  }
}
</script>

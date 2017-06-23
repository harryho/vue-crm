<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
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
                <v-text-field name="firstName" label="First Name" hint="Last name is required" value="Input text" v-model="customer.firstName" class="input-group--focused" required></v-text-field>
              </v-flex>
  
              <v-flex md4 xs12>
                <v-text-field name="lastName" label="Last Name" hint="Last name is required" value="Input text" v-model="customer.lastName" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="age" label="Age" hint="Number between 0 to 150" v-model="customer.age" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="email" label="Email" value="Input text" v-model="customer.email" class="input-group--focused" required></v-text-field>
              </v-flex>
               <v-flex md4 xs12>
                  <v-switch label="Customer Status" v-model="customer.isActive" dark></v-switch>
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
      customer: {}
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

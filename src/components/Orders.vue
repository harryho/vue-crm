<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Orders
          <v-spacer></v-spacer>
<v-btn floating small light class="blue-grey" @click.native.stop="rightDrawer = !rightDrawer">
                          <v-icon light>search</v-icon>
                        </v-btn>
                        &nbsp;
              <v-btn floating small class="grey">
                <v-icon light>print</v-icon>
              </v-btn>
              &nbsp;
              <v-btn floating small class="purple" @click.native="add">
                <v-icon light>add</v-icon>
              </v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">
          <template slot="items" scope="props" class="body-2">
            <td class="body-2">{{ props.item.product }}</td>
            <td class="text-xs-right">{{ props.item.price }}</td>
            <td class="text-xs-right">{{ props.item.quantity }}</td>
            <td class="text-xs-right">{{ props.item.amount}}</td>
            <td class="text-xs-right">{{ props.item.customer}}</td>
            <td class="text-xs-right">
              <v-btn floating small class="teal" @click.native="edit(props.item)">
               <v-icon light>edit</v-icon>
              </v-btn>
              <v-btn floating small class="cyan" @click.native="remove(props.item)">
                <v-icon light>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="Math.ceil(pagination.totalItems / pagination.rowsPerPage)"></v-pagination>
        </div>
      </v-card>
    </v-flex>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer">
          <v-list>
            <v-list-item>
              <v-list-tile-title>&nbsp;</v-list-tile-title>
            </v-list-item>
            <v-list-item>
              <v-list-tile>
                <v-list-tile-title>Search Panel</v-list-tile-title>
                <v-list-tile-action>
                  <v-btn @click.native="rightDrawer = !rightDrawer">
                    <v-icon dark>search</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile-title>&nbsp;</v-list-tile-title>
            </v-list-item>
            <v-list-item>
              <v-layout row>
                <v-flex xs11 offset-xs1>
                  <v-text-field name="product" label="Product" light></v-text-field>
                </v-flex>
              </v-layout>
            </v-list-item>
           
          </v-list>
        </v-navigation-drawer>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      rightDrawer: false,
      right: true,
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Product',
          left: true,
          sortable: false,
          value: 'product'
        },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Amount', value: 'amount' },
        { text: 'Customer', value: 'customer' },
        { text: '', value: '' }
      ],
      items: []
    }
  },
  methods: {
    edit (item) {
      this.$router.push({name: 'Order', params: { id: item.id }})
    },
    add () {
      this.$router.push('NewOrder')
    },
    remove (item) {
      this.api.deleteData('orders/' + item.id.toString()).then((res) => {
        this.$router.push('Orders')
      }, (err) => {
        console.log(err)
      })
    },
    changeStatus (item) {
      item.isActive = !item.isActive
      this.api.putData('orders/' + item.id.toString(), item).then((res) => {
        this.$router.push('Orders')
      }, (err) => {
        console.log(err)
      })
    },
    getCutomers () {
      this.api.getData('orders?_expand=customer').then((res) => {
        this.items = res.data
        this.items.forEach(item => {
          item.amount = item.quantity * item.price
          item.customer = item.customer ? item.customer.firstName + ' ' + item.customer.lastName : ''
        })
      }, (err) => {
        console.log(err)
      })
    }
  },
  computed: {
  },
  mounted: function () {
    this.$nextTick(() => {
      this.getCutomers()
    })
  }
}
</script>

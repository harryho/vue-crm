<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Orders
          <v-spacer></v-spacer>
          <v-btn fab small dark class="blue-grey" @click.native.stop="rightDrawer = !rightDrawer">
            <v-icon>search</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="grey" @click.native="print()">
            <v-icon>print</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small dark class="purple" @click.native="add">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search"
        v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props" class="body-2">
            <td class="body-2">{{ props.item.reference }}</td>
            <td class="text-xs-right">{{ props.item.quantity }}</td>
            <td class="text-xs-right">{{ props.item.amount}}</td>
            <td class="text-xs-right">{{ props.item.customer}}</td>
            <td class="text-xs-right">{{ props.item.orderDate}}</td>
            <td class="text-xs-right">{{ props.item.shippedDate}}</td>
            <td class="text-xs-right">
              <v-btn fab small dark class="teal" @click.native="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn fab small class="cyan" @click.native="remove(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
        </div>
      </v-card>
    </v-flex>
    <v-navigation-drawer right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile-title>&nbsp;</v-list-tile-title>
        <v-list-tile>
          <v-list-tile-title>Search Panel</v-list-tile-title>
          <v-list-tile-action>
            <v-btn @click.native="searchOrders">
              <v-icon dark>search</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile-title>&nbsp;</v-list-tile-title>
        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="product" label="Product" light v-model="searchVm.contains.product"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-subheader light class="text-sm-central">Price range between Price 1 and Price 2 </v-subheader>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 offset-xs1>
            <v-slider class="text-xs-central" label="Price 1" light v-bind:max="100" v-model="searchVm.between.price.former"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field light v-model="searchVm.between.price.former" type="number"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 offset-xs1>
            <v-slider class="text-xs-central" label="Price 2" light v-bind:max="1000" v-model="searchVm.between.price.latter"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field light v-model="searchVm.between.price.latter" type="number"></v-text-field>
          </v-flex>
        </v-layout>
        <v-list-tile>
          <v-list-tile-title></v-list-tile-title>
          <v-list-tile-action>
            <v-btn @click.native="clearSearchFilters">
              <v-icon dark>clear</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        rightDrawer: false,
        right: true,
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Reference',
            left: true,
            sortable: false,
            value: 'reference'
          },
          { text: 'Order Items', value: 'quantity' },
          { text: 'Amount', value: 'amount' },
          { text: 'Customer', value: 'customer' },
          { text: 'Order Date', value: 'orderDate' },
          { text: 'Shipping Date', value: 'shippedDate' },
          { text: '', value: '' }
        ],
        items: [],
        searchVm: {
          contains: {
            product: ''
          },
          between: {
            price: { former: 0, latter: 0 }
          }
        }
      }
    },
    methods: {
      print () {
        window.print()
      },
      edit (item) {
        this.$router.push({ name: 'Order', params: { id: item.id } })
      },
      add () {
        this.$router.push('NewOrder')
      },
      remove (item) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this item?', '', () => {
            this.api.deleteData('orders/' + item.id.toString()).then((res) => {
              this.getOrders()
            }, (err) => {
              console.log(err)
            })
          })
        }
      },
      changeStatus (item) {
        item.isActive = !item.isActive
        this.api.putData('orders/' + item.id.toString(), item).then((res) => {
        }, (err) => {
          console.log(err)
        })
      },
      getOrders () {
        this.api.getData('orders?_expand=customer').then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            let amount = 0
            item.products.forEach((e) => { amount += e.unitPrice })
            item.amount = amount
            item.quantity = item.products.length
            item.customer = item.customer ? item.customer.firstName + ' ' + item.customer.lastName : ''
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      searchOrders () {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)
        this.api.getData('orders?_expand=customer&' + query).then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            item.amount = item.quantity * item.price
            item.customer = item.customer ? item.customer.firstName + ' ' + item.customer.lastName : ''
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      clearSearchFilters () {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.clearSearchFilters(this.searchVm)
        this.api.getData('orders?_expand=customer').then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            item.amount = item.quantity * item.price
            item.customer = item.customer ? item.customer.firstName + ' ' + item.customer.lastName : ''
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      }
    },
    computed: {
      pages () {
        return this.pagination && this.pagination.rowsPerPage ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage) : 0
      }
    },
    mounted () {
      // this.$nextTick(() => {
      this.getOrders()
      // })
    }
  }
</script>

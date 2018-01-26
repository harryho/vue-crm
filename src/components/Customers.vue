<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Customers
          <v-spacer></v-spacer>
          <v-btn fab small dark class="blue-grey" @click.native.stop="rightDrawer = !rightDrawer">
            <v-icon>search</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="add">
            <v-icon>add</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small dark class="grey" @click.native="print">
            <v-icon>print</v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">

          <template slot="items" slot-scope="props" class="body-2">
            <td class="text-xs-left">
              <img v-if="props.item.avatar" width="50" class="responsive" v-bind:src="props.item.avatar"></img>
            </td>
            <td class="text-xs-left">{{ props.item.firstName }}</td>
            <td class="text-xs-right">{{ props.item.lastName }}</td>
            <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right">{{ props.item.age }}</td>
            <td class="text-xs-right">{{ props.item.orderRecord }}</td>
            <td class="text-xs-right">
              <v-icon v-if="!props.item.isActive" class="light">block</v-icon>
              <v-icon v-if="props.item.isActive" class="light">done</v-icon>
            </td>
            <td class="text-xs-right">
              <v-btn fab small class="indigo" @click.native="changeStatus(props.item)">
                <v-icon>autorenew</v-icon>
              </v-btn>
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
          <!-- Math.ceil(pagination.totalItemstotalItems / pagination.rowsPerPage) -->
        </div>
      </v-card>
    </v-flex>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
      <v-list>

        <v-list-tile-title>&nbsp;</v-list-tile-title>


        <v-list-tile>
          <v-list-tile-title>Search Panel</v-list-tile-title>
          <v-list-tile-action>
            <v-btn @click.native="searchCustomers">
              <v-icon dark>search</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>


        <v-list-tile-title>&nbsp;</v-list-tile-title>


        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="input-1-3" label="Frist Name" light v-model="searchVm.contains.firstName"></v-text-field>
          </v-flex>
        </v-layout>


        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="input-1-3" label="Last Name" light v-model="searchVm.contains.lastName"></v-text-field>
          </v-flex>
        </v-layout>


        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-subheader light class="text-sm-central">Age range between Age 1 and Age 2 </v-subheader>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 offset-xs1>
            <v-slider label="Age 1" light v-bind:max="50" v-model="searchVm.between.age.former"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field light v-model="searchVm.between.age.former" type="number"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 offset-xs1>
            <v-slider label="Age 2" light v-bind:max="100" v-model="searchVm.between.age.latter"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field light v-model="searchVm.between.age.latter" type="number"></v-text-field>
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
    <v-snackbar :timeout="2500" :top="true" :error="true" :multi-line="true" v-model="snackbar">
      {{ errText }}
      <v-btn flat light @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
  export default {
    data: function () {
      return {
        rightDrawer: false,
        right: true,
        search: '',
        errText: '',
        pagination: {
          page: 1,
          totalItems: 0,
          rowsPerPage: 10
        },
        snackbar: false,
        headers: [
          {
            text: 'First Name',
            left: true,
            sortable: false,
            value: 'firstName'
          },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Email', value: 'email' },
          { text: 'Age', value: 'age' },
          { text: 'Order Record', value: 'orderRecord' },
          { text: 'Active', value: 'isActive' },
          { text: '', value: '' }
        ],
        items: [],
        searchVm: {
          contains: {
            firstName: '',
            lastName: ''
          },
          between: {
            age: { former: 0, latter: 0 }
          }
        }
      }
    },
    methods: {
      print() {
        window.print()
      },
      edit(item) {
        this.$router.push({ name: 'Customer', params: { id: item.id } })
      },
      add() {
        this.$router.push('NewCustomer')
      },
      remove(item) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this customer?', '', () => {
            this.api.deleteData('customers/' + item.id.toString()).then((res) => {
              this.getCustomers()
            }, (err) => {
              console.log(err)
              this.snackbar = true
              this.errText = 'Status has not be deleted successfully. Please try again.'
            })
          })
        }
      },
      changeStatus(item) {
        item.isActive = !item.isActive
        this.api.putData('customers/' + item.id.toString(), item).then((res) => {
          // this.$router.push('Customers')
        }, (err) => {
          console.log(err)
          this.snackbar = true
          this.errText = 'Status has not be updated successfully. Please try again.'
          item.isActive = !item.isActive
        })
      },
      searchCustomers() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)

        this.api.getData('customers?' + query).then((res) => {

          this.items = res.data
          this.items.forEach((item) => {
            if (item.orders && item.orders.length) {
              item.orderRecord = item.orders.length
            } else {
              item.orderRecord = 0
            }
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      clearSearchFilters() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.clearSearchFilters(this.searchVm)

        this.api.getData('customers').then((res) => {
          this.items = res.data
          this.items.forEach((item) => {
            if (item.orders && item.orders.length) {
              item.orderRecord = item.orders.length
            } else {
              item.orderRecord = 0
            }
          })
          this.pagination.totalItems = this.items.length
          console.log(this.items)
        }, (err) => {
          console.log(err)
        })
      },
      getCustomers() {
        this.api.getData('customers?_embed=orders').then((res) => {
          this.items = res.data
          this.items.forEach((item) => {
            // item.avatar = '/assets/' + item.avatar
            if (item.orders && item.orders.length) {
              item.orderRecord = item.orders.length
            } else {
              item.orderRecord = 0
            }
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      }
    },
    computed: {
      pages() {
        return this.pagination && this.pagination.rowsPerPage ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage) : 0
      }
    },
    mounted: function () {
      this.getCustomers()
    }
  }
</script>
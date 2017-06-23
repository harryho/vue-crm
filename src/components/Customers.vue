<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Customers
          <v-spacer></v-spacer>
              <v-btn floating small light class="blue-grey" @click.native.stop="rightDrawer = !rightDrawer">
                          <v-icon light>search</v-icon>
                        </v-btn>
                        &nbsp;
               <v-btn floating small class="purple" @click.native="add">
                <v-icon light>add</v-icon>
              </v-btn>
              &nbsp;
           
                <v-btn floating small class="grey">
                <v-icon light>print</v-icon>
              </v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">

          <template slot="items" scope="props" class="body-2">
            <td class="body-2">{{ props.item.firstName }}</td>
            <td class="text-xs-right">{{ props.item.lastName }}</td>
               <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right">{{ props.item.age }}</td>
            <td class="text-xs-right">{{ props.item.orderRecord }}</td>
            <td class="text-xs-right"><v-icon v-if="!props.item.isActive" class="light">block</v-icon><v-icon v-if="props.item.isActive" class="light">done</v-icon></td>
            <td class="text-xs-right">
              <v-btn floating small class="indigo" @click.native="changeStatus(props.item)">
                <v-icon light>autorenew</v-icon>
              </v-btn>
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
                  <v-text-field name="input-1-3" label="Frist Name" light></v-text-field>
                </v-flex>
              </v-layout>
            </v-list-item>
            <v-list-item>
              <v-layout row>
                <v-flex xs11 offset-xs1>
                  <v-text-field name="input-1-3" label="Last Name" light></v-text-field>
                </v-flex>
              </v-layout>
            </v-list-item>
            <v-list-item>
              <v-layout row>
                <v-flex xs11 offset-xs1>
                  <v-text-field name="input-1-3" label="Age" light></v-text-field>
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
    //   selected: [],
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
      items: []
    }
  },
  methods: {
    edit (item) {
      console.log(JSON.stringify(item))
      this.$router.push({name: 'Customer', params: { id: item.id }})
    },
    add () {
      this.$router.push('NewCustomer')
    },
    remove (item) {
      this.api.deleteData('customers/' + item.id.toString()).then((res) => {
        this.$router.push('Customers')
      }, (err) => {
        console.log(err)
      })
    },
    changeStatus (item) {
      item.isActive = !item.isActive
      this.api.putData('customers/' + item.id.toString(), item).then((res) => {
        this.$router.push('Customers')
      }, (err) => {
        console.log(err)
      })
    },
    getCutomers () {
      this.api.getData('customers?_embed=orders').then((res) => {
        this.items = res.data
        this.items.forEach((item) => {
          if (item.orders && item.orders.length) {
            item.orderRecord = item.orders.length
          } else {
            item.orderRecord = 0
          }
        })
      }, (err) => {
        console.log(err)
      })
    }
  },
  computed: {
  },
  mounted: function () {
    this.getCutomers()
  }
}
</script>

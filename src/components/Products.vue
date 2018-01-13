<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Products
          <v-spacer></v-spacer>
          <v-btn fab small light class="blue-grey" @click.native.stop="rightDrawer = !rightDrawer">
            <v-icon light>search</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="grey" @click.native="print()">
            <v-icon light>print</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="orange" @click.native="add">
            <v-icon light>add</v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props" class="body-2">
            <td class="body-2">{{ props.item.productName }}</td>
            <td class="text-xs-right">{{ props.item.category.categoryName}}</td>
            <td class="text-xs-right">AUD ${{ props.item.unitPrice }}</td>
            <td class="text-xs-right">{{ props.item.unitInStock }}</td>
            <!--<td class="text-xs-right">{{ props.item.amount}}</td>            -->
            <td class="text-xs-right">
              <v-btn fab small class="teal" @click.native="edit(props.item)">
                <v-icon light>edit</v-icon>
              </v-btn>
              <v-btn fab small class="cyan" @click.native="remove(props.item)">
                <v-icon light>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :value="pages" :length="pages" :total-visible="7" circle></v-pagination>
        </div>
      </v-card>
    </v-flex>
    <v-navigation-drawer right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile-title>&nbsp;</v-list-tile-title>
        <v-list-tile>
          <v-list-tile-title>Search Panel</v-list-tile-title>
          <v-list-tile-action>
            <v-btn @click.native="searchProducts">
              <v-icon dark>search</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile-title>&nbsp;</v-list-tile-title>
        <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="productName" label="Product" light v-model="searchVm.contains.productName"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-subheader light class="text-sm-central">Price range between Price 1 and Price 2 </v-subheader>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 offset-xs1>
            <v-slider class="text-xs-central" label="Price 1" light v-bind:max="100" v-model="searchVm.between.price.former"></v-slider>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 offset-xs2>
            <v-text-field light v-model="searchVm.between.price.former" type="number"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 offset-xs1>
            <v-slider class="text-xs-central" label="Price 2" light v-bind:max="1000" v-model="searchVm.between.price.latter"></v-slider>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 offset-xs2>
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
    data: function () {
      return {
        rightDrawer: false,
        right: true,
        search: '',
        pagination: {
          page: 1,
          totalItems: 0,
          rowsPerPage: 10
        },
        headers: [{
          text: 'Product',
          left: true,
          sortable: false,
          value: 'productName'
        },
        {
          text: 'Category',
          value: 'category.categoryName'
        },
        {
          text: 'Price',
          value: 'unitPrice'
        },
        {
          text: 'In Stock',
          value: 'unitInStock'
        },
        {
          text: '',
          value: ''
        }],
        items: [],
        searchVm: {
          contains: {
            productName: ''
          },
          between: {
            price: {
              former: 0,
              latter: 0
            }
          }
        }
      }
    },
    methods: {
      print() {
        window.print()
      },
      edit(item) {
        this.$router.push({
          name: 'Product',
          params: {
            id: item.id
          }
        })
      },
      add() {
        this.$router.push('NewProduct')
      },
      remove(item) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this item?', '', () => {
            this.api.deleteData('products/' + item.id.toString()).then((res) => {
              this.getProducts()
            }, (err) => {
              console.log(err)
            })
          })
        }
      },
      changeStatus(item) {
        item.isActive = !item.isActive
        this.api.putData('products/' + item.id.toString(), item).then((res) => { }, (err) => {
          console.log(err)
        })
      },
      getProducts() {
        this.api.getData('products?_expand=category').then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            item.amount = item.quantity * item.price
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      searchProducts() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)
        this.api.getData('products?_expand=category&' + query).then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            item.amount = item.quantity * item.price
            item.category = item.category ? item.category.firstName + ' ' + item.category.lastName : ''
          })
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      clearSearchFilters() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.clearSearchFilters(this.searchVm)
        this.api.getData('products?_expand=category').then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            item.amount = item.quantity * item.price
            item.category = item.category ? item.category.firstName + ' ' + item.category.lastName : ''
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
    // watch: {
    //   items () {
    //     this.pages()
    //   }
    // },
    mounted: function () {
      // this.$nextTick(() => {
      this.getProducts()
      // })
    }
  }
</script>
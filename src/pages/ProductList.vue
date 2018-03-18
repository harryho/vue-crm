<template>
  <v-container fluid="">
    <v-flex xs12="">
      <v-card>
        <v-card-title>
          Products
          <v-spacer></v-spacer>
          <v-btn class="blue-grey" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
            <v-icon>search</v-icon>
          </v-btn>
          &nbsp;
          <v-btn class="light-blue" fab small @click.native="reloadData()">
            <v-icon>refresh</v-icon>
          </v-btn>
          &nbsp;
          <v-btn class="grey" fab small @click.native="print()">
            <v-icon>print</v-icon>
          </v-btn>
          &nbsp;
          <v-btn class="orange" fab small dark @click.native="add">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
        <!-- <v-data-table class="elevation-1" v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions>
          <template class="body-2" slot="items" slot-scope="props">
            <td class="body-2">{{ props.item.productName }}</td>
            <td class="text-xs-right">{{ props.item.category.categoryName}}</td>
            <td class="text-xs-right">AUD ${{ props.item.unitPrice }}</td>
            <td class="text-xs-right">{{ props.item.unitInStock }}</td>
            <td class="text-xs-right">
              <v-btn class="teal" fab small dark @click.native="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn class="cyan" fab small @click.native="remove(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :value="pages" :length="pages" :total-visible="7" circle></v-pagination>
        </div> -->

        <Table v-if="loading===false" :headers="headers" :items="items"  :pagination="pagination" @edit="edit" @remove="remove"></Table>

      </v-card>
    </v-flex>
    <v-navigation-drawer right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile-title>&nbsp;</v-list-tile-title>
        <v-list-tile>
          <v-list-tile-title>Search Panel</v-list-tile-title>
          <v-list-tile-action>
            <!-- <v-btn @click.native="searchProducts">
              <v-icon dark="">search</v-icon>
            </v-btn> -->
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile-title>&nbsp;</v-list-tile-title>
        <v-layout row="">
          <v-flex xs11 offset-xs1>
            <v-text-field name="productName" label="Product" light v-model="searchVm.contains.productName"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row="">
          <v-flex xs12="">
            <v-subheader class="text-sm-central" light>Price range between Price 1 and Price 2 </v-subheader>
          </v-flex>
        </v-layout>
        <v-layout row="">
          <v-flex xs12 offset-xs1>
            <v-slider class="text-xs-central" label="Price 1" light v-bind:max="100" v-model="searchVm.between.price.former"></v-slider>
          </v-flex>
        </v-layout>
        <v-layout row="">
          <v-flex xs12 offset-xs2>
            <v-text-field type="number" light v-model="searchVm.between.price.former"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row="">
          <v-flex xs12 offset-xs1>
            <v-slider class="text-xs-central" label="Price 2" light v-bind:max="1000" v-model="searchVm.between.price.latter"></v-slider>
          </v-flex>
        </v-layout>
        <v-layout row="">
          <v-flex xs12 offset-xs2>
            <v-text-field type="number" light v-model="searchVm.between.price.latter"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout class="pl-5 ml-5" row>
            <v-btn class="purple" fab small @click.native="searchProducts">
                <v-icon dark="">search</v-icon>
              </v-btn>
          <v-btn class="grey" fab small @click.native="rightDrawer = !rightDrawer">
            <v-icon dark="">clear</v-icon>
          </v-btn>
        </v-layout>

      </v-list>
    </v-navigation-drawer>
  </v-container>

</template>
<script>
  import Table from "@/components/Table.vue"
  import { mapState } from 'vuex'
/* globals Store */
  export default {
    components:{
      Table
    },
    data: function () {
      return {
        rightDrawer: false,
        right: true,
        search: '',
        headers: [
        { text: 'Product', left: true, value: 'productName' },
        { text: 'Category', value: 'categoryName' },
        { text: 'Price', value: 'unitPrice' },
        { text: 'In Stock', value: 'unitInStock'
        },
      ],
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
            }, (err) => {
              console.log(err)
            })
          })
        }
      },
      searchProducts() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)
        Store.dispatch('products/searchProducts', query)
      },
      reloadData() {
        Store.dispatch('products/getAllProducts')
      }
    },
    computed: {
      ...mapState('products',
      {
        items: 'items',
        pagination: 'pagination',
        loading: 'loading'
      }
    ),
    },
    created () {
      Store.dispatch('products/getAllProducts')
    },
    mounted: function () {
      console.log(this.headers)
      this.$nextTick(() => {
      // this.getProducts()
      })
    }
  }
</script>

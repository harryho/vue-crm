  <template>
    <v-container fluid>
      <v-flex xs12>
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

          <Table v-if="loading===false" :headers="headers" :items="items"  :pagination="pagination" @edit="edit" @remove="remove"></Table>
        </v-card>

      </v-flex>
          <search-panel :rightDrawer="rightDrawer" @cancelSearch="cancelSearch" @searchData="searchProducts">
            <v-layout row>
              <v-flex xs11 offset-xs1>
                <v-text-field name="productName" label="Product" light v-model="searchVm.contains.productName"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs11 offset-xs1>
                <v-subheading class="heading text-sm-central" light>Price Range</v-subheading>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs8 offset-xs1>
                <v-slider class="text-xs-central" label="Price 1" light v-bind:max="10000" v-model="searchVm.between.price.former"></v-slider>
              </v-flex>
              <v-flex xs3>
                  <v-text-field type="number" light v-model="searchVm.between.price.former"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs8 offset-xs1>
                <v-slider class="text-xs-central" label="Price 2" light v-bind:max="999999" v-model="searchVm.between.price.latter"></v-slider>
              </v-flex>
              <v-flex xs3>
                  <v-text-field type="number" light v-model="searchVm.between.price.latter"></v-text-field>
                </v-flex>
            </v-layout>
        </search-panel>
    </v-container>

  </template>
  <script>
    import Table from "@/components/Table.vue"
    import SearchPanel from "@/components/SearchPanel.vue"
    import FormControl from "@/components/FormControl.vue"
    import { mapState } from 'vuex'
    import Vue from 'vue'
  /* globals Store */

    export default {
      components:{
        Table,
        FormControl,
        SearchPanel
      },
      data: function () {
        return {
          children: () => {
            // Vue.component('v-text-field', Vue.extend(VTextField))
            const c =  Vue.component('v-text-field')
            return c },
          // searchPanel: false,
          rightDrawer: false,
          right: true,
          search: '',
          headers: [
            { text: 'Product', left: true, value: 'productName' },
            { text: 'Category', value: 'category.categoryName' },
            { text: 'Price', value: 'unitPrice' },
            { text: 'In Stock', value: 'unitInStock'
            },
          ],
          searchVm: {
            contains: {
              productName: '',
              category: '',
              // brand: 'bbb'
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
          console.log(this.searchVm)

          this.rightDrawer = !this.rightDrawer
          this.appUtil.buildSearchFilters(this.searchVm)
          const query = this.appUtil.buildJsonServerQuery(this.searchVm)

          console.log(query)
          Store.dispatch('products/searchProducts', query)
        },
        reloadData() {
          Store.dispatch('products/getAllProducts')
        },
        cancelSearch() {
          this.rightDrawer = false
        }
      },
      computed: {
        ...mapState('products',
          {
            items: 'items',
            pagination: 'pagination',
            loading: 'loading'
          }
        )
      },
      created () {
        Store.dispatch('products/getAllProducts')
      },
      mounted: function () {
        console.log(this.headers)
          this.$nextTick(() => {
        })
      }
    }
  </script>

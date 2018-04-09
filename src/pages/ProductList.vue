  <template>
    <v-container fluid>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Products {{pagination? "("+pagination.totalItems+")": ""}}
            <v-spacer></v-spacer>
            <v-btn class="blue-grey" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
              <v-icon>search</v-icon>
            </v-btn>
            &nbsp;
            <v-btn class="brown lighten-1" fab small @click.native="reloadData()">
              <v-icon>refresh</v-icon>
            </v-btn>
            &nbsp;
            <v-btn class="light-green darken-2" fab small @click.native="print()">
              <v-icon>print</v-icon>
            </v-btn>
            &nbsp;
            <v-btn class="deep-orange darken-3" fab small dark @click.native="add">
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
            <label class="heading text-sm-central" light>Price Range</label>
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
      <confirm-dialog :dialog="dialog" :dialogTitle="dialogTitle" :dialogText="dialogText" @onConfirm="onConfirm" @onCancel="onCancel" ></confirm-dialog>
      <v-snackbar v-if="loading===false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar" >
      {{ notice }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
    </v-container>
  </template>
  <script>
import Table from "@/components/Table.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { mapState, dispatch } from "vuex";
import Vue from "vue";
/* globals Store */

export default {
  components: {
    Table,
    SearchPanel,
    ConfirmDialog
  },
  data () {
    return {
      dialog: false,
      dialogTitle: "Product Delete Dialog",
      dialogText: "Do you want to delete this product?",
      rightDrawer: false,
      right: true,
      search: "",
      headers: [
        { text: "Product", left: true, value: "productName" },
        { text: "Category", value: "category.categoryName" },
        { text: "Price", value: "unitPrice" },
        {
          text: "In Stock",
          value: "unitInStock"
        }
      ],
      searchVm: {
        contains: {
          productName: "",
          category: ""
        },
        between: {
          price: {
            former: 0,
            latter: 0
          }
        }
      },
      productId: "",
      query: "",
      snackbarStatus: false,
      timeout: 3000,
      color: ""
    };
  },
  methods: {
    print () {
      window.print();
    },
    edit (item) {
      this.$router.push({
        name: "Product",
        params: {
          id: item.id
        }
      });
    },
    add () {
      this.$router.push("NewProduct");
    },
    remove (item) {
      this.productId = item.id;
      this.dialog = true;
    },
    onConfirm () {
      Store.dispatch(
        "products/deleteProduct",
        this.productId,
        this.query,
        this.pagination
      ).then(() => {
        Store.dispatch("products/searchProducts", this.query, this.pagination);
        Store.dispatch("products/closeSnackBar", 2000);
      });
      this.dialog = false;
    },
    onCancel () {
      this.productId = "";
      this.dialog = false;
    },
    searchProducts () {
      this.rightDrawer = !this.rightDrawer;
      this.appUtil.buildSearchFilters(this.searchVm);
      this.query = this.appUtil.buildJsonServerQuery(this.searchVm);
      Store.dispatch("products/searchProducts", this.query, this.pagination);
    },
    reloadData () {
      this.query = "";
      Store.dispatch("products/getAllProducts");
    },
    cancelSearch () {
      this.rightDrawer = false;
    },
    closeSnackbar () {
      Store.commit("products/setSnackbar", { snackbar: false });
      Store.commit("products/setNotice", { notice: "" });
    }
  },
  computed: {
    ...mapState("products", {
      items: "items",
      pagination: "pagination",
      loading: "loading",
      mode: "mode",
      snackbar: "snackbar",
      notice: "notice"
    })
  },
  created () {
    Store.dispatch("products/getAllProducts");
  },
  mounted () {
    console.log(this.headers);
    this.$nextTick(() => {});
  }
};
</script>

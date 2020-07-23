<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title">Products {{ pagination ? '(' + pagination.totalItems + ')' : '' }} </span>
          <v-spacer></v-spacer>
          <table-header-buttons :add="add" :reloadData="reloadData" :updateSearchPanel="updateSearchPanel"></table-header-buttons>
        </v-card-title>
        <Table v-if="loading === false" :headers="headers" :items="items" :pagination="pagination" @edit="edit" @remove="remove"></Table>
      </v-card>
    </v-flex>
    <search-panel :rightDrawer="rightDrawer" @cancelSearch="cancelSearch" @searchData="searchProducts">
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="productName" label="Product" light v-model="searchFilter.contain.productName"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="minUnitPrice"  type="number"  label="Min Price" light v-model="searchFilter.greaterThanOrEqual.unitPrice"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="maxUnitPrice"  type="number"  label="Max Price" light v-model="searchFilter.lessThanOrEqual.unitPrice"></v-text-field>
        </v-flex>
      </v-layout> 
     
    </search-panel>
    <confirm-dialog
      :dialog="dialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    ></confirm-dialog>
    <v-snackbar v-if="loading === false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar">
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Table from '@/components/Table.vue';
import TableHeaderButtons from '@/components/TableHeaderButtons.vue';
import SearchPanel from '@/components/SearchPanel.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { debounce } from 'lodash';
import { buildSearchFilters, buildJsonServerQuery, clearSearchFilters } from '@/utils/app-util';
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { productModule } from '@/store/modules/products';
import { appModule } from '@/store/modules/app';

@Component({
  components: {
    Table,
    TableHeaderButtons,
    SearchPanel,
    ConfirmDialog
  }
})
export default class ProductList extends Vue {
  dialog = false;
  dialogTitle = 'Customer Delete Dialog';
  dialogText = 'Do you want to delete this customer?';
  showSearchPanel = false;
  right = true;
  search = '';
  headers = [
    { text: 'Product', left: true, value: 'productName' },
    { text: 'Category', value: 'category.categoryName' },
    { text: 'Price', value: 'unitPrice' },
    { text: 'In Stock', value: 'unitInStock' },
    { text: '', value: 'actions', sortable: false }
  ];
  searchFilter = {
    contain: {
      productName: '',
      category: ''
    },
    greaterThanOrEqual:{
      unitPrice: 0
    },
    lessThanOrEqual:{
      unitPrice: 0
    },
  };
  private productId = '';
  private query = '';
  private snackbarStatus = false;
  private timeout = 2000;
  private color = '';
  private quickSearchFilter = '';
  private itemId = -1;

  print() {
    window.print();
  }
  edit(item) {
    this.$router.push({
      name: 'Product',
      params: { id: item.id }
    });
  }
  add() {
    this.$router.push('NewProduct');
  }
  remove(item) {
    this.itemId = item.id;
    this.dialog = true;
  }

  onConfirm() {
    productModule.deleteProduct(this.itemId);
    this.dialog = false;
  }
  onCancel() {
    this.itemId = -1;
    this.dialog = false;
  }
  searchProducts() {
    this.showSearchPanel = !this.showSearchPanel;
    buildSearchFilters(this.searchFilter);
    this.query = buildJsonServerQuery(this.searchFilter);
    this.quickSearch = '';
    productModule.searchProducts(this.query);
  }

  clearSearchFilters() {
    this.showSearchPanel = !this.showSearchPanel;
    clearSearchFilters(this.searchFilter);
    productModule.getAllProducts();
  }

  reloadData() {
    this.query = '';
    productModule.getAllProducts();
  }

  updateSearchPanel() {
    this.rightDrawer = !this.rightDrawer;
  }

  cancelSearch() {
    this.showSearchPanel = false;
  }

  closeSnackbar() {
    appModule.closeNotice();
  }

  quickSearchCustomers = debounce(function() {
    productModule.quickSearch(this.headers, this.quickSearchFilter);
  }, 500);

  get items() {
    return productModule.items;
  }
  get pagination() {
    return productModule.pagination;
  }
  get loading() {
    return appModule.loading;
  }
  get mode() {
    return appModule.mode;
  }
  get snackbar() {
    return appModule.snackbar;
  }
  get notice() {
    return appModule.notice;
  }

  get rightDrawer() {
    return this.showSearchPanel;
  }

  set rightDrawer(rightDrawer: boolean) {
    this.showSearchPanel = rightDrawer;
  }

  get quickSearch() {
    return this.quickSearchFilter;
  }
  set quickSearch(val) {
    this.quickSearchFilter = val;
    this.quickSearchFilter && this.quickSearchCustomers();
  }

  created() {
    productModule.getAllProducts();
  }
  mounted() {
    this.$nextTick(() => {
      console.log(this.headers);
    });
  }
}
</script>

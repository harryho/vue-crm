<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title"
            >Orders {{ pagination ? '(' + pagination.totalItems + ')' : '' }}
          </span>
          <v-spacer></v-spacer>
         <table-header-buttons :add="add" :reloadData="reloadData" :updateSearchPanel="updateSearchPanel"></table-header-buttons>
    
        </v-card-title>
        <Table v-if="loading === false" :headers="headers" :items="items" :pagination="pagination" @edit="edit" @remove="remove"></Table>
      </v-card>
    </v-flex>
    <search-panel :rightDrawer="rightDrawer" @cancelSearch="cancelSearch" @searchData="searchOrders">
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="reference" label="Reference" light v-model="searchFilter.contain.reference"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="customer" label="Customer" light v-model="searchFilter.contain.customer"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="minAmount"  type="number"  label="Min Amount" light v-model="searchFilter.greaterThanOrEqual.amount"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field name="maxAmount"  type="number"  label="Max Amount" light v-model="searchFilter.lessThanOrEqual.amount"></v-text-field>
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
    <v-snackbar v-if="loading === false" :right="true" :timeout="2000" :color="mode" v-model="snackbar">
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Table from '@/components/Table.vue';
import TableHeaderButtons from '@/components/TableHeaderButtons.vue'
import SearchPanel from '@/components/SearchPanel.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { debounce } from 'lodash';
import { buildSearchFilters, buildJsonServerQuery, clearSearchFilters } from '@/utils/app-util';
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { customerModule } from '@/store/modules/customers';
import { orderModule } from '@/store/modules/orders';
import { appModule } from '@/store/modules/app';

@Component({
  components: {
    Table,
    TableHeaderButtons,
    SearchPanel,
    ConfirmDialog
  }
})
export default class OrderList extends Vue {
  public dialog = false;
  public dialogTitle = 'Customer Delete Dialog';
  public dialogText = 'Do you want to delete this customer?';
  public showSearchPanel = false;
  public right = true;
  public search = '';
  public headers = [
    {
      text: 'Reference',
      left: true,
      value: 'reference'
    },
    { text: 'Order Items', value: 'quantity' },
    { text: 'Amount', value: 'amount' },
    { text: 'Customer', value: 'customerName' },
    { text: 'Order Date', value: 'orderDate' },
    { text: 'Shipping Date', value: 'shippedDate' },
    { text: '', value: 'actions', sortable: false }
  ];
  private searchFilter = {
    contain: {
      reference: '',
      customer: ''
    },
    greaterThanOrEqual:{
      amount: 0
    },
    lessThanOrEqual:{
      amount: 0
    },
  };
  // private orderId = '';
  private query = '';
  private color = '';
  private quickSearchFilter = '';
  private itemId = -1;

  edit(item) {
    this.$router.push(`order/${item.id}`);
  }
  add() {
    this.$router.push('NewOrder');
  }
  remove(item) {
    this.itemId = item.id;
    this.dialog = true;
  }
  onConfirm() {
    orderModule.deleteOrder(this.itemId);
    this.dialog = false;
  }
  onCancel() {
    this.itemId = -1;
    this.dialog = false;
  }
  searchOrders() {
    this.showSearchPanel = !this.showSearchPanel;
    buildSearchFilters(this.searchFilter);
    this.query = buildJsonServerQuery(this.searchFilter);
    this.quickSearch = '';
    orderModule.searchOrders(this.query);
  }


  clearSearchFilters() {
    this.showSearchPanel = !this.showSearchPanel;
    clearSearchFilters(this.searchFilter);
    orderModule.getAllOrders();
  }

  reloadData() {
    this.query = '';
    orderModule.getAllOrders();
  }

   updateSearchPanel(){
    this.rightDrawer=!this.rightDrawer;
  }

  cancelSearch() {
    this.showSearchPanel = false;
  }

  closeSnackbar() {
    appModule.closeNotice();
  }

  quickSearchCustomers = debounce(function() {
    orderModule.quickSearch(this.headers, this.quickSearchFilter);
  }, 500);

  get items() {
    return customerModule.items;
  }
  get pagination() {
    return customerModule.pagination;
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

  set rightDrawer(_showSearchPanel: boolean) {
    this.showSearchPanel = _showSearchPanel;
  }

  get quickSearch() {
    return this.quickSearchFilter;
  }
  set quickSearch(val) {
    this.quickSearchFilter = val;
    this.quickSearchFilter && this.quickSearchCustomers();
  }

  created() {
    orderModule.getAllOrders();
  }
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.headers);
    // });
  }
}
</script>

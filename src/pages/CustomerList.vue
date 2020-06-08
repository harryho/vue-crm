<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="title"
            >Customers {{ pagination ? "(" + pagination.totalItems + ")" : "" }}
          </span>
          <v-spacer></v-spacer>
          <table-header-buttons
            :add="add"
            :reloadData="reloadData"
            :updateSearchPanel="updateSearchPanel"
          ></table-header-buttons>
        </v-card-title>
        <Table
          v-if="loading === false"
          :headers="headers"
          :items="items"
          :pagination="pagination"
          @edit="edit"
          @remove="remove"
        ></Table>
      </v-card>
    </v-flex>
    <search-panel
      :rightDrawer="rightDrawer"
      @cancelSearch="cancelSearch"
      @searchData="searchCustomers"
    >
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Frist Name"
            light
            v-model="searchFilter.contain.firstname"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Last Name"
            light
            v-model="searchFilter.contain.lastname"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Mobile"
            light
            v-model="searchFilter.contain.mobile"
          ></v-text-field>
        </v-flex>
      </v-layout>
            <v-layout row>
        <v-flex xs11 offset-xs1>
          <v-text-field
            name="input-1-3"
            label="Email"
            light
            v-model="searchFilter.contain.email"
          ></v-text-field>
        </v-flex>
      </v-layout>
     
    </search-panel>

    <confirm-dialog
      :dialog="dialog"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    />
    <v-snackbar
      v-if="loading === false"
      :right="true"
      :timeout="2000"
      :color="mode"
      v-model="snackbar"
    >
      {{ notice }}
      <v-btn dark text @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Table from "@/components/Table.vue";
import TableHeaderButtons from "@/components/TableHeaderButtons.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { debounce } from "lodash";
import {
  buildSearchFilters,
  buildJsonServerQuery,
  clearSearchFilters
} from "@/utils/app-util";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import { Entity } from "../types";
import { customerModule } from "@/store/modules/customers";
import { appModule } from "@/store/modules/app";

@Component({
  components: {
    Table,
    TableHeaderButtons,
    SearchPanel,
    ConfirmDialog
  }
})
export default class CustomerList extends Vue {
  public dialog = false;
  public dialogTitle = "Customer Delete Dialog";
  public dialogText = "Do you want to delete this customer?";
  private showSearchPanel = false;
  public right = true;
  public search = "";
  public headers = [
    {
      text: "",
      value: "avatar",
      sortable: false
    },
    {
      text: "First Name",
      left: true,
      value: "firstname"
    },
    { text: "Last Name", value: "lastname" },
    { text: "Email", value: "email" },
    { text: "Mobile", value: "mobile" },
    { text: "Reward", value: "rewards" },
    { text: "Membership", value: "membership" },
    { text: "", value: "actions", sortable: false }
  ];
  private searchFilter = {
    contain: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: ""
    }
  };
  // private customerId = "";
  private query = "";
  private color = "";
  private quickSearchFilter = "";
  private itemId = -1;

  edit(item: Entity) {
    this.$router.push(`customer/${item.id}`);
  }

  remove(item: Entity) {
    this.itemId = item.id;
    this.dialog = true;
  }

  add() {
    this.$router.push("NewCustomer");
  }

  onConfirm() {
    customerModule.deleteCustomer(this.itemId);
    this.dialog = false;
  }
  onCancel() {
    this.itemId = -1;
    this.dialog = false;
  }

  searchCustomers() {
    buildSearchFilters(this.searchFilter);
    this.query = buildJsonServerQuery(this.searchFilter);
    console.log(this.query)
    this.quickSearch = "";
    customerModule.searchCustomers(this.query);
    this.showSearchPanel = false;
  }

  clearSearchFilters() {
    this.showSearchPanel = !this.showSearchPanel;
    clearSearchFilters(this.searchFilter);
    customerModule.getAllCustomers();
  }

  reloadData() {
    this.query = "";
    customerModule.getAllCustomers();
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
    customerModule.quickSearch(this.headers, this.quickSearchFilter);
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
    customerModule.getAllCustomers();
  }

  mounted() {}
}
</script>

/* globals Store */
import Vue from "vue";
import Vuex from "vuex";

import api from "@/utils/backend-api";
import { Customer } from "@/models";
import {
  sendSuccessNotice,
  sendErrorNotice,
  closeNotice,
  getDefaultPagination,
  commitPagination,
} from "@/utils/store-util.js";

import { get } from "lodash";

const state = {
  items: [],
  pagination: {},
  loading: true,
  mode: "",
  snackbar: false,
  notice: "",
  customer: new Customer(),
  orders: [],
  orderList: [],
};

const getters = {};

const actions = {
  getOrders ({ commit }) {
    api.getData("orders").then(res => {
      if (res.data && res.data.length > 0) {
        const orderList = res.data.map(c => {
          c.text = c.firstName + " " + c.lastName;
          c.value = c.id;
          return c;
        });
        commit("setOrderList", orderList);
      }
    });
  },
  getCustomerById ({ commit }, id) {
    commit("setLoading", { loading: true });
    if (id) {
      api.getData("customers/" + id).then(
        res => {
          const customer = res.data;
          commit("setCustomer", { customer });
          commit("setLoading", { loading: false });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      commit("setCustomer", { customer: new Customer() });
      commit("setLoading", { loading: false });
    }
  },
  getAllCustomers ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("customers?_embed=orders").then(res => {
      const customers = res.data;

      customers.forEach(item => {
        item.orderAmount = item.orders.length;

      });
      commitPagination(commit, customers);
      commit("setLoading", { loading: false });
    });
  },
  searchCustomers ({ commit }, searchQuery, pagination) {
    api.getData("customers?_embed=orders&" + searchQuery).then(res => {
      const customers = res.data;
      customers.forEach(p => {
        p.orderAmount = p.orders.length;
      });
      commitPagination(commit, customers);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for production
    api.getData("customers?_embed=orders").then(res => {
      const customers = res.data.filter(r =>
        headers.some(header => {
          const val = get(r, [header.value]);
          return (
            (val &&
              val
                .toString()
                .toLowerCase()
                .includes(qsFilter)) ||
            false
          );
        })
      );
      customers.forEach(item => {
        item.orderAmount = item.orders.length;
      });
      commitPagination(commit, customers);
    });
  },
  deleteCustomer ({ commit, dispatch }, id, query, pagination) {
    api
      .deleteData("customers/" + id.toString())
      .then(res => {
        return new Promise((resolve, reject) => {
          sendSuccessNotice(commit, "Operation is done.");
          resolve();
        });
      })
      .catch(err => {
        console.log(err);
        sendErrorNotice(commit, "Operation failed! Please try again later. ");
        closeNotice(commit, 1500);
      });
  },
  saveCustomer ({ commit, dispatch }, customer) {
    if (!customer.id) {
      api
        .postData("customers", customer)
        .then(res => {
          const customer = res.data;
          commit("setCustomer", { customer });
          sendSuccessNotice(commit, "New customer has been added.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .putData("customers/" + customer.id.toString(), customer)
        .then(res => {
          const customer = res.data;
          commit("setCustomer", { customer });
          sendSuccessNotice(commit, "Customer has been updated.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    }
  },
  closeSnackBar ({ commit }, timeout ) {
    closeNotice(commit, timeout);
  }
};

const mutations = {
  setOrderList (state, orders) {
    state.orders = orders;
  },
  setItems (state, customers) {
    state.items = customers;
  },
  setPagination (state, pagination) {
    state.pagination = pagination;
  },
  setLoading (state, { loading }) {
    state.loading = loading;
  },
  setNotice (state, { notice }) {
    console.log(" notice .... ", notice);
    state.notice = notice;
  },
  setSnackbar (state, { snackbar }) {
    state.snackbar = snackbar;
  },
  setMode (state, { mode }) {
    state.mode = mode;
  },
  setCustomer (state, { customer }) {
    state.customer = customer;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

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
  // page: 0,
  // pages: 0,
  loading: false,
  mode: "",
  snackbar: false,
  notice: "",
  order: "",
  customer: "",
  customerList: [],
};

const getters = {};

const actions = {
  getCustomers ({ commit }) {
    api.getData("customers").then(res => {
      if (res.data && res.data.length > 0) {
        const customerList = res.data.map(c => {
          c.text = c.firstName + " " + c.lastName;
          c.value = c.id;
          return c;
        });
        commit("setCustomerList", customerList);
      }
    });
  },
  getCustomerById ({ commit }, id) {
    if (id) {
      api.getData("orders/" + id + "?_expand=customer").then(
        res => {
          const order = res.data;
          commit("setCustomer", { order });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      commit("setCustomer", { order: new Customer() });
    }
  },
  getAllCustomers ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("orders?_expand=customer").then(res => {
      const orders = res.data;

      orders.forEach(item => {
        // p.categoryName = p.category.categoryName;
        let amount = 0;
        item.products.forEach(e => {
          amount += e.unitPrice;
        });
        item.amount = amount;
        item.quantity = item.products.length;
        item.customer = item.customer ? item.customer.firstName + " " + item.customer.lastName : "";
      });
      commitPagination(commit, orders);
      commit("setLoading", { loading: false });
    });
  },
  searchCustomers ({ commit }, searchQuery, pagination) {
    api.getData("orders?_expand=customer&" + searchQuery).then(res => {
      const orders = res.data;
      orders.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, orders);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for production
    api.getData("orders?_expand=customer").then(res => {
      const orders = res.data.filter(r =>
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
      orders.forEach(item => {
        let amount = 0;
        item.products.forEach(e => {
          amount += e.unitPrice;
        });
        item.amount = amount;
        item.quantity = item.products.length;
        item.customer = item.customer ? item.customer.firstName + " " + item.customer.lastName : "";
      });
      commitPagination(commit, orders);
    });
  },
  deleteCustomer ({ commit, dispatch }, id, query, pagination) {
    api
      .deleteData("orders/" + id.toString())
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
  saveCustomer ({ commit, dispatch }, order) {
    delete order.category;
    if (!order.id) {
      api
        .postData("orders", order)
        .then(res => {
          const order = res.data;
          commit("setCustomer", { order });
          sendSuccessNotice(commit, "New order has been added.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .putData("orders/" + order.id.toString(), order)
        .then(res => {
          const order = res.data;
          commit("setCustomer", { order });
          sendSuccessNotice(commit, "Customer has been updated.");
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    }
  },
};

const mutations = {
  setCustomerList (state, categories) {
    state.categories = categories;
  },
  setItems (state, orders) {
    state.items = orders;
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
  setCustomer (state, { order }) {
    state.order = order;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

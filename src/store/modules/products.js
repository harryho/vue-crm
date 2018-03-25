import Vue from "vue";
import Vuex from "vuex";

import api from "@/utils/backend-api";
Vue.use(Vuex);

const state = {
  items: [],
  pagination: {},
  page: 0,
  pages: 0,
  loading: false,
  mode: "",
  snackbar: false,
  notice: ""
};

const getters = {
  // getSnackbar(state) {
  //   console.log(" getter  snackber ", state.snackbar);
  //   return state.snackbar;
  // }
};

const actions = {
  getAllProducts({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("products?_expand=category").then(res => {
      const products = res.data;

      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commit("setProducts", products);
      const pages = Math.ceil(products.length / 10);
      commit("setLoading", { loading: false });
      commit("setPagination", {
        page: 1,
        totalItems: products.length,
        rowsPerPage: 10,
        pages
      });
    });
  },
  searchProducts({ commit }, searchQuery, pagination) {
    // commit("setLoading", { loading: true });
    api.getData("products?_expand=category&" + searchQuery).then(res => {
      const products = res.data;
      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commit("setProducts", products);
      const pages = Math.ceil(products.length / 10);
      // commit("setLoading", { loading: false });

      if (!pagination) {
        commit("setPagination", {
          page: 1,
          totalItems: products.length,
          rowsPerPage: 10,
          pages
        });
      } else {
        commit("setPagination", {
          ...pagination,
          totalItems: products.length,
          rowsPerPage: 10,
          pages
        });
      }
    });
  },
  deleteProduct({ commit, dispatch }, id, query, pagination) {
    // commit("setLoading", { loading: true });
    api
      .deleteData("products/" + id.toString())
      .then(res => {
        return new Promise((resolve, reject) => {

          const notice = "Operation succeeded.";
          const mode = "success";
          commit("setNotice", { notice });
          commit("setSnackbar", { snackbar: true });
          commit("setMode", { mode });
          console.log(" delete promise solve .... ");

          resolve();
        });
      })
      .catch(err => {
        console.log(err);
        return new Promise((resolve, reject) => {
          const notice = "Operation failed! Please try again later. ";
          const mode = "error";
          commit("setSnackbar", { snackbar: true });
          commit("setNotice", { notice });
          commit("setMode", { mode });

          resolve();
          console.log(" delete catch promise solve .... ");
        });
      });
  },
  closeSnackBar({ commit }, timeout) {
    console.log(" closeSnackBar ", timeout);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(" time out .... ", timeout);
        commit("setSnackbar", { snackbar: false });
        commit("setNotice", { notice: "" });
        commit("setMode", { mode: "" });
        resolve();
      }, timeout);
    });
    // });
  }
};

const mutations = {
  setProducts(state, products) {
    state.items = products;
    console.log(state.products);
  },
  setPagination(state, pagination) {
    state.pagination = pagination;
  },
  setLoading(state, { loading }) {
    state.loading = loading;
  },
  setNotice(state, { notice }) {
    console.log(" notice .... ", notice);
    state.notice = notice;
  },
  setSnackbar(state, { snackbar }) {
    state.snackbar = snackbar;
  },
  setMode(state, { mode }) {
    state.mode = mode;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

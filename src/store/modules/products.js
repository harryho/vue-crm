import Vue from "vue";
import Vuex from "vuex";

import api from "@/utils/backend-api";
Vue.use(Vuex);

const state = {
  items: [],
  pagination: {},
  page: 0,
  pages: 0,
  loading: false
};

const actions = {
  getAllProducts({commit}) {
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
  searchProducts({commit}, searchQuery) {
    api.getData("products?_expand=category&" + searchQuery).then(res => {
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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};

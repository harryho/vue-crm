import Vue from "vue";
import Vuex from "vuex";

import api from "@/utils/backend-api";
import {Product} from "@/models";
Vue.use(Vuex);

const state = {
  items: [],
  pagination: {},
  page: 0,
  pages: 0,
  loading: false,
  mode: "",
  snackbar: false,
  notice: "",
  product: "",
  categories: []
};

function sendSuccessNotice ( commit, notice ) {
  commit("setNotice", { notice });
  commit("setSnackbar", { snackbar: true });
  commit("setMode", {mode: "success"});
}

function sendErrorNotice ( commit, notice ) {
  commit("setNotice", { notice });
  commit("setSnackbar", { snackbar: true });
  commit("setMode", {mode: "error"});
}

const getters = {
};

const actions = {
  getCategories: function ({commit}) {
    api.getData('categories').then(res => {
      const categories  = []
      res.data.forEach((c) => {
        const category = {...c}
        category.text = c.categoryName
        category.value = c.id
        categories.push(category)
      })
      commit("setCategories", categories);
   })
  },
  getProductById ({commit}, id) {
    if (id){
     api.getData('products/' + id + '?_expand=category').then((res) => {
          const product = res.data
          commit("setProduct", {product});
          // this.product.category.categoryName = this.product.category.firstName + ' ' + this.product.category.lastName
        }, (err) => {
          console.log(err )
        })
    } else {
      commit("setProduct", {product: new Product()});
    }
  },
  getAllProducts ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("products?_expand=category").then(res => {
      const products = res.data;

      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commit("setItems", products);
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
  searchProducts ({ commit }, searchQuery, pagination) {
    // commit("setLoading", { loading: true });
    api.getData("products?_expand=category&" + searchQuery).then(res => {
      const products = res.data;
      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commit("setItems", products);
      const pages = Math.ceil(products.length / 10);
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
  deleteProduct ({ commit, dispatch }, id, query, pagination) {
    api
      .deleteData("products/" + id.toString())
      .then(res => {
        return new Promise((resolve, reject) => {
          sendSuccessNotice(commit, "Operation succeeded.");
          resolve();
        });
      })
      .catch(err => {
        console.log(err);
        return new Promise((resolve, reject) => {
           sendErrorNotice(commit, "Operation failed! Please try again later. ");

          resolve();
          console.log(" delete catch promise solve .... ");
        });
      });
  },
  saveProduct ({ commit, dispatch }, product) {
    // let product = this.product;
    delete product.category;

    if (!product.id) {
      api.postData("products", product).then(
        res => {
          const product = res.data
          commit("setProduct", {product});
          sendSuccessNotice( commit, "New product has been added.")
        }
      );
    } else {
      api.putData("products/" + product.id.toString(), product).then(
        res => {
          const product = res.data
          commit("setProduct", {product});
          sendSuccessNotice( commit, "Product has been updated.")
        },
      );
    }
  },
  closeSnackBar ({ commit }, timeout) {
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
  }
};

const mutations = {
  setCategories (state, categories) {
    state.categories = categories;

  },
  setItems (state, products) {
    state.items = products;
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
  setProduct (state, {product}) {
    state.product = product
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

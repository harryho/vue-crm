/* globals Store */
import api from "@/utils/backend-api";
import {Product} from "@/models";
import {
  sendSuccessNotice,
  sendErrorNotice,
  closeNotice,
  getDefaultPagination,
  commitPagination
} from "@/utils/store-util.js";
import {get} from "lodash"

const state = {
  items: [],
  pagination: getDefaultPagination(),
  // page: 0,
  // pages: 0,
  loading: false,
  mode: "",
  snackbar: false,
  notice: "",
  product: new Product(),
  categories: [],
};

const getters = {
};

const actions = {
  getCategories ({ commit }) {
    api.getData("categories").then(res => {
      const categories = [];
      res.data.forEach(c => {
        const category = { ...c };
        category.text = c.categoryName;
        category.value = c.id;
        categories.push(category);
      });
      commit("setCategories", categories);
    });
  },
  getProductById ({ commit }, id) {
    if (id) {
      api.getData("products/" + id + "?_expand=category").then(
        res => {
          const product = res.data;
          commit("setProduct", { product });
        },
        err => {
          console.log(err);
        }
      );
    } else {
      commit("setProduct", { product: new Product() });
    }
  },
  getAllProducts ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("products?_expand=category").then(res => {
      const products = res.data;
      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, products);
      commit("setLoading", { loading: false });
    });
  },
  searchProducts ({ commit }, searchQuery) {
    api.getData("products?_expand=category&" + searchQuery).then(res => {
      const products = res.data;
      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, products);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for production
    api.getData("products?_expand=category").then(res => {
      const products = res.data.filter(r =>
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
      products.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, products);
    });
  },
  deleteProduct ({ commit, dispatch }, id) {
    api
      .deleteData("products/" + id.toString())
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
  saveProduct  ({ commit, dispatch }, product) {
    delete product.category;
    if (!product.id) {
      api
        .postData("products/", product)
        .then(res => {
          const product = res.data;
          commit("setProduct", { product });
          sendSuccessNotice(commit, "New product has been added.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .putData("products/ss" + product.id.toString(), product)
        .then(res => {
          const product = res.data;
          commit("setProduct", { product });
          sendSuccessNotice(commit, "Product has been updated.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    }
  },
  closeSnackBar ({ commit }, timeout) {
    closeNotice(commit, timeout);
  },
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

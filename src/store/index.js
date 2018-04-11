import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import api from "@/utils/backend-api"
import user from './modules/user'
import products from './modules/products'
import orders from "./modules/orders";
import customers from "./modules/customers";
Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })], // !debug ? [createPersistedState({ storage: window.sessionStorage })] : [],
  modules: {
    user,
    products,
    orders,
    customers
  }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './utils/store'
import api from './utils/backend-api'
import appUtil from './utils/app-util'

Vue.use(Vuetify)
Vue.config.productionTip = false

window.Store = store
Vue.prototype.api = api
Vue.prototype.appUtil = appUtil

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


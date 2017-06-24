// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './utils/store'
import api from './utils/backend-api'
import appUtil from './utils/app-util'

import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.1s',
    opacity: '0.5s',
    termination: 400
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)

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

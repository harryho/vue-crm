import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  callingAPI: false,
  searching: '',
  user: null,
  token: null,
  userInfo: {
    messages: [],
    notifications: [],
    tasks: []
  }
}

const mutations = {
  loginLoading (state) {
    state.callingAPI = !state.callingAPI
  },
  globalSearching (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state,
  mutations
})

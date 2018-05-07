const state = {
  callingAPI: false,
  searching: "",
  user: null,
  token: null,
  mode: "",
  userInfo: {
    messages: [],
    notifications: [],
    tasks: []
  }
}

const actions = {
  updateUser ({ commit }, { user, token }) {
    commit("setToken", token)
    commit("setUser", user)
  },
  logout ({ commit }) {
    commit("setToken", null)
    commit("setUser", {})
  }
}

const mutations = {
  loginLoading (state) {
    state.callingAPI = !state.callingAPI
  },
  globalSearching (state) {
    state.searching = state.searching === "" ? "loading" : ""
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

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

/* globals Store */
import api from './backend-api'

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    let data = 'username=' + email + '&password=' + pass
    api.login('token', data).then((res) => {
      let token = res.access_token || res.data.access_token
      let user = res.user || res.data.user
      console.log(Store)
      // Store.commit('setToken', token)
      // Store.commit('setUserProfile', {user, token})
      Store.dispatch('updateUser', {user, token})
      if (cb) cb(true, null)
      this.onChange(true)
    }, (err) => {
      console.log(err)
      if (cb) cb(false, err)
      this.onChange(false)
    })
  },
  getToken () {
    return Store.state.user.token
  },
  logout (cb) {
    // delete localStorage.token
    // Store.commit('setToken', null)
    Store.dispatch('logout')
    if (cb) cb(false)
    this.onChange(false)
  },
  loggedIn () {
    return !!Store.state.user.token
  },
  onChange () {}
}

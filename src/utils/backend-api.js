import axios from 'axios'

const BASE_URL = 'http://localhost:5354/'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {} // do not remove this, its added to add params later in the config
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  /* global window Store */
  const {token} = Store.state.user
  console.log("token", token)
  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
    config.headers.common['Access-Control-Allow-Origin'] = '*'
  } else {
    // Use application/x-www-form-urlencoded for login
    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => response, (error) => {
  console.log(error.config)
  return Promise.reject(error)
})

export default {
  getData (action) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url)
  },
  postData (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  },
  putData (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.put(url, data)
  },
  deleteData (action) {
    let url = `${BASE_URL}`
    url += action
    return instance.delete(url)
  },
  login (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url, data)
  }
}

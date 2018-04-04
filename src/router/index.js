import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/404'

import Dashboard from '@/pages/Dashboard'
import OrderList from '@/pages/OrderList'
import OrderForm from '@/pages/OrderForm'
import About from '@/pages/About'
import CustomerList from '@/pages/CustomerList'
import CustomerForm from '@/pages/CustomerForm'
import Products from '@/pages/ProductList'
import ProductForm from '@/pages/ProductForm'

import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

import auth from '@/utils/auth'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

// const debug = process.env.NODE_ENV !== 'production'

export default new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/404', component: ErrorPage, name: 'ErrorPage' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard', beforeEnter: requireAuth },
    { path: '/about', component: About, name: 'About', beforeEnter: requireAuth },
    { path: '/orders', component: OrderList, name: 'OrderList', beforeEnter: requireAuth },
    { path: '/neworder', component: OrderForm, name: 'NewOrder', beforeEnter: requireAuth },
    { path: '/order/:id', component: OrderForm, name: 'OrderForm', beforeEnter: requireAuth },
    { path: '/customers', component: CustomerList, name: 'CustomerList', beforeEnter: requireAuth },
    { path: '/newcustomer', component: CustomerForm, name: 'NewCustomer', beforeEnter: requireAuth },
    { path: '/customer/:id', component: CustomerForm, name: 'CustomerForm', beforeEnter: requireAuth },
    { path: '/product/:id', component: ProductForm, name: 'Product', beforeEnter: requireAuth },
    { path: '/products', component: Products, name: 'Products', beforeEnter: requireAuth },
    { path: '/newproduct', component: ProductForm, name: 'NewProduct', beforeEnter: requireAuth },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/changePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/login')
      }
    },
    { path: '/', redirect: '/dashboard' },
    { path: '*', redirect: '/404' }
  ],
  meta: {
    progress: {
      func: [
        {call: 'color', modifier: 'temp', argument: '#ffb000'},
        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        {call: 'location', modifier: 'temp', argument: 'top'},
        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
      ]
    }
  }
})

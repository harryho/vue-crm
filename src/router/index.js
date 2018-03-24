import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/404'

import Dashboard from '@/components/Dashboard'
import Orders from '@/pages/OrderList'
import Order from '@/components/Order'
import About from '@/components/About'
import Customers from '@/pages/CustomerList'
import Customer from '@/components/Customer'
import Products from '@/pages/ProductList'
import Product from '@/components/Product'

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
    { path: '/orders', component: Orders, name: 'Orders', beforeEnter: requireAuth },
    { path: '/neworder', component: Order, name: 'NewOrder', beforeEnter: requireAuth },
    { path: '/order/:id', component: Order, name: 'Order', beforeEnter: requireAuth },
    { path: '/customers', component: Customers, name: 'Customers', beforeEnter: requireAuth },
    { path: '/newcustomer', component: Customer, name: 'NewCustomer', beforeEnter: requireAuth },
    { path: '/customer/:id', component: Customer, name: 'Customer', beforeEnter: requireAuth },
    { path: '/product/:id', component: Product, name: 'Product', beforeEnter: requireAuth },
    { path: '/products', component: Products, name: 'Products', beforeEnter: requireAuth },
    { path: '/newproduct', component: Product, name: 'NewProduct', beforeEnter: requireAuth },
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

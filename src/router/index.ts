import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { userModule } from "@/store/modules/user";
import ErrorPage from "@/components/404.vue";
import Dashboard from "@/pages/Dashboard.vue";
import OrderList from "@/pages/OrderList.vue";
import OrderForm from "@/pages/OrderForm.vue";
import About from "@/pages/About.vue";
import CustomerList from "@/pages/CustomerList.vue";
import CustomerForm from "@/pages/CustomerForm.vue";
import Products from "@/pages/ProductList.vue";
import ProductForm from "@/pages/ProductForm.vue";
import Login from "@/pages/Login.vue";
import ChangePassword from "@/components/ChangePassword.vue";

function requireAuth(to: TODO, from: TODO, next: TODO) {
  console.log(`userModule.isSignedI ${userModule.isSignedIn}`);
  if (!userModule.isSignedIn) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/404", component: ErrorPage, name: "ErrorPage" },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "dashboard",
    beforeEnter: requireAuth
  },
  { path: "/about", component: About, name: "about", beforeEnter: requireAuth },
  {
    path: "/orders",
    component: OrderList,
    name: "orders",
    beforeEnter: requireAuth
  },
  {
    path: "/neworder",
    component: OrderForm,
    name: "NewOrder",
    beforeEnter: requireAuth
  },
  {
    path: "/order/:id",
    component: OrderForm,
    name: "Order",
    beforeEnter: requireAuth
  },
  {
    path: "/customer",
    component: CustomerList,
    name: "customers",
    beforeEnter: requireAuth
  },
  {
    path: "/newcustomer",
    component: CustomerForm,
    name: "NewCustomer",
    beforeEnter: requireAuth
  },
  {
    path: "/customer/:id",
    component: CustomerForm,
    name: "Customer",
    beforeEnter: requireAuth
  },
  {
    path: "/product/:id",
    component: ProductForm,
    name: "Product",
    beforeEnter: requireAuth
  },
  {
    path: "/products",
    component: Products,
    name: "products",
    beforeEnter: requireAuth
  },
  {
    path: "/newproduct",
    component: ProductForm,
    name: "NewProduct",
    beforeEnter: requireAuth
  },
  { path: "/login", component: Login, name: "Login" },
  {
    path: "/changePassword",
    component: ChangePassword,
    name: "ChangePassword"
  },
  { path: "/", redirect: "/dashboard" },
  { path: "*", redirect: "/404" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

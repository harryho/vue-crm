const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/authentication/auth/LoginPage.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/authentication/auth/RegisterPage.vue')
    },
    {
      name: 'Not Found',
      path: '/notfound',
      component: () => import('@/views/notfound/NotFound.vue')
    },
    {
      name: 'Loading',
      path: '/loading',
      component: () => import('@/views/notfound/Loading.vue')
    }
  ]
};

export default PublicRoutes;

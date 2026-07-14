const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboards/Dashboard.vue')
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboards/Dashboard.vue')
    },
    {
      name: 'User',
      path: '/user',
      component: () => import('@/views/pages/UsersView.vue')
    },
    {
      name: 'Edit User',
      path: '/user/:id',
      component: () => import('@/views/pages/UserForm.vue')
    },

    {
      name: 'New User',
      path: '/user/new',
      component: () => import('@/views/pages/UserForm.vue')
    },
    {
      name: 'Product',
      path: '/product',
      component: () => import('@/views/pages/ProductView.vue')
    },
    {
      name: 'Edit Product',
      path: '/product/:id',
      component: () => import('@/views/pages/ProductForm.vue')
    },
    
    {
      name: 'New Product',
      path: '/product/new',
      component: () => import('@/views/pages/ProductForm.vue')
    },
    {
      name: 'Order',
      path: '/order',
      component: () => import('@/views/pages/OrderView.vue')
    },
    {
      name: 'Edit Order',
      path: '/order/:id',
      component: () => import('@/views/pages/OrderForm.vue')
    },
    
    {
      name: 'New Order',
      path: '/order/new',
      component: () => import('@/views/pages/OrderForm.vue')
    },
    {
      name: 'Blog',
      path: '/blog',
      component: () => import('@/views/pages/BlogView.vue')
    },
    {
      name: 'Error 404',
      path: '/error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
    // ,
    // {
    //   name: 'Tabler Icons',
    //   path: '/icons/tabler',
    //   component: () => import('@/views/utilities/icons/TablerIcons.vue')
    // },
    // {
    //   name: 'Material Icons',
    //   path: '/icons/material',
    //   component: () => import('@/views/utilities/icons/MaterialIcons.vue')
    // },
    // {
    //   name: 'Typography',
    //   path: '/utils/typography',
    //   component: () => import('@/views/utilities/typography/TypographyPage.vue')
    // },
    // {
    //   name: 'Shadows',
    //   path: '/utils/shadows',
    //   component: () => import('@/views/utilities/shadows/ShadowPage.vue')
    // },
    // {
    //   name: 'Colors',
    //   path: '/utils/colors',
    //   component: () => import('@/views/utilities/colors/ColorPage.vue')
    // },
  ]
};

export default MainRoutes;

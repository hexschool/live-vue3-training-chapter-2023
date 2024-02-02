import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/UserHome.vue'),
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('@/views/UserProducts.vue'),
      },
      {
        path: '/product/:id',
        name: '產品頁面',
        component: () => import('@/views/UserProduct.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('@/views/UserCart.vue'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('@/views/UserLogin.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/AdminDashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/AdminProducts.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/AdminOrders.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
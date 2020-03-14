import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      redirect: 'index',
      component: () => import('@/pages/home'),
      children: [{
          path: 'index',
          name: 'index',
          component: () => import('@/pages/index'),
        },
        {
          path: 'product/:id',
          name: 'product',
          component: () => import('@/pages/product'),
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: () => import('@/pages/detail'),
        },
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/cart'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/order/order'),
      children: [{
          path: 'list',
          name: 'order-list',
          component: () => import('@/pages/order/orderList'),
        },
        {
          path: 'comfirm',
          name: 'order-comfirm',
          component: () => import('@/pages/order/orderComfirm'),
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('@/pages/order/orderpay'),
        },
        {
          path: 'alipay',
          name: 'order-alipay',
          component: () => import('@/pages/order/alipay'),
        },
      ]
    },
  ]
})
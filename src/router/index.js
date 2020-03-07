import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/'
      name: 'home',
      component: () => import('@/pages/home'),
      children: [{
          path: '/index',
          name: 'index',
          component: () => import('@/pages/index'),
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('@/pages/product'),
        },
        {
          path: '/detail/:id',
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
    },
  ]
})
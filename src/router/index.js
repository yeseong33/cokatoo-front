import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/pages/Home')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../components/blocks/Signup')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/blocks/Login')
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('../components/blocks/Record')
    },
    {
      path: '/record/:id',
      name: 'recordDetail',
      component: () => import('../components/blocks/RecordDetail')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../components/blocks/Result')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../components/blocks/Loading')
    }

    // {
    //   path: '/',
    //   name: 'home',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

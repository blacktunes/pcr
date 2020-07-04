import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/list',
    component: () => import('../views/List.vue')
  },
  {
    path: '/edit',
    component: () => import('../views/Edit.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

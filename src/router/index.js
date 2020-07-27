import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import List from '../views/List.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router

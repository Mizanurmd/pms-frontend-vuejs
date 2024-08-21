import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import projectView from '../views/Projects/projectView'
import userView from '../views/userDetails/userView.vue'
import loginView from '../views/admin/loginView.vue'
import signupView from '../views/admin/signupView.vue'
import projectCreate from '@/views/Projects/projectCreate.vue'



const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: projectView
   
  },
  {
    path: '/userDetails',
    name: 'userDetails',
    component: userView
   
  },

  {
    path: '/',
    name: 'loginView',
    component: loginView
   
  },
  {
    path: '/signup',
    name: 'signupView',
    component: signupView
   
  },
  {
    path: '/create',
    name: 'projectCreate',
    component: projectCreate
   
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

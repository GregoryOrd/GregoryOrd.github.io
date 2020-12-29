import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
//   {
//     path: '/About',
//     name: 'About',
//     component: () => import('../views/About.vue')
//   },
//   {
//     path: '/TeacherDashboard/:SchoolName/:TeacherName',
//     name: 'TeacherDashboard',
//     component: () => import('../views/TeacherDashboard.vue')
//   },
//   {
//     path: '/StudentDashboard/:SchoolName/:TeacherName',
//     name: 'StudentDashboard',
//     component: () => import('../views/StudentDashboard.vue')
//   },
//   {
//     path: '/TeacherSignIn',
//     name: 'TeacherSignIn',
//     component: () => import('../views/TeacherSignIn.vue')
//   },
]

const router = new VueRouter({
  routes
})

export default router
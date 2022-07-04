import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UserInfo from '../views/UserInfoView.vue'
import AddUser from '../views/AddUserView.vue'
import UserList from '../views/UserListView.vue'
import UserUpdate from '../views/UpdateUser.vue'
import UserRecord from  '../views/UserRecordView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    meta: { requiresAuth: false },
    component: LoginView
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    meta: { requiresAuth: true },
    component: UserInfo
  },
  {
    path: '/adduser',
    name: 'adduser',
    meta: { requiresAuth: true },
    component: AddUser
  },
  {
    path: '/userlist',
    name: 'userlist',
    meta: { requiresAuth: true },
    component: UserList
  },
  {
    path: '/userupdate',
    name: 'userupdate',
    meta: { requiresAuth: true },
    component: UserUpdate
  },
  {
    path: '/userlogout',
    name: 'userlogout',
    meta: { requiresAuth: true },
    redirect: '/'
  },
  {
    path: '/userrecord/:account',
    name: 'userrecord',
    meta: { requiresAuth: true },
    component: UserRecord
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router

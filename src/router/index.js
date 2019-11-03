import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import ChatRoom from '@/views/ChatRoom'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Login
  },{
    path: '/chatRoom',
    name: 'ChatRoom',
    component: ChatRoom
  }
]

const router = new VueRouter({
  routes
})

export default router

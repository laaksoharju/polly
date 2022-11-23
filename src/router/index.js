import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },
  {
    path: '/hostorjoin',
    name: 'HostOrJoinView',
    component: () => import(/* webpackChunkName: "about" */ '../views/HostOrJoinView.vue')
  },
  {
    path: '/gamemode',
    name: 'ChooseGameModeView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChooseGameModeView.vue')
  },
    {
    path: '/poll/:id',
    name: 'PollView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PollView.vue')
  },
  {
    path: '/create/:lang',
    name: 'CreateView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateView.vue')
  },
  {
    path: '/result/:id',
    name: 'ResultView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue')
  },
  {
    path: '/clientjoingame',
    name: "ClientJoinGameView",
    component: () => import(/* webpackChunkName: "about" */ '../views/ClientJoinGameView.vue')
  },
  {
    path: '/hostpregame',
    name: "HostPreGameView",
    component: () => import(/* webpackChunkName: "about" */ '../views/HostPreGameView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

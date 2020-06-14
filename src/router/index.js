import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import HistoryPage from '@/pages/HistoryPage'

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/history',
    component: HistoryPage
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: 'history'
});

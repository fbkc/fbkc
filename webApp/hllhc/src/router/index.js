import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import MainContainer from '@/components/Layout/MainContainer'
import loginPage from '@/pages/loginPage'
Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'login',
    component: index
  },
  {
    path: '/main',
    name: 'main',
    desc: '用户访问页',
    component: MainContainer,
    children: [
      {
        path: 'login',
        name: 'login',
        desc: '登陆',
        component: loginPage
      }
    ]
  }
]
export default new Router({
  routes: routes
})

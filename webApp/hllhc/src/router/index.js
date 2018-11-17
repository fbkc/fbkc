import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import MainContainer from '@/components/Layout/MainContainer'
import AdminContainer from '@/pages/admin/components/AdminContainer'
import adminIndex from '@/pages/admin/adminIndex'
import userManage from '@/pages/admin/userManage'
import loginPage from '@/pages/loginPage'
Vue.use(Router)
let routes = [
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
      },
      {
        path: 'index',
        name: 'mainIndex',
        desc: '用户首页',
        component: index,
        meta: {
          Auth: true
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    desc: '平台管理',
    component: AdminContainer,
    children: [
      {
        path: 'index',
        name: 'adminIndex',
        desc: '平台管理-首页',
        component: adminIndex
      },
      {
        path: 'userManage',
        name: 'adminUserManage',
        desc: '平台管理-用户管理',
        component: userManage
      }
    ]
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.Auth) {
    const href = window.location.href
    if (href.indexOf('login') > 0 || to.path.indexOf('login') > 0) {
      next()
      return
    } else if (!sessionStorage.getItem('atk') && to.path.indexOf('login') < 0) {
      next({name: 'login'})
      return
    } else if (href.indexOf('admin') > 0) {
      if (sessionStorage.getItem('account') && sessionStorage.getItem('account').isAdmin) {
        next()
      } else {
        next({name: 'login'})
        return
      }
    }
    next()
  } else {
    next()
  }
})
export default router

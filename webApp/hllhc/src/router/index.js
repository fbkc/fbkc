import Vue from 'vue'
import Router from 'vue-router'
import flourMsg from '@/pages/flourMsg'
import handPublish from '@/pages/handPublish'
import headerManage from '@/pages/headerManage'
import imageList from '@/pages/imageList'
import index from '@/pages/index'
import keyWordList from '@/pages/keyWordList'
import modelManage from '@/pages/modelManage'
import orgInfo from '@/pages/orgInfo'
import publishManage from '@/pages/publishManage'
import regionList from '@/pages/regionList'
import stageList from '@/pages/stageList'
import suffixList from '@/pages/suffixList'
import MainContainer from '@/components/Layout/MainContainer'
import AdminContainer from '@/pages/admin/components/AdminContainer'
import adminIndex from '@/pages/admin/adminIndex'
import userManage from '@/pages/admin/userManage'
import gradeManage from '@/pages/admin/gradeManage'
import domainNameManage from '@/pages/admin/domainNameManage'
import columnsManage from '@/pages/admin/columnsManage'
import loginPage from '@/pages/loginPage'
Vue.use(Router)
let routes = [
  {
    path: '/login',
    name: 'login',
    desc: '登陆',
    component: loginPage
  },
  {
    path: '/main',
    name: 'main',
    desc: '用户访问页',
    component: MainContainer,
    children: [
      {
        path: 'index',
        name: 'mainIndex',
        desc: '用户首页',
        component: index,
        meta: {
          Auth: true
        }
      },
      {
        path: 'flourMsg',
        name: 'flourMsg',
        desc: '轮播图集',
        component: flourMsg,
        meta: {
          Auth: true
        }
      },
      {
        path: 'handPublish',
        name: 'handPublish',
        desc: '手动发布',
        component: handPublish,
        meta: {
          Auth: true
        }
      },
      {
        path: 'headerManage',
        name: 'headerManage',
        desc: '标题设置',
        component: headerManage,
        meta: {
          Auth: true
        }
      },
      {
        path: 'imageList',
        name: 'imageList',
        desc: '图片列表',
        component: imageList,
        meta: {
          Auth: true
        }
      },
      {
        path: 'keyWordList',
        name: 'keyWordList',
        desc: '关键词列表',
        component: keyWordList,
        meta: {
          Auth: true
        }
      },
      {
        path: 'modelManage',
        name: 'modelManage',
        desc: '模板设置',
        component: modelManage,
        meta: {
          Auth: true
        }
      },
      {
        path: 'orgInfo',
        name: 'orgInfo',
        desc: '公司信息',
        component: orgInfo,
        meta: {
          Auth: true
        }
      },
      {
        path: 'publishManage',
        name: 'publishManage',
        desc: '发布设置',
        component: publishManage,
        meta: {
          Auth: true
        }
      },
      {
        path: 'regionList',
        name: 'regionList',
        desc: '地区列表',
        component: regionList,
        meta: {
          Auth: true
        }
      },
      {
        path: 'stageList',
        name: 'stageList',
        desc: '段落列表',
        component: stageList,
        meta: {
          Auth: true
        }
      },
      {
        path: 'suffixList',
        name: 'suffixList',
        desc: '后缀列表',
        component: suffixList,
        meta: {
          Auth: true
        }
      },
      {
        path: 'index',
        name: 'mainIndex',
        desc: '用户首页',
        component: index,
        meta: {
          Auth: true
        }
      },
      {
        path: 'index',
        name: 'mainIndex',
        desc: '用户首页',
        component: index,
        meta: {
          Auth: true
        }
      },
      {
        path: 'index',
        name: 'mainIndex',
        desc: '用户首页',
        component: index,
        meta: {
          Auth: true
        }
      },

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
      },
      {
        path: 'gradeManage',
        name: 'adminGradeManage',
        desc: '平台管理-会员等级',
        component: gradeManage
      },
      {
        path: 'domainNameManage',
        name: 'adminDomainNameManage',
        desc: '平台管理-域名管理',
        component: domainNameManage
      },
      {
        path: 'columnsManage',
        name: 'adminColumnsManage',
        desc: '平台管理-域名管理',
        component: columnsManage
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

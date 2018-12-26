import Axios from 'axios'

export function urlSearch () {
  const result = {}
  let name, value
  let str = location.href // 取得整个地址栏
  let num = str.indexOf('?')
  str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]

  const arr = str.split('&') // 各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      result[name] = value
    }
  }
  return result
}

function initAccessToken (accesstoken) {
  if (accesstoken) {
    sessionStorage.setItem('atk', accesstoken)
  }
}

// import config from './devconfig.js'
/**
 * vue 安装 axios 配置方法
 * 调用Vue.use 可执行该方法
 * 目的是将axios 挂载到全局的实例中
 */
function install (Vue, router) {
  initAccessToken(urlSearch().atk)

  const axios = Axios.create({
    //  baseURL: config.baseURL
    baseURL: ''
  })
  axios.defaults.withCredentials = true
  Vue.prototype.$axios = axios
  interceptors(axios, Vue, router)
}

/**
 * 全局返回数据拦截
 */
function interceptors (axios, Vue, router) {
  let _this = this
  axios.interceptors.request.use(function (config) {
    // guest请求无需进行身份验证
    if (config.guest === true) {
    } else {
      if (sessionStorage.getItem('atk')) {
        config.headers['Authorization'] = 'bearer ' + sessionStorage.getItem('atk')
      }
    }
    // 修改请求设置
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

  // 截获返回数据，对请求状态进行统一处理
  axios.interceptors.response.use(function (response) {
    return response
    // 相应设置
  }, function (error) {
    if (error.response.status === 401) {
      router.push({path: '/login'})
    }
    return Promise.reject(error.response)
  })
}

export {
  install,
  interceptors
}

const loginConfig = {
  clientId: 'e3TgENmkcn2fLYXdC19v6rNyNAL0O22c',
  clientSecret: 'wfdEgj90cMDdz8lOeOvi9ojKSIO4qboS'
}
let urlPrefix = '/' + window.location.href.split('/')[3].split('?')[0]
if (process.env.NODE_ENV !== 'development') {
  urlPrefix += '/#'
}
let loginActions = {
  userLogin (context, params) {
    let _this = this
    let vm = this._vm
    return vm.$axios.get(`/api/Login.ashx?action=login&username=${params.username}&password=${params.password}`, {}, {
      guest: true,
      params: {
        redirect_uri: urlPrefix + '/main/login'
      }
    }).then(resp => {
      let data = resp.data
      if (data.code === 1 && data.detail.userCookie) {
        sessionStorage.setItem('atk', resp.data.detail.userCookie)
        let toPath = ''
        if (data.detail.cmUser.userType === 1) {
          toPath = '/#/admin/userManage'
        } else {
          toPath = '/#/main/index'
        }
        window.location.href = window.location.origin + toPath
      } else {
        this.$message.error(data.msg)
      }
    })
  },
  getAccessToken (context, params) {
    return this._vm.$axios.post('/uaa/oauth/token', {}, {
        params: {
        grant_type: 'authorization_code',
        redirect_uri: location.origin + location.pathname,
        client_id: loginConfig.clientId,
        client_secret: loginConfig.clientSecret,
        state: sessionStorage.getItem('uaastate'),
        code: params.code
        }
    }).then(res => {
        sessionStorage.setItem('atk', res.data.access_token)
    }).catch(() => {
        this._vm.$message.error('获取token失败')
    })
  },
  userLogout (context, params) {
    let vm = this._vm
    return vm.$axios.get(`/api/UserHandler.ashx?action=logout`)
  }
}

export default loginActions
  
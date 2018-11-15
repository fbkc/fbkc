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
    let vm = this._vm
    return vm.$axios.post(`/api/login?username=${params.username}&password=${params.password}`, {}, {
        guest: true,
        params: {
        redirect_uri: urlPrefix + '/loginInterface'
        }
    }).then(resp => {
        let randomState = sessionStorage.getItem('uaastate') || Math.floor(Math.random() * 10000)
        sessionStorage.setItem('uaastate', randomState)
        window.location.href = `/uaa/oauth/authorize?response_type=code&client_id=${loginConfig.clientId}&scope=openid&state=${randomState}&redirect_uri=${window.location.origin}${urlPrefix}/loginInterface`
        }).catch(err => {
        let errInfo = err.headers.message ? decodeURI(err.headers.message) : '登录失败'
        vm.$message({
        type: 'error',
        message: errInfo
        })
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
    }
}

export default loginActions
  
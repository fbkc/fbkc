let urlPrefix = '/' + window.location.href.split('/')[3].split('?')[0]
if (process.env.NODE_ENV !== 'development') {
  urlPrefix += '/#'
}
let adminActions = {
  getUserList (context, params) {
      let vm = this._vm
      return vm.$axios.get(`/api/UserHandler.ashx?action=getuserlist`, {}, {
        guest: true
    })
  },
  addUser (context, params) {
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=addUser`, params,{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  }
}
export default adminActions
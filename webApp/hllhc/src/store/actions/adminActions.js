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
    return vm.$axios.post(`/api/UserHandler.ashx?action=saveuser`, params,{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  },
  getRealmList (context, params) { // 获取域名列表
    let vm = this._vm
    return vm.$axios.get(`/api/UserHandler.ashx?action=getrealmlist`)
  },
  getGradeList (context, params) { // 获取会员等级列表
    let vm = this._vm
    return vm.$axios.get(`/api/UserHandler.ashx?action=getgradelist`)
  },
  getColumnList(context, params) { // 获取栏目列表
    let vm = this._vm
    return vm.$axios.get(`/api/UserHandler.ashx?action=getcolumnlist`)
  },
  saveGrade (context, params) { // 新增（编辑）栏目
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=savegrade`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  }
}
export default adminActions
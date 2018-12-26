let urlPrefix = '/' + window.location.href.split('/')[3].split('?')[0]
if (process.env.NODE_ENV !== 'development') {
  urlPrefix += '/#'
}
let adminActions = {
  getUserList (context, params) {
    let vm = this._vm
    return vm.$axios.get(`/api/UserHandler.ashx?action=getuserlist`, {params})
  },
  addUser (context, params) {
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=saveuser`, params,{headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  },
  getDomainList (context, params) { // 获取域名列表
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
  },
  saveDomain (context, params) { // 新增（编辑）域名
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=saverealm`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  },
  saveColumn (context, params) { // 新增 （编辑）栏目
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=savecolumn`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  },
  deleteUser (context, params) { // 删除用户
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=deluser&Id=`+ params.userId)
  },
  deleteColumn (context, params) { // 删除栏目
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=delcolumn&Id=`+ params.columnId)
  },
  deleteDomain (context, params) { // 删除域名
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=delrealm&Id=`+ params.domainId)
  },
  deleteGrade (context, params) { // 删除会员等级
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=delgrade&Id=`+ params.gradeId)
  },
  tailwordList (context, params) { // 获取长尾词词库列表
    let vm = this._vm
    return vm.$axios.get(`/api/UserHandler.ashx?action=gettailwordlist`)
  },
  saveTail (context, params) { // 保存长尾词
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=savetailword`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
  },
  delTail (context, params) { // 删除长尾词
    let vm = this._vm
    return vm.$axios.post(`/api/UserHandler.ashx?action=deltailword&Id=`+ params.Id)
  }
}
export default adminActions
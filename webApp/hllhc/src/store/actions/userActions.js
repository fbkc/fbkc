let urlPrefix = '/' + window.location.href.split('/')[3].split('?')[0]
if (process.env.NODE_ENV !== 'development') {
  urlPrefix += '/#'
}
let userActions = {
    uploadFile (context, params) { // 上传图片
        let vm = this._vm
        let headers = {
          'Authorization': 'bearer ' + sessionStorage.getItem('atk'),
          'Content-Type': 'multipart/form-data'
        }
        return vm.$axios.post(`/api/informationHandler.ashx?action=uploadpic&productId=` + params.productId, params.fileData, {headers: headers})
    },
    getPictureList(context, params) { // 获取图片列表
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=getpiclist&productId=` + params.productId)
    },
    removeImage (context, params) { // 删除图片
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=delpic&Id=` + params.Id + '&imageURL=' + params.imageURL)
    },
    getStageList (context, params) { // 获取段落列表
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=getparalist`, {params})
    },
    oneKeyDeal (context, params) { // 一键整理段落
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=onekeydealpara`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    saveStageList (context, params) { // 保存段落
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=savepara`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    removeStage (context, params) { // 删除段落
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=delpara&Id=` + params.Id)
    },
    removeStages (context, params) { // 删除多个段落
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=delparas&Ids=` + params.Ids)
    },
    oneKeyGather (context, params) { // 一键采集段落
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=onekeygather`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    getStageDetailByUrl (context, params) {
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=preview`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    getStageDetailByUrls (context, params) {
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=onekeyedit`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    getPublicSuffixList (context, params) { // 获取系统长尾词库
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=getpublictailwordlist`)
    },
    getPrivateSuffixList (context, params) { // 获取用户长尾词
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=getwordslist&wordType=TAILWORD&productId=` + params.productId)
    },
    updatePrivateSuffixList(context, params) { // 更新用户长尾词
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=savewords`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    getPrivateKeyWordList(context, params) { // 获取用户关键词
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=getwordslist&wordType=KEYWORD&productId=` + params.productId)
    },
    updatePrivatekeyWordList(context, params) { // 更新用户关键词
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=savewords`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    gatherKeyWord(context, params) { // 一键采集关键词
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=digwords&word=` + params.word)
    },
    getproductlist(context, params) { // 获取产品列表
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=getproductlist`)
    },
    addNewProduct (context, params) { // 新建产品
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=saveproduct`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    saveProduct(context, params) { // 更新产品
      let vm = this._vm
      return vm.$axios.post(`/api/informationHandler.ashx?action=saveproduct`, params, {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}})
    },
    getProductById(context, params) { // 根据id获取产品详细信息
      let vm = this._vm
      return vm.$axios.get(`/api/informationHandler.ashx?action=getproductbyId&productId=` + params.productId)
    }
}
export default userActions
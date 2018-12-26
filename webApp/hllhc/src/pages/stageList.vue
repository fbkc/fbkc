<template>
<!-- 段落列表 -->
<div>
  <div class="upload-buttons">
    <el-button type="primary" @click="addStageDialogVisible=true">添加段落</el-button>
    <el-button type="primary" @click="oneKeyGatherDialogVisible=true">采集助手</el-button>
    <el-button type="danger" @click="removes">删除段落</el-button>
  </div>
  <div class="stage-list">
    <el-table
    :data="stageList"
    style="width: 100%"
    @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
        label="序号"
        width="60px"
        type="index">
        </el-table-column>
        <el-table-column
            label="段落编号"
            width="160">
            <template slot-scope="scope">
              {{scope.row.paraId}}
            </template>
        </el-table-column>
        <el-table-column
            label="段落内容"
            width="320">
            <template slot-scope="scope">
              <el-popover
                placement="right"
                title="段落详细内容"
                width="400"
                trigger="hover"
                :content="scope.row.paraCotent">
                <span slot="reference">
                  {{scope.row.paraCotent.substring(0, 40) + '......'}}
                </span>
              </el-popover>
            </template>
        </el-table-column>
        <el-table-column
            label="添加时间">
            <template slot-scope="scope">
              {{scope.row.addTime}}
            </template>
        </el-table-column>
        <el-table-column
            label="质量评估"
            width="180">
            <template slot-scope="scope">
              {{scope.row.usedCount > 150 ? '极差' : (scope.row.usedCount > 100 ? '差' : (scope.row.usedCount > 50 ? '中等' : '优质')) }}
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="200px">
            <template slot-scope="scope">
                <span>
                  <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row.Id)">删除</el-button>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="list-pagination"
    @current-change="init"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next"
    :total="total">
    </el-pagination>
  </div>
  <el-dialog class="add-stage-dialog" append-to-body title="添加段落" :visible.sync="addStageDialogVisible">
    <el-form :model="form">
      <div class="add-stage-dialog-top-button">
        <el-form-item label="被替换的词语:" :label-width="formLabelWidth">
          <el-input v-model="form.orginWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="替换的词语:" :label-width="formLabelWidth">
          <el-input v-model="form.replaceWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="replace">替换</el-button>
        </el-form-item>
      </div>
      <el-button @click="oneKeyDeal">一键整理</el-button>
      <el-input type="textarea"
        :rows="10"
        placeholder="请输入段落内容"
        v-model="textarea"
        @change="hasoneKeyDeal=false"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <div class="total-word"><span>文本字数: {{textarea.length}}</span></div>
      <el-button @click="cancelAddStage">取 消</el-button>
      <el-button type="primary" @click="saveStage">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog class="one-key-gather-dialog" append-to-body title="一键采集" :visible.sync="oneKeyGatherDialogVisible">
    <el-form :model="gatherForm">
      <div class="one-key-gather-buttons">
        <el-form-item label="网址:" label-width="53px">
          <el-input v-model="gatherForm.gatherUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="width:20%;">
          <el-button @click="oneKeyGather">一键采集</el-button>
        </el-form-item>
      </div>
      <el-button @click="oneKeyEdit">一键编辑</el-button>
      <el-table class="gather-data-list" :data="gatherList">
        <el-table-column
        label="序号"
        width="60px"
        type="index">
        </el-table-column>
        <el-table-column
            label="文章标题"
            width="420">
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
        </el-table-column>
        <el-table-column
            label="处理状态"
            width="100">
            <template slot-scope="scope">
              {{scope.row.isdeal ? '已处理' : '待处理'}}
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.isdeal" @click="preview(scope.$index, scope.row.url)">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      stageList: [],
      addStageDialogVisible: false,
      oneKeyGatherDialogVisible: false,
      gatherForm: {
        gatherUrl: ''
      },
      gatherList: [],
      form: {
        orginWord: '',
        replaceWord: ''
      },
      textarea: '',
      formLabelWidth: '100px',
      hasoneKeyDeal: false,
      strList: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      regx: '(http|https)://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?',
      currentgatherListIndex: null,
      currentgatherEditLength: 0,
      productId: this.$route.params.goodsId
    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      this.getStageList()
    },
    getStageList () {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        productId: this.productId
      }
      this.$store.dispatch('getStageList', params).then(res => {
        if (res.data.code === 1) {
          this.stageList = res.data.detail.paraList
          this.total = res.data.detail.total
        } else {
          this.$message.error('获取段落失败！')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    oneKeyDeal () {
      if (this.textarea.length > 200) {
        let params = {
          params: JSON.stringify(this.textarea)
        }
        this.$store.dispatch('oneKeyDeal', qs.stringify(params)).then(res => {
          if (res.data.code === 1) {
            this.strList = res.data.detail.paralist
            if (this.strList.length) {
              this.hasoneKeyDeal = true
              let str = ''
              this.strList.map((item, index) => {
                str = str + '段落' + (index+1) + ': ' + item.replace(/\n/g,'').replace(/\\n/g, '').replace(/\\/g, '') + ' \n '
              })
              this.textarea = str
              this.$message.success('整理成功！')
            } else {
              this.$message.error('整理后的字数不足, 未生成段落！')
            }
          } else {
            this.$message.error('一键整理失败！')
          }
        })
      } else {
        this.$message.warning('请输入至少200字内容！')
      }
    },
    replace () {
      let myStr = this.form.replaceWord
      let rex = new RegExp(this.form.orginWord, 'g')
      this.textarea = this.textarea.replace(rex, myStr)
      this.hasoneKeyDeal = false
    },
    cancelAddStage () {
      this.addStageDialogVisible = false
      this.textarea = ''
      this.hasoneKeyDeal = false
    },
    saveStage () {
      if (this.hasoneKeyDeal) {
        let paragrapList = []
        paragrapList = this.strList.map(item => {
          return {
            Id: 0,
            paraId: 0,
            paraCotent: item.replace(/\n/g,'').replace(/\\n/g, '').replace(/\\/g, ''),
            usedCount: 0,
            addTime: '',
            userId: 0,
            productId: this.productId
          }
        })
        let params = {
          params: JSON.stringify(paragrapList)
        }
        this.$store.dispatch('saveStageList', qs.stringify(params)).then(res => {
          if (res.data.code === 1) {
            this.addStageDialogVisible = false
            this.textarea = ''
            this.hasoneKeyDeal = false
            if (this.currentgatherListIndex !== null) {
              this.gatherList[this.currentgatherListIndex].isdeal = true
              this.currentgatherListIndex = null
            }
            if (this.currentgatherEditLength) {
              this.gatherList.map(item => {item.isdeal = true})
              this.currentgatherEditLength = 0
            }
            this.$message.success('保存成功！')
            this.init()
          } else {
            this.$message.error('保存失败！')
          }
        }).catch(err => {console.log(err)})
      } else {
        this.$message.warning('请进行一键整理后保存！')
      }
    },
    remove (index, Id) {
      if (Id) {
        let params = {
          Id: Id
        }
        this.$store.dispatch('removeStage', params).then(res => {
          if (res.data.code ===1) {
            this.stageList.splice(index, 1)
            this.$message.success('删除成功！')
          } else {
            this.$message.error('删除失败！')
          }
        })
      }
    },
    removes () {
      if (this.multipleSelection.length) {
        let params = {
          Ids: this.multipleSelection.map(item => { return item.Id}).join(',')
        }
        this.$store.dispatch('removeStages', params).then (res => {
          if (res.data.code ===1) {
            this.getStageList()
            this.$message.success('删除成功！')
            this.multipleSelection = []
          } else {
            this.$message.error('删除失败！')
          }
        })
      } else {
        this.$message.warning('请至少勾选一项！')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    oneKeyGather () {
      let value = this.gatherForm.gatherUrl
      if (value) {
        var reg = new RegExp(this.regx)
        if (value.match(reg)) {
          let params = {
            params: value
          }
          this.$store.dispatch('oneKeyGather', qs.stringify(params)).then(res => {
            debugger
            if(res.data.code === 1) {
              this.gatherList = res.data.detail.paraList
            } else {
              this.$message.error('一键采集失败！')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('一键采集失败！')
          })
        } else {
          this.$message.warning('请输入正确的网址！')
        }
      } else {
        this.$message.warning('请输入网址！')
      }
    },
    preview (index, url) {
      let _this = this
      let params = {
        params: url
      }
      this.$store.dispatch('getStageDetailByUrl', qs.stringify(params)).then(res => {
        if (res.data.code ===1) {
          let value = res.data.detail.para
          _this.currentgatherListIndex = index
          _this.textarea = value
          _this.addStageDialogVisible = true
        } else {
          _this.$message.error('预览失败！')
        }
      })
    },
    oneKeyEdit () {
      let _this = this
      let list = this.gatherList.filter(item => {
        return !item.isdeal
      })
      let params = {
        params: JSON.stringify(list.map(item => {return item.url}))
      }
      this.$store.dispatch('getStageDetailByUrls', qs.stringify(params)).then(res => {
        if (res.data.code ===1) {
          let value = res.data.detail.paras
          _this.currentgatherEditLength = list.length
          _this.textarea = value
          _this.addStageDialogVisible = true
        } else {
          this.$message.error('一键编辑失败！')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.add-stage-dialog{
  .el-dialog{
    width: 60%;
  }
  .el-form{
    .add-stage-dialog-top-button{
      width: 80%;
      display: inline-block;
    }
    .el-form-item{
      display: inline-block !important;
      width: 32%;
    }
  }
  .dialog-footer{
    .total-word{
      display: inline;
      float: left;
      position: relative;
      top: -30px;
      font-size: 12px;
    }
  }
}
.list-pagination{
  margin-bottom: 48px;
  position: relative;
  float: right;
  right: 24px;
  top: 12px;
}
.one-key-gather-dialog{
  .el-dialog{
    width: 60%;
  }
  .el-form{
    .gather-data-list{
      width: 100%;
      height:300px;
      overflow-y: auto;
    }
    .one-key-gather-buttons{
      width: 80%;
      display: inline-block;
    }
    .el-form-item{
      display: inline-block !important;
      width: 60%;
    }
  }
}
</style>

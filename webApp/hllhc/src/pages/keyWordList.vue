<template>
<!-- 关键词列表 -->
<div>
  <div class="keyWord-buttons">
    <el-button @click="GatherDialogVisible=true">采集</el-button>
    <el-button type="primary" @click="addOne">添加</el-button>
    <el-button type="primary" @click="remove">删除</el-button>
  </div>
  <div class="keyWord-list">
      <div class="main-content">
        <el-table
            :data="privateList"
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
                    label="关键词">
                    <template slot-scope="scope">
                      <el-input v-model="privateList[scope.$index]" :disabled="scope.$index !== currentEditIndex"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200px">
                    <template slot-scope="scope">
                        <span v-if="scope.$index !== currentEditIndex">
                             <el-button size="mini" @click="edit(scope.$index)">编辑</el-button>
                        </span>
                        <span v-if="scope.$index === currentEditIndex">
                            <el-button size="mini" @click="currentEditIndex = ''">取消</el-button>
                            <el-button size="mini" @click="save(scope.$index, scope.row)" v-loading="saveLoading">确定</el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
      </div>
  </div>
  <el-dialog class="add-stage-dialog" append-to-body title="关键词采集" :visible.sync="GatherDialogVisible">
    <div>
      <el-input v-model="gatherValue" style="width: 80%;"></el-input>
      <el-button @click="gatherKeyWord">采集</el-button>
    </div>
    <div>
      <el-table
      class="add-stage-dialog-keyWord-list"
      :data="gatherList"
      style="width: 100%">
        <el-table-column
            label="序号"
            width="60px"
            type="index">
        </el-table-column>
        <el-table-column
            label="关键词">
            <template slot-scope="scope">
              {{scope.row}}
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="addKeyWord(scope.row)" size="mini">添加</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      privateData: {},
      GatherDialogVisible: false,
      multipleSelection: [],
      gatherValue: '',
      gatherList: [],
      privateList: [],
      currentEditIndex: '',
      saveLoading: false,
      productId: this.$route.params.goodsId
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
  },
  methods: {
    init () {
      this.getPrivateKeyWordList()
    },
    getPrivateKeyWordList () {
      let _this = this
      let params = {
        productId: this.productId
      }
      _this.$store.dispatch('getPrivateKeyWordList', params).then(res => {
        if (res.data.code === 1) {
          _this.privateData = res.data.detail.wordsList
          _this.privateList = this.privateData.words ? this.privateData.words.split(',') : []
          if (!this.privateData.words) {
            _this.currentEditIndex = 0
          }
        } else {
          _this.$message.error('获取数据失败！')
        }
      })
    },
    cancel () {
      this.GatherDialogVisible = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    remove () {
      if (this.multipleSelection.length) {
        let wordsList = this.privateData.words.split(',')
        this.multipleSelection.forEach(item => {
          let index = wordsList.indexOf(item)
          if (index !== -1) {
            wordsList.splice(index, 1)
          }
        })
        let words = wordsList.join(',')
        let paramsData = {...this.privateData}
        paramsData.words = words
        let params = {
          params: JSON.stringify(paramsData)
        }
        this.$store.dispatch('updatePrivatekeyWordList', qs.stringify(params)).then(res => {
          if (res.data.code === 1) {
            this.$message.success('删除成功！')
            this.init()
          } else {
            this.$message.error('删除失败！')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('删除失败！')
        })
      } else {
        this.$message.warning('请至少勾选一项！')
      }
    },
    gatherKeyWord () {
      let params = {
        word: this.gatherValue
      }
      this.$store.dispatch('gatherKeyWord', params).then(res => {
        if (res.data.code === 1) {
          this.gatherList = res.data.detail.wordsList
        } else {
          this.$message.error('采集失败！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('采集失败！')
      })
    },
    addKeyWord(value) {
      debugger
    },
    edit(index) {
      this.currentEditIndex = index
    },
    addOne () {
      this.privateList.unshift('')
      this.currentEditIndex = 0
    },
    save () {
      let paramsData = {...this.privateData}
      paramsData.words = this.privateList.join(',')
      let params = {
        params: JSON.stringify(paramsData)
      }
      this.$store.dispatch('updatePrivateSuffixList', qs.stringify(params)).then(res => {
        if (res.data.code === 1) {
          this.$message.success('保存成功！')
          this.currentEditIndex = ''
          this.init()
          this.editDialogVisible = false
        } else {
          this.$message.error('保存失败！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('保存失败！')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.keyWord-buttons{

}
.keyWord-list{

}
.add-stage-dialog{
  .add-stage-dialog-keyWord-list{
    height: 320px;
    overflow-y: auto;
  }
}
</style>

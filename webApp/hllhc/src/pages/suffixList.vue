<template>
<!-- 长尾列表 -->
<div>
  <div class="suffix-buttons">
    <el-button type="primary" @click="editDialogVisible=true">编辑</el-button>
    <el-button type="primary" @click="remove">删除</el-button>
  </div>
  <div class="suffix-list">
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
                    label="长尾词">
                    <template slot-scope="scope">
                      {{scope.row}}
                    </template>
                </el-table-column>
            </el-table>
      </div>
  </div>
  <el-dialog class="add-stage-dialog" append-to-body title="编辑词库" :visible.sync="editDialogVisible">
    <div>
      <el-button @click="importPublicSuffixList">导入系统库</el-button>
      <el-button @click="addSuffixWords">添加</el-button>
    </div>
    <div>
      <el-table
      class="add-stage-dialog-suffix-list"
      :data="editDialogData.privateWordsList"
      style="width: 100%">
        <el-table-column
            label="序号"
            width="60px"
            type="index">
        </el-table-column>
        <el-table-column
            label="长尾词">
            <template slot-scope="scope">
              <el-input v-model="editDialogData.privateWordsList[scope.$index]"></el-input>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
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
      publicList: [],
      editDialogVisible: false,
      leftList: [],
      rightList: [],
      multipleSelection: [],
      editDialogData: {
        privateWordsList: []
      },
      productId: this.$route.params.goodsId
    }
  },
  mounted: function () {
    this.init()
  },
  computed: {
    privateList: function() {
      return this.privateData.words ? this.privateData.words.split(',') : []
    }
  },
  methods: {
    init () {
      this.getPrivateSuffixList()
      this.getPublicSuffixList()
    },
    getPrivateSuffixList () {
      let _this = this
      let params = {
        productId: this.productId
      }
      _this.$store.dispatch('getPrivateSuffixList', params).then(res => {
        if (res.data.code === 1) {
          _this.privateData = res.data.detail.wordsList
          _this.editDialogData.privateWordsList = res.data.detail.wordsList.words ? res.data.detail.wordsList.words.split(',') : []
        } else {
          _this.$message.error('获取数据失败！')
        }
      })
    },
    getPublicSuffixList () {
      this.$store.dispatch('getPublicSuffixList').then(res => {
        if (res.data.code === 1) {
          this.publicList = res.data.detail.tailwordList
        } else {
          this.$message.error('获取数据失败！')
        }
      })
    },
    cancel () {
      this.editDialogVisible = false
    },
    save () {
      if (this.editDialogData.privateWordsList.indexOf('') !== -1) {
        this.$message.warning('长尾词不能为空！')
      } else {
        let paramsData = {...this.privateData}
        paramsData.words = this.editDialogData.privateWordsList.join(',')
        let params = {
          params: JSON.stringify(paramsData)
        }
        this.$store.dispatch('updatePrivateSuffixList', qs.stringify(params)).then(res => {
          if (res.data.code === 1) {
            this.$message.success('保存成功！')
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
        this.$store.dispatch('updatePrivateSuffixList', qs.stringify(params)).then(res => {
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
    importPublicSuffixList () {
      let addpublicWords = this.publicList.filter(item => {return this.editDialogData.privateWordsList.indexOf(item.tailword) === -1}).map(item => {
        return item.tailword
      })
      let addWords = ','
      this.editDialogData.privateWordsList = addpublicWords.concat(this.editDialogData.privateWordsList)
    },
    addSuffixWords () {
      this.editDialogData.privateWordsList.unshift('')
    }
  }
}
</script>
<style lang="less" scoped>
.suffix-buttons{

}
.suffix-list{

}
.add-stage-dialog{
  .add-stage-dialog-suffix-list{
    height: 320px;
    overflow-y: auto;
  }
}
</style>

<template>
    <div>
        <div class="user-domain-buttons">
            <el-button type="primary" @click="addDomain">添加</el-button>
        </div>
        <div class="user-domain-list">
            <el-table
            :data="list"
            style="width: 100%">
                <el-table-column
                label="序号"
                width="60px"
                type="index">
                </el-table-column>
                <el-table-column
                    label="域名名称">
                    <template slot-scope="scope">
                        <el-input :disabled="!scope.row.needSave" v-model="scope.row.realmName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="链接">
                    <template slot-scope="scope">
                        <el-input :disabled="!scope.row.needSave" v-model="scope.row.realmAddress"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="可用">
                    <template slot-scope="scope">
                        <el-switch
                        :disabled="!scope.row.needSave"
                        v-model="scope.row.isUseing"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="true"
                        :inactive-value="false">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="200px">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.needSave">
                             <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                             <el-button size="mini" type="danger" @click="remove(scope.$index, scope.row.Id)">删除</el-button>
                        </span>
                        <span v-if="scope.row.needSave">
                            <el-button size="mini" @click="cancel(scope.$index, scope.row)">取消</el-button>
                            <el-button size="mini" @click="save(scope.$index, scope.row)" v-loading="saveLoading">保存</el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            list: [],
            saveLoading: false,
            currentEditData: {}
        }
    },
    methods: {
        getDomainList () {
            let _this = this
            this.$store.dispatch('getDomainList').then(resp => {
                if (resp.data.code === '1') {
                    _this.list = resp.data.detail.realmList.map(item => {
                        item.needSave = false
                        return item
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        addDomain () {
            let item = {
                Id: 0,
                realmName: '',
                realmAddress: '',
                isUseing: true,
                needSave: true
            }
            this.list.unshift(item)
            this.currentEditData = item
        },
        edit(data) {
            this.currentEditData = {...data}
            data.needSave = true
        },
        save (index, data) {
            let item = {...data}
            this.saveLoading = true
            delete item.needSave
            let params = {
                params: JSON.stringify(item)
            }
            this.$store.dispatch('saveDomain', qs.stringify(params)).then (res => {
                this.saveLoading = false
                this.list[index].needSave = false
                if (res.data.code === '1') {
                    this.$message.success('保存成功！')
                } else {
                    this.$message.error('添加失败！')
                }
            })
        },
        cancel(index, data) {
            if (data.Id === 0) {
                this.list.splice(index, 1)
            } else {
                this.list[index].needSave = false
                this.list[index] = this.currentEditData
            }
        },
        remove(index, Id) {
          let params = {
              domainId: Id
          }
          this.$store.dispatch('deleteDomain', params).then(res => {
              if (res.data.code === '1') {
                  this.list.splice(index, 1)
                  this.$message.success('删除成功！')
              } else {
                  this.$message.error('删除失败！')
              }
          }).catch(err => {
              this.$message.error('删除失败！')
              console.log(err)
          })
        }
    },
    mounted: function () {
        this.getDomainList()
    }
}
</script>
<style lang="less" scoped>
.user-domain-buttons{
    padding-bottom: 12px;
    border-bottom: 4px solid #F2F2F2;
}
.user-domain-list{
    padding-left: 12px;
    padding-right: 12px;
    height: 600px;
    overflow: auto;
}
</style>

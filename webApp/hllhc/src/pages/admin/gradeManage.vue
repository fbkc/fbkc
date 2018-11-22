<template>
    <div>
        <div><el-button @click="addGrade">添加</el-button></div>
        <div class="user-grade-list">
            <el-table
            :data="list"
            style="width: 100%">
                <el-table-column
                label="序号"
                width="60px"
                type="index">
                </el-table-column>
                <el-table-column
                    label="等级名称">
                    <template slot-scope="scope">
                        <el-input :disabled="!scope.row.needSave" v-model="scope.row.gradeName"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="可发条数">
                    <template slot-scope="scope">
                        <el-input :disabled="!scope.row.needSave" v-model="scope.row.pubCount"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.needSave">
                             <el-button @click="edit(scope.row)">编辑</el-button>
                             <el-button @click="remove(scope.$index, scope.row.Id)">删除</el-button>
                        </span>
                        <span v-if="scope.row.needSave">
                            <el-button @click="cancel(scope.$index, scope.row)">取消</el-button>
                            <el-button @click="save(scope.$index, scope.row)" v-loading="saveLoading">保存</el-button>
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
        getGradeList () {
            let _this = this
            this.$store.dispatch('getGradeList').then(resp => {
                if (resp.data.code === '1') {
                    _this.list = resp.data.detail.gradeList.map(item => {
                        item.needSave = false
                        return item
                    })
                }
            }).catch(err => {
                consolel.log(err)
            })
        },
        addGrade () {
            let item = {
                Id: 0,
                gradeName: '',
                pubCount: '',
                needSave: true
            }
            this.list.push(item)
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
            this.$store.dispatch('saveGrade', qs.stringify(params)).then (res => {
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
            this.list.splice(index, 1)
        }
    },
    mounted: function () {
        this.getGradeList()
    }
}
</script>
<style lang="less" scoped>

</style>

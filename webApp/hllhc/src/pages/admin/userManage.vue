<template>
    <div class="user-manage">
        <div class="user-manage-buttons">
            <el-button @click="addUserClick">添加用户</el-button>
        </div>
        <div class="user-manage-user-list">
            <el-table
            :data="list"
            style="width: 100%">
                <el-table-column
                label="序号"
                width="60px"
                type="index">
                </el-table-column>
                <el-table-column
                    label="用户名"
                    width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.username}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="注册日期"
                    width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.registerTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="420px"
                    label="开放域名">
                    <template slot-scope="scope">
                        <div>
                            <el-select class="domain-select" v-model="scope.row.realmNameInfo" multiple>
                                <el-option v-for="item in realmNameInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="会员等级"
                    width="120px">
                    <template slot-scope="scope">
                        <div>
                            <el-select v-model="scope.row.gradeId">
                                <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="管理员"
                    width="100px">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.userType"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="2">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="启用"
                    width="100px">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.isStop"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="false"
                        :inactive-value="true">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <div class="user-item-ops">
                           <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
        append-to-body
        :close-on-click-modal="false"
        class="add-user-dialog"
        title="添加用户"
        :visible.sync="dialogVisible"
        width="36%"
        style="padding:24px">
            <div>
                <el-form class="user-form" ref="userForm" :model="userForm">
                    <el-row :gutter="24">
                        <el-form-item prop="username" label="用户名:">
                            <el-input v-model="userForm.username"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="24">
                        <el-form-item prop="password" label="密码设置:">
                            <el-input v-model="userForm.password"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="24">
                        <el-form-item label="确认密码:">
                            <el-input v-model="confirmPass"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="24">
                        <span>详细信息</span>
                    </el-row>
                    <el-row :gutter="24">
                        <el-form-item prop="companyName" label="公司名称:">
                            <el-input v-model="userForm.companyName"></el-input>
                        </el-form-item>
                        <el-form-item prop="companyRemark" label="所属栏目:">
                            <el-select v-model="userForm.companyRemark"></el-select>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addUserSumbit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            list: [],
            gradeList: [
                {
                    id: 3,
                    name: '钻石'
                },
                {
                    id: 2,
                    name: '铂金'
                },
                {
                    id: 1,
                    name: '普通'
                }
            ],
            realmNameInfo: [
                {
                    id: '1',
                    name: '百度',

                },
                {
                    id: '2',
                    name: '新浪'
                },
                {
                    id: '3',
                    name: '雅虎'
                },
                {
                    id: '4',
                    name: '阿里云'
                }
            ],
            dialogVisible: false,
            userForm: {
                Id: 0,
                address: '',
                canPubCount: 200,
                city: '',
                columnInfoId: 1, // 所属栏目
                com_web: '',
                companyName: '', // 公司名称
                companyRemark: '', // 公司简介
                endPubCount: 20,
                endTodayPubCount: 2,
                expirationTime: '2018-12-14',
                gradeId: 1, // 会员等级
                isStop: false,
                keyword: '',
                modile: '',
                password: '',
                person: '',
                pinpai: '',
                price: '',
                realmNameInfo: [], // 开放域名列表
                registerIP: '',
                registerTime: '2018-10-12',
                smallCount: '',
                sumCount: '',
                telephone: '',
                ten_qq: '',
                unit: '',
                userType: 2,
                username: '',
                xinghao: '',
                yewu: '',
                ziduan1: ''
            },
            confirmPass: ''
        }
    },
    methods: {
        initData () {
            let _this = this
            this.$store.dispatch('getUserList').then(resp => {
                if (resp.data.code === '1') {
                    _this.list = resp.data.detail.cmUserList.map(item => {
                        item.realmNameInfo = item.realmNameInfo.split(',')
                        return item
                    })
                } else {
                    this.$message.error('获取用户列表失败！')
                }
            }).catch(err => {
                this.$message.error('获取用户列表失败！')
                consolel.log(err)
            })
        },
        cancelAdd () { // 取消新增
          this.dialogVisible = false
          this.confirmPass = ''
          this.$refs.userForm.resetFields()
        },
        addUserClick () { // 新增
          this.dialogVisible = true
        },
        addUserSumbit () {
            let form = {
               ...this.userForm
            }
            form.realmNameInfo = form.realmNameInfo.length ? params.realmNameInfo.join(',') : ''
            let params = {
                params: JSON.stringify(form)
            }
            this.$store.dispatch('addUser', qs.stringify(params)).then(res => {
                if (res.data.code === '1') {
                    this.dialogVisible = false
                    this.$refs.userForm.resetFields()
                    this.confirmPass = ''
                    this.$message.success('添加成功！')
                } else {
                    this.$message.error('添加失败！')
                }
            })
        },
        handleEdit(index, row) { // 编辑

        },
        handleDelete (index, row) { //删除

        }
    },
    mounted: function () {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.user-manage{
    height: 100%;
    .user-manage-buttons{
        padding: 12px;
    }
    .user-manage-user-list{
        .domain-select{
            width: 100%;
            // &:after {
            //     content: '...';
            //     position: absolute;
            //     right: 39px;
            //     bottom: 5px;
            // }
            .el-select__tags {
                max-width: 200px;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
}
.add-user-dialog{
    .user-form{
        padding-left: 24px;
        padding-right: 24px;
        .el-form-item{
            .el-form-item__label{
                width: 20%;
            }
            .el-form-item__content{
                .el-input{
                    float: right;
                    width: 80%;
                }
            }
        }
    }
}
</style>

<template>
    <div class="user-manage">
        <div class="user-manage-buttons">
            <el-button type="primary" @click="addUserClick">添加</el-button>
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
                    label="注册日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.registerTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="320px"
                    label="开放域名">
                    <template slot-scope="scope">
                        <div>
                            <el-select class="domain-select" v-model="scope.row.realmNameInfo" multiple>
                                <el-option disabled v-for="item in realmList" :key="item.Id" :label="item.realmName" :value="item.Id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="会员等级"
                    width="130px">
                    <template slot-scope="scope">
                        <div>
                            <el-select disabled v-model="scope.row.gradeId">
                                <el-option v-for="item in gradeList" :key="item.Id" :label="item.gradeName" :value="item.Id"></el-option>
                            </el-select>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="栏目"
                    width="130px">
                    <template slot-scope="scope">
                        <div>
                            <el-select disabled v-model="scope.row.columnInfoId">
                                <el-option v-for="item in columnList" :key="item.Id" :label="item.columnName" :value="item.Id"></el-option>
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
                    label="操作"
                    width="200px">
                    <template slot-scope="scope">
                        <div class="user-item-ops">
                           <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row.Id)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination class="list-pagination"
                @current-change="initData"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
                </el-pagination>
            </div>
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
                        <el-form-item prop="columnInfoId" label="会员等级:">
                            <el-select v-model="userForm.gradeId">
                                <el-option v-for="item in gradeList" :key="item.Id" :label="item.gradeName" :value="item.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="companyName" label="公司名称:">
                            <el-input v-model="userForm.companyName"></el-input>
                        </el-form-item>
                        <el-form-item prop="columnInfoId" label="所属栏目:">
                            <el-select v-model="userForm.columnInfoId">
                                <el-option v-for="item in columnList" :key="item.Id" :label="item.columnName" :value="item.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="columnInfoId" label="开放域名:">
                            <el-select multiple v-model="userForm.realmNameInfo">
                                <el-option v-for="item in realmList" :key="item.Id" :label="item.realmName" :value="item.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="companyRemark" label="公司简介:">
                            <el-input 
                            type="textarea"
                            :rows="2"
                            placeholder="请输入公司简介"
                            v-model="userForm.companyRemark"></el-input>
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
            currentPage: 1,
            pageSize: 10,
            total: 0,
            columnList: [],
            gradeList: [],
            realmList: [],
            dialogVisible: false,
            userForm: {
                Id: 0,
                address: '', // 公司地址
                canPubCount: 0, // 可发总条数
                city: '', // 城市
                columnInfoId: '', // 所属栏目
                com_web: '', // 公司官网
                companyName: '', // 公司名称
                companyRemark: '', // 公司简介
                endPubCount: 0, // 已发总条数
                endTodayPubCount: 0, // 今日已发条数
                expirationTime: '2018-12-14', // 到期日期
                gradeId: 1, // 会员等级
                isStop: false,
                keyword: '', // 关键词 （改为，分割的字符串，多选）
                modile: '', // 手机号
                password: '', // 密码
                person: '', // 联系人
                pinpai: '', // 品牌
                price: '', // 价格
                realmNameInfo: [], // 开放域名列表
                registerIP: '', // 注册IP
                registerTime: '', // 注册日期
                smallCount: '', // 起订量
                sumCount: '', // 供货总量
                telephone: '', // 联系电话
                ten_qq: '', // QQ
                unit: '', // 计量单位
                userType: 2, // 用户类别(2管理员，1非管理员)
                username: '', // 用户名
                xinghao: '', // 产品型号
                yewu: '', // 业务
                ziduan1: ''
            },
            confirmPass: ''
        }
    },
    methods: {
        initData () {
            let _this = this
            let params = {
                page: this.currentPage,
                pageSize: this.pageSize
            }
            this.$store.dispatch('getUserList', params).then(resp => {
                if (resp.data.code === '1') {
                    _this.list = resp.data.detail.cmUserList.map(item => {
                        item.realmNameInfo = item.realmNameInfo.split(',').map(item => {return Number(item)})
                        return item
                    })
                    _this.total = resp.data.detail.total
                } else {
                    this.$message.error('获取用户列表失败！')
                }
            }).catch(err => {
                this.$message.error('获取用户列表失败！')
                consolel.log(err)
            })
        },
        getcolumnlist () {
            let _this = this
            this.$store.dispatch('getColumnList').then(resp => {
                if (resp.data.code === '1') {
                    _this.columnList = resp.data.detail.columnList
                }
            }).catch(err => {
                consolel.log(err)
            })
        },
        getgradelist () {
            let _this = this
            this.$store.dispatch('getGradeList').then(resp => {
                if (resp.data.code === '1') {
                    _this.gradeList = resp.data.detail.gradeList
                }
            }).catch(err => {
                consolel.log(err)
            })
        },
        getrealmlist () {
            let _this = this
            this.$store.dispatch('getDomainList').then(resp => {
                if (resp.data.code === '1') {
                    _this.realmList = resp.data.detail.realmList
                }
            }).catch(err => {
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
            form.realmNameInfo = form.realmNameInfo.length ? form.realmNameInfo.join(',') : ''
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
        handleDelete (index, Id) { //删除
          let params = {
              userId: Id
          }
          this.$store.dispatch('deleteUser', params).then(res => {
              if (res.data.code === '1') {
                  this.list.splice(index, 1)
                  this.total--
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
        this.getcolumnlist()
        this.getgradelist()
        this.getrealmlist()
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.user-manage{
    height: 100%;
    .user-manage-buttons{
        padding-bottom: 12px;
        border-bottom: 4px solid #F2F2F2;
    }
    .user-manage-user-list{
        padding-left: 12px;
        padding-right: 12px;
        height: 600px;
        overflow: auto;
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
        .list-pagination{
            position: relative;
            float: right;
            right: 24px;
            top: 12px;
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

<template>
    <div class="user-manage">
        <div class="user-manage-buttons">
            <el-button @click="addUser">添加用户</el-button>
        </div>
        <div class="user-manage-user-list">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="序号"
                width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.index}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="日期">
                <template slot-scope="scope">
                    <span>{{scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="地址">
                <template slot-scope="address">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: [],
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        initData () {
            this.$store.dispatch('getUserList').then(resp => {
                debugger
            }).catch(err => {
                debugger
            })
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
}
</style>

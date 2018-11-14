<template>
 <div class="login-page">
    <div class="login-box">
      <div>
        <span>信息发布</span>
      </div>
      <div>
        <!-- <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="passForm" :model="form" label-width="80px">
          <el-form-item label="用户名：">
            <el-input v-model="form.usrName"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form> -->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        userName: '',
        passWord: ''
      },
      value1: true,
      value2: true,
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
    submit () {
      this.$axios.post('api/Handler.ashx?id=' + this.id).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-page{
  background: url(../assets/image/timg.jpg) no-repeat;
  background-size: 100% 100%;
  .login-box{
    width: 280px;
    height: 320px;
    padding: 24px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-100px;
    margin-top:-100px;
  }
}
</style>

<template>
 <div class="login-page">
    <div class="login-box">
      <div class="login-box-title">
        <span>信息发布</span>
      </div>
      <div class="login-box-content">
        <el-form :rules="rules" class="login-form" ref="passForm" :model="form" label-width="80px">
          <el-form-item prop="userName" label="用户名：">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item prop="passWord" label="密码：">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="login-box-button">
          <el-button size="mini" @click="login">登陆系统</el-button>
        </div>
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
      rules: {
        userName: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$axios.post('api/Handler.ashx?id=' + this.id).then(res => {
        this.data = res.data
      })
    },
    login () {
      this.$refs.passForm.validate((valid) => {
        if (valid) {
          let self = this
          self.$store.dispatch('userlogin', {
            username: self.form.userName,
            password: self.form.passWord
          })
        } else {
          this.$message.warning('请检查用户名和密码是否输入正确！')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-page{
  // background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  position: absolute;
  background: url(../assets/image/login_bg.jpg) no-repeat;
  .login-box{
    height: 260px;
    width: 260px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    left: 70%;
    top: 24%;
    position: absolute;
    z-index: 99;
    .login-box-title{
      text-align: center;
      color: #fff;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .login-box-content{
      font-size: 18px;
      color: #fff;
      background: white;
      width: 100%;
      height: 80%;
      border-radius: 8px;
      .login-form{
        position: relative;
        width: 95%;
        top: 24px;
      }
      .login-box-button{
        padding-top: 34px;
        .el-button{
          width: 90%;
          height: 34px;
          background-color: #009688;
          color: #fff;
        }
      }
    }
  }
}
</style>

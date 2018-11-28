<template>
<!-- 门户首页 -->
 <div class="index">
      <div class="user-show"> 首页</div>
      <div class="first-flour"> 
        <div class="total-publish">
          <div class="title">发布统计</div>
          <div style="padding: 12px">
            <el-progress class="publish-progress" type="circle" width="88" :percentage="80" color="#fff000"></el-progress>
            <div class="content">
              <span>每日发布: {{500}}条 建议200-2000条</span>
              <span>今日发布: {{0}}条 如果停发见错误日志</span>
              <span>预计发布: {{500}}条 剩余标题+每日发布</span>
            </div>
          </div>
        </div>
        <div class="testing-warning">
          <div class="title">系统异常</div>
        </div>
      </div>
      <div class="second-flour">
        <div class="error-log">
          <div class="title">错误日志</div>
        </div>
        <div class="system-notice">
          <div class="title">公告</div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      data: 'default value!'
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.index{
  height: 100%;
  background: #F1F2F7;
  .user-show{
    height: 16%;
    // padding: 12px 12px 12px 12px;
    margin-bottom: 12px;
    border: 1px solid #dbdbdb;
  }
  .first-flour{
    height: 22%;
    // padding: 12px;
    margin-bottom: 12px;
    .total-publish{
      height: 100%;
      float:left;
      width: 40%;
      border: 1px solid #dbdbdb;
      .publish-progress{
        float: left;
      }
      .content{
        margin-left: 24px;
        float: left;
        width: calc(100% - 112px);
        span{
          display: inline-block;
        }
      }
    }
    .testing-warning{
      margin-left: 12px;
      height: 100%;
      float:left;
      width: calc(60% - 16px);
      border: 1px solid #dbdbdb;
    }
  }
  .second-flour{
    height: 45%;
    // padding: 12px;
    margin-bottom: 12px;
    .error-log{
      height: 100%;
      float:left;
      width: 40%;
      border: 1px solid #dbdbdb;
    }
    .system-notice{
      margin-left: 12px;
      height: 100%;
      float:left;
      width: calc(60% - 16px);
      border: 1px solid #dbdbdb;
    }
  }
  .title{
    height: 24px;
    padding: 6px;
    border-bottom: 1px solid #dbdbdb;
  }
}
</style>

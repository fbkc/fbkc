<template>
  <div>
    <div class="header">
      <div class="header-title"><span>神州第一信息发布系统</span></div>
    </div>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
@headerHeight: 66px;
@footerHeight: 34px;
.header
{
  background: #383c49;
  position: fixed;
  top: 0;
  width: 100%;
  height: 66px;
  z-index: 2;
  .header-title{
    color: @activeFontColor;
    display: inline-block;
    font-size: 18px;
    line-height: 28px;
    margin: 6px 0 6px 10px;
    vertical-align: middle;
  }
}
.main-content{
  position: fixed;
  // height: 100%;
  z-index: 1;
  height: calc(100% - @headerHeight - @footerHeight);
  top: 66px;
  width: 100%;
}
.footer
{
  background: #383c49;
  position: fixed;
  bottom:0;
  width: 100%;
  height: 34px;
  z-index: 2;
}
</style>

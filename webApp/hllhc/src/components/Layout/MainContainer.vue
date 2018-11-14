<template>
  <div>
    <div class="header"></div>
    <div class="main-content">
      <router-view/>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
@headerHeight: 84px;
@footerHeight: 78px;
.header
{
  background: blue;
  position: fixed;
  top: 0;
  width: 100%;
  height: 66px;
  z-index: 2;
}
.main-content{
  position: fixed;
  height: 100%;
  // width: 100%;
  z-index: 1;
  // position: relative;
  height: calc(100% - 66px - 66px);
  // height: 400px;
}
.footer
{
  background: blue;
  position: fixed;
  bottom:0;
  width: 100%;
  height: 66px;
  z-index: 2;
}
</style>

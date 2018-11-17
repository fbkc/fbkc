<template>
    <div class="admin-container">
      <div class="admin-left-menu el-menu-vertical-demo">
        <el-menu
            default-active="1-1">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统配置</span>
                </template>
                <el-menu-item index="2-1">会员等级</el-menu-item>
                <el-menu-item index="2-2">域名管理</el-menu-item>
                <el-menu-item index="2-2">栏目管理</el-menu-item>
            </el-submenu>
          </el-menu>
      </div>
      <div class="admin-content">
          <router-view></router-view>
      </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="less" scoped>
.admin-container{
    height: 100%;
    width: 100%;
    position: fixed;
    .admin-left-menu{
        border-right: 1px solid #ebeef5;
        float: left;
        position: absolute;
        width: 200px;
        height: 100%;
        .el-menu{
            border: none;
        }
    }
    .admin-content{
        padding: 12px;
        margin-left: 200px;
        position: absolute;
        float: left;
        width: calc(100% - 210px);
        height: 100%;
    }
}
</style>


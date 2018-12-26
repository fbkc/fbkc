<template>
    <div class="admin-container">
      <div class="admin-left-menu el-menu-vertical-demo">
        <el-menu class="project-overview__menu" @select="menuSelect" style="height:100%;">
            <el-submenu class="project-overview__submenu" v-for="(menu, $index) in menuList" :index="$index" :key="$index">
                <template slot="title">
                <span>{{menu.name}}</span>
                </template>
                <el-menu-item v-for="(item, $itemIndex) in menu.children" :index="$index+'-'+$itemIndex" :key="item.path" :route="item">
                <i :class="'iconfont ' + item.className"></i>
                <span>{{item.name}}</span>
                </el-menu-item>
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
        return {
            menuList: [
                {
                    name: '用户管理',
                    children: [
                        {
                        name: '用户列表',
                        path: 'userManage',
                        // className: 'bj-icon-tushen-scxm'
                        }
                    ]
                },
                {
                    name: '系统配置',
                    children: [
                        {
                        name: '会员等级',
                        path: 'gradeManage',
                        // className: 'bj-icon-tushen-scxm'
                        },
                        {
                        name: '域名管理',
                        path: 'domainNameManage',
                        // className: 'bj-icon-tushen-scxm'
                        },
                        {
                        name: '栏目管理',
                        path: 'columnsManage',
                        // className: 'bj-icon-tushen-scxm'
                        },
                        {
                        name: '长尾词库',
                        path: 'suffixsManage',
                        }
                    ]
                },
            ]
        }
    },
    methods: {
        menuSelect (index, indexData, menuItem) {
            this.$router.push(`/admin/${menuItem.route.path}`)
        }
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
        position: fixed;
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


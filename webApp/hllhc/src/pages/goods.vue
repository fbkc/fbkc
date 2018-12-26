<template>
    <div class="goods">
        <el-menu mode="horizontal" menu-trigger="click" class="" @select="menuSelect">
            <el-submenu class="" v-for="(menu, $index) in menuList" :index="$index + ''" :key="$index">
                <template slot="title">
                <span>{{menu.name}}</span>
                </template>
                <el-menu-item v-for="(item, $itemIndex) in menu.children" :index="$index+'-'+$itemIndex" :key="item.path" :route="item">
                <i :class="'iconfont ' + item.className"></i>
                <span>{{item.name}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <div><router-view/></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
          menuList: [
            {
                name: '产品信息',
                children: [
                    {
                    name: '详情',
                    path: 'goodsInfo',
                    // className: 'bj-icon-tushen-scxm'
                    }
                ]
            },
            {
                name: '内容管理',
                children: [
                    // {
                    // name: '地区',
                    // path: 'regionList',
                    // // className: 'bj-icon-tushen-scxm'
                    // },
                    {
                    name: '关键词',
                    path: 'keyWordList',
                    // className: 'bj-icon-tushen-scxm'
                    },
                    {
                    name: '长尾词',
                    path: 'suffixList',
                    // className: 'bj-icon-tushen-scxm'
                    },
                    {
                    name: '段落',
                    path: 'stageList',
                    // className: 'bj-icon-tushen-scxm'
                    },
                    {
                    name: '图片',
                    path: 'imageList',
                    // className: 'bj-icon-tushen-scxm'
                    }
                ]
            },
            {
                name: '发布管理',
                children: [
                    {
                        name: '标题设置',
                        path: 'headerManage',
                        // className: 'bj-icon-tushen-scxm'
                    },
                    {
                        name: '模板设置',
                        path: 'modelManage',
                        // className: 'bj-icon-tushen-scxm'
                    },
                    {
                        name: '发布设置',
                        path: 'publishManage',
                        // className: 'bj-icon-tushen-scxm'
                    },
                    {
                        name: '手动发布',
                        path: 'handPublish',
                        // className: 'bj-icon-tushen-scxm'
                    }
                ]
            }
          ]
        }
    },
    methods: {
      menuSelect (index, indexData, menuItem) {
        this.$router.push('/main/goods/'+ this.$route.params.goodsId + '/'+ menuItem.route.path)
      },
    }
}
</script>
<style lang="less" scoped>

</style>

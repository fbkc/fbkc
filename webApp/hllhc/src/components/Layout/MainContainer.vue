<template>
  <div>
    <div class="header">
      <div class="header-title"><span @click="goToIndex">神州第一信息发布系统</span></div>
    </div>
    <div class="main-content">
      <div class="main-left-menus">
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
      <div class="main-right-content">
        <router-view/>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
       menuList: [
                {
                    name: '公司信息',
                    children: [
                        {
                          name: '公司信息',
                          path: 'orgInfo',
                          // className: 'bj-icon-tushen-scxm'
                        },
                        {
                          name: '轮播图',
                          path: 'flourMsg',
                          // className: 'bj-icon-tushen-scxm'
                        }
                    ]
                },
                {
                    name: '内容管理',
                    children: [
                        {
                        name: '地区',
                        path: 'regionList',
                        // className: 'bj-icon-tushen-scxm'
                        },
                        {
                        name: '关键词',
                        path: 'keyWordList',
                        // className: 'bj-icon-tushen-scxm'
                        },
                        {
                        name: '后缀词',
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
                },
            ]
    }
  },
  methods: {
      menuSelect (index, indexData, menuItem) {
          this.$router.push(`/main/${menuItem.route.path}`)
      },
      goToIndex () {
        this.$router.push('/main/index')
      }
  }
}
</script>
<style lang="less" scoped>
@import '../../style/variables.less';
@headerHeight: 46px;
@footerHeight: 24px;
.header{
  background: #0099cc;
  position: fixed;
  top: 0;
  width: 100%;
  height: @headerHeight;
  z-index: 2;
  .header-title{
    color: @activeFontColor;
    display: inline-block;
    font-size: 18px;
    line-height: 28px;
    margin: 6px 0 6px 10px;
    vertical-align: middle;
    span{
      cursor: pointer;
    }
  }
}
.main-content{
  position: fixed;
  // height: 100%;
  z-index: 1;
  height: calc(100% - @headerHeight - @footerHeight);
  top: @headerHeight;
  width: 100%;
  .main-left-menus{
    overflow-y: auto;
    border-right: 1px solid #ebeef5;
    float: left;
    position: fixed;
    width: 200px;
    height: calc(100% - @headerHeight - @footerHeight);
    .el-menu{
        border: none;
        background: rgb(175, 170, 170);
    }
  }
  .main-left-menus::-webkit-scrollbar {
      width: 0;   /* 滚动条宽度为0 */
      height: 0; /* 滚动条高度为0 */
      display: none; /* 滚动条隐藏 */
    }
  .main-right-content{
    padding: 12px;
    margin-left: 200px;
    position: absolute;
    float: left;
    width: calc(100% - 222px);
    height: 100%;
  }
}
.footer
{
  background: #0099cc;
  position: fixed;
  bottom:0;
  width: 100%;
  height: @footerHeight;
  z-index: 2;
}
</style>

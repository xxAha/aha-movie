<template>
  <el-container>
    <!-- 侧边栏开始 -->
    <el-aside :width="isCollapse? '64px': '256px'">
      <div v-show="!isCollapse" class="logo-box">
        <div>
          <img src="../../static/img/1.jpg" alt="logo">
        </div>
        <h1>Aha电影库</h1>
      </div>
      <!-- #545c64 -->
      <el-menu @select="handleMenuSelect" :router="true" :collapse="isCollapse" background-color="#303133" text-color="#fff" active-text-color="#ffd04b" :collapse-transition="false" :default-active="currentPath">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span>网站设置</span>
          </template>
          <el-menu-item index="/setting">
            <i class="el-icon-s-tools"></i>SEO设置
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item index="/create-type">
            <i class="el-icon-document-add"></i>创建分类
          </el-menu-item>
          <el-menu-item index="/type-list">
            <i class="el-icon-document"></i>分类列表
          </el-menu-item>
          <!-- <el-menu-item index="/setting">
            <i class="el-icon-document-copy"></i>分类管理
          </el-menu-item> -->
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-video-camera-solid"></i>
            <span>资源管理</span>
          </template>
          <el-menu-item index="/add-resource">
            <i class="el-icon-s-ticket"></i>添加资源
          </el-menu-item>
          <el-menu-item index="/resource-list">
            <i class="el-icon-s-ticket"></i>资源列表
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 侧边栏结束 -->

    <!-- 右侧内容开始 -->
    <el-container>
      <!-- 头部开始 -->
      <el-header>
        <div class="header-left">
          <div class="close-icon" @click="changeMenuStatus">
            <i :class="isCollapse? 'el-icon-s-unfold-active': ''" class="el-icon-s-unfold" size="small"></i>
          </div>
          <div class="breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click.native="currentPathToHome" :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="breadcrumbText">{{breadcrumbText}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="header-right">

          <el-dropdown v-if="ownerInfo" @command="handleCommand" size="mini" placement="bottom-end">
            <div class="user-icon-container">
              <el-avatar class="avatar" size="small" :src="ownerInfo.avatar"></el-avatar>
              <i class="el-icon-caret-bottom"></i>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 头部结束 -->
      <el-main>
        <div class="main-content">
          <!-- 视图 -->
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
    <!-- 右侧内容结束 -->
  </el-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        isCollapse: false, //左侧栏关闭状态
        currentPath: '', //当前页面路径
        avatar: 'https://unsplash.it/1600/900?random'
      }
    },
    computed: {
      ...mapState(['ownerInfo']),
      //面包屑导航路径
      breadcrumbText(v) {
        const path = this.currentPath
        switch (path) {
          case '/setting':
            return 'SEO设置'
          case '/create-type':
            return '创建分类'
          case '/type-list':
            return '分类列表'
          case '/add-resource':
            return '添加资源'
          default:
            return ''
        }
      }
    },
    methods: {
      ...mapActions(['getOwnerInfoAct']),
      //初始化path
      initPath() {
        this.currentPath = this.$route.path
      },
      //左侧Menu点击处理
      handleMenuSelect(path) {
        this.currentPath = path
      },
      //面包屑回到主页
      currentPathToHome() {
        this.currentPath = '/home'
      },
      //右上角下拉选择框点击处理
      handleCommand(type) {
        if (type === 'changePassword') {
          this.$router.push('/change-password')
        }
      },
      //伸缩Menu
      changeMenuStatus() {
        this.isCollapse = !this.isCollapse
      },
      //获取当前登录用户的信息
      async getOwnerInfo() {
        this.getOwnerInfoAct()
      },
      //登出
      handleLogout() {
        sessionStorage.clear()
        this.$router.replace('/login')
      }
    },
    mounted() {
      this.initPath()
      this.getOwnerInfo()
    }
  }
</script>

<style lang="scss" scope>
  .el-container {
    height: 100%;

    .el-aside {
      display: flex;
      flex-direction: column;
      background-color: #303133;
      color: #333;
      transition: all .3s;

      .logo-box {
        display: flex;
        height: 64px;
        justify-content: center;
        align-items: center;
        text-align: center;
        //background-color: rgb(84, 92, 100);
        color: #fff;

        div {
          border-radius: 50%;
          overflow: hidden;

          img {
            display: block;
            width: 50px;
            height: 50px;
          }
        }

        h1 {
          margin-top: 20px;
          margin-left: 10px;
          font-weight: bold;
        }

      }

      .el-menu {
        flex: 1;
        border: none;

        .el-menu-item {
          font-size: 12px;
        }
      }

    }

    .el-header {
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      color: #333;

      .header-left {
        display: flex;
        align-items: center;

        .close-icon {
          font-size: 26px;
        }

        .el-icon-s-unfold {
          cursor: pointer;
          transform: rotate(180deg);
          transition: all .3s;
        }

        .el-icon-s-unfold-active {
          transform: rotate(0);
        }

        .breadcrumb-container {
          margin-left: 30px;
          cursor: pointer;
        }
      }

      .header-right {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;

        .user-icon-container {
          display: flex;
          align-items: center;

          .avatar {
            margin-right: 4px;
          }
        }
      }
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      height: 100%;
      overflow: scroll;


      .main-content {
        position: relative;
        background-color: #fff;
        min-height: 100%;
        padding: 40px 20px;
      }
    }

  }
</style>
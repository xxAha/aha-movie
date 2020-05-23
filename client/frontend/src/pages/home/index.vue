<template>
  <el-container class="container">
    <el-aside width="260px">
      <div class="title">
        <img :src="setting.logo" alt="logo">
        <div class="text">{{setting.title}}</div>
      </div>
      <div class="search">
        <el-input @keydown.enter.native="handleSearch" v-model="searchKey" type="text" placeholder="搜索关键词">
          <template slot="suffix">
            <i class="el-icon-close" @click.stop="clearSearchValue"></i>
          </template>
        </el-input>
      </div>
      <div class="sites-area">
        <ul class="category">
          <li v-for="(item, index) in data" :key="item.id + item.title">
            <div @click="handleTypeClick(item, index)" :class="currentType === index ?'active': ''">{{item.title}}</div>
          </li>
        </ul>
        <ul class="sites">
          <li v-for="(item, index) in resources" :key="item.id + item.title">
            <div @click="handleResourceClick(item, index)" :class="currentResource === index ?'active': ''">{{item.title}}</div>
          </li>
        </ul>
      </div>

    </el-aside>
    <el-main>
      <iframe v-loading="loading" @onerror="handleErro" @load="handleIfrLoad" class="ifr" id="ifra" :src="link" frameborder="0"></iframe>

      <el-button v-if="loading" class="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, .8)" v-loading="loading">
      </el-button>

      <el-tooltip effect="dark" content="新窗口打开" placement="top">
        <a class="open" :href="link" target="_blank">
          <el-button type="primary" circle>
            <i class="el-icon-s-promotion"></i>
          </el-button>
        </a>
      </el-tooltip>


      <div v-if="err" class="err">
        <div class="err-box">
          <img src="../../assets/img/open_error.png" alt="img">
          <p class="text">页面加载失败......</p>
          <el-button class="btn" size="small" type="warning"><a :href="link" target="_blank">新窗口打开</a></el-button>
        </div>
      </div>

    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        data: [],
        resources: [],
        currentType: 0,
        currentResource: 0,
        link: 'https://www.baidu.com',
        searchKey: '',
        loading: false,
        timer: null,
        err: false,
        setting: null
      }
    },
    methods: {
      handleErro() {
        this.err = true
      },
      handleIfrLoad() {
        this.loading = false
      },
      handleIfrLoadFile() {
        if (this.timer) return
        this.timer = setTimeout(() => {
          this.timer = null
          if (!this.loading) return
          this.loading = false
        }, 3000)
      },
      handleTypeClick(item, index) {
        this.currentType = index
        this.resources = item.resources
      },
      handleResourceClick(item, index) {
        this.loading = true
        this.err = false
        this.currentResource = index
        this.link = item.link
        this.handleIfrLoadFile()
      },
      handleSearch() {
        this.link = 'https://www.baidu.com/s?wd=' + this.searchKey
      },
      clearSearchValue() {
        this.searchKey = ''
      },
      async getData() {
        const result = await axios.get('/api/types')
        if (result.data.errno === 0) {
          this.data = result.data.data.rows
          this.resources = this.data[0].resources
        }
      },
      async getSetting() {
        const result = await axios.get('/api/setting')
        if (result.data.errno === 0) {
          this.setting = result.data.data
        }
      }
    },
    mounted() {
      this.getData()
      this.getSetting()
    },
  }
</script>

<style lang="scss" scope>
  .container {
    height: 100%;

    .el-aside {

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;

        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }

        .text {
          margin-left: 10px;
          font-size: 18px;
          font-weight: bold;
        }
      }

      .search {
        padding: 0 20px;
        margin-top: 20px;

        .el-icon-close {
          cursor: pointer;
          line-height: 40px;
        }
      }

      .sites-area {
        margin-top: 10px;
        display: flex;
        color: #fff;
        justify-content: center;

        .category {
          flex: 0 0 40%;

        }

        .sites {
          flex: 0 0 50%;

          background-color: #393939;

          li:first-child {
            margin-top: 40px;
          }

          li {
            div {
              margin: 6px;
              border-radius: 4px;
            }
          }
        }

        .active {
          background-color: #2777ff;

          &:hover {
            color: #fff;
          }
        }

        ul {
          flex: 0 0 50%;

          li {
            div {
              height: 40px;
              line-height: 40px;

            }
          }

          li:hover {

            cursor: pointer;
            color: #2777ff;
            transition: all .3s;
          }
        }

      }


    }

    .el-main {
      padding: 0;
      position: relative;

      .ifr {
        width: 100%;
        height: 100%;
      }

      .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 99;
        left: 0;
        top: 0;
      }

      .open {
        position: absolute;
        top: 50px;
        right: 100px;
        z-index: 10;
      }

      .err {
        background-color: #fff;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 99;
        left: 0;
        top: 0;
        z-index: 999;

        .err-box {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          img {
            width: 200px;
            display: block;

          }

          .text {
            margin-top: 10px;
            color: #303133;
          }

          .btn {
            margin-top: 10px;

            a {
              color: #fff;
              text-decoration: none;
            }
          }
        }

      }
    }
  }

  .el-aside {
    background-color: #191919;
    color: #333;
    text-align: center;

  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }
</style>
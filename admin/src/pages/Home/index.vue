<template>
  <div v-if="ownerInfo" class="container">
    <el-image style="width: 300px; height: 300px;border-radius: 50%;" :src="ownerInfo.avatar"></el-image>
    <div class="right">
      <p class="time">{{time}}</p>
      <p class="hello">你好！</p>
      <p class="user-name">{{ownerInfo.nickName}}</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  export default {
    data() {
      return {
        time: '',
        url: 'https://unsplash.it/1600/900?random',
        userName: 'zhangsan'
      }
    },
    computed: {
      ...mapState(['ownerInfo'])
    },
    methods: {
      getCurrentTime() {
        this.time = moment().format('YYYY-MM-DD').replace(/-/g,"/")
      }
    },
    mounted() {
      this.getCurrentTime()
    }
  }

</script>

<style lang="scss" scope>
.container {
  margin: 50px;
  display: flex;
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 100px;
    font-size: 28px;
    .time {
      text-indent: 60px;
    }
    .user-name {
      //text-indent: 40px;
    }
    p {
      margin-bottom: 20px;
    }
  }
}
</style>

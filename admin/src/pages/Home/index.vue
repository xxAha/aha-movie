<template>
  <div v-if="ownerInfo" class="container">
    <el-image style="width: 300px; height: 300px;border-radius: 50%;" :src="ownerInfo.avatar"></el-image>
    <div class="right">
      <p class="time">{{`${date.year}/${date.month > 10 ?date.month : '0' + date.month}/${date.day}`}}</p>
      <p class="hello">你好！</p>
      <p class="user-name">{{ownerInfo.nickName}}</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        time: '',
        url: 'https://unsplash.it/1600/900?random',
        date: {
          year: '',
          month: '',
          day: ''
        },
      }
    },
    computed: {
      ...mapState(['ownerInfo'])
    },
    methods: {
      getCurrentTime() {
        const date = new Date()
        this.date.year = date.getFullYear()
        this.date.month = date.getMonth() + 1 
        this.date.day = date.getDate()
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

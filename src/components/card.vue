<template>
  <div class="card"  >
      <div class="body" v-for="list in list" :key="list" @longpress ="longPress(list.wid)" @click="showText(list.wid)">
        <p class="text">{{ list.text }}</p> 
        <p class="time" >{{ list.text_time }}</p>
      </div>
  </div>
</template>

<script>
import utils from '../utils/index.js'
import config from '../config.js'
export default {
  props: ['list'],
  computed: {
    time() {
      console.log(this.list)
    }
  },
  data () {
    return {
      data: {}  
    }
  },
  methods: {
    longPress(id) {
      //长按删除事件
      wx.showModal({
        title: '警告',
        content: '确定删除这条记录吗',
        success: res => {
          if (res.confirm) {
            utils
              .post(`${config.server}/weapp/deleteText`, { wid: id }) //post请求后端进行记录删除
              .then(res => {
                wx.showToast({
                  //删除成功打印返回返回数据
                  title: res.data.data.msg,
                  icon: 'success'
                })
                this.$emit('updateText') //通知父组件进行刷新
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    showText(id) {
      //查看记录事件
      utils
        .get(`${config.server}/weapp/showText`, { wid: id })
        .then(res => {
          this.data = res.data.data.list[0] //所有的文本以及其他信息
        })
        .then(() => {
          wx.navigateTo({
            url: `../write/main?data=${this.data.text}&wid=${this.data.wid}&msg=${this.data.word_count}`
          })
        })
        .catch(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  .body {
    margin: 18rpx 0;
    background-color: white;
    .text {
      font-size: 36rpx;
      max-height: 400rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 10rpx 20rpx 0rpx 20rpx;
      margin-bottom: 20rpx;
      letter-spacing: 2rpx;
    }
    .time {
      font-size: 35rpx;
      display: flex;
      justify-content: flex-end;
      margin-right: 10rpx;
    }
  }
}
</style>    



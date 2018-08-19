<template>
  <div class="index">
    <div class="main">
      <div class="main-right">
        <div class="textBox" @click="gotoWriter">
          <img class="img" src="/static/text.png" alt="">
        </div>
        <card :list="rigthText"></card>
      </div>
      <div class="main-left">
        <card :list="leftText" @updateText="updateText"></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'
import config from '../../config.js'
export default {
  onLoad() {
    console.log('页面开始渲染')

    wx.showNavigationBarLoading() //加载动画
    this.getText() //执行加载事件
    wx.hideNavigationBarLoading() //停止加载动画
  },
  onShow() {
    //页面显示
    this.getText()
  },
  components: {
    card
  },
  data() {
    return {
      rigthText: [],
      leftText: []
    }
  },
  methods: {
    gotoWriter() {
      wx.navigateTo({
        url: '../write/main'
      })
    },
    getText() {
      //获取用户的所有留言
      wx.getStorage({
        //异步获取openId
        key: 'userinfo',
        success: res => {
          let open_id = res.data.openId
          wx.request({
            url: `${config.server}/weapp/getText`,
            data: {
              open_id
            },
            success: res => {
              let textList = res.data.data.list
              console.log(res.data.data.list)
              let list = [].slice.call(textList) //用户所有的记事本文件
              let lengths = Math.round(list.length / 2) //获取文章总数的一半 小数处理掉   进行分割
              
              this.rigthText = list.slice(0, lengths) //数组切去一半(这一半可能多一个 给右边)
              this.leftText = list.slice(lengths)
              //console.log(list);
            },
            fail: res => {
              console.log(res)
            }
          })
        }
      })
    },
    updateText(){     //子组件的刷新响应事件
      console.log("页面刷新");
      this.getText()
    }
  },
  onPullDownRefresh() {
    //下拉事件
    wx.showNavigationBarLoading()
    this.getText()
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: '刷新成功~',
      icon: 'success'
    })
  }
}
</script>

<style lang="less" scoped>
.index {
  display: flex;
  justify-content: center;
  background: #c9ccd3;
  background-image: linear-gradient(to top, white 0%, #dfe9f3 100%);
  .main {
    display: flex;
    flex-wrap: wrap;
    .main-right {
      .textBox {
        margin-top: 20rpx;
        height: 350rpx;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 150rpx;
          height: 150rpx;
        }
      }
      width: 350rpx;
      margin: 5rpx 10rpx 5rpx 7rpx;
    }
    .main-left {
      width: 350rpx;
      margin: 5rpx 10rpx 5rpx 10rpx;
    }
  }
}
</style>

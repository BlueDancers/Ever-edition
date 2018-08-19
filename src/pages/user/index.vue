<template>
  <div class="user">
    <div class="user-header">
      <img :src="userinfo.avatarUrl || '/static/login.png'" mode="aspecFit">
    </div>
    <div class="user-function">
      <div class="user-functionList">乱七八糟功能</div>
      <button class="buttonColor userButton" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">登录</button>
    </div>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../config.js'
import utils from '../../utils/index.js'
export default {
  created() {
    this.userinfo = wx.getStorageSync('userinfo')
  },
  data() {
    return {
      userinfo: {}
    }
  },
  methods: {
    async doLogin(res) {
      qcloud.setLoginUrl(config.loginUrl) //请求后端
      const session = await qcloud.Session.get()
      wx.showLoading({
          title: '登录中',
      })
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res)
            this.userinfo = res
            wx.setStorageSync('userinfo', this.userinfo)
             wx.showToast({
              title: '你已经登录了',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            console.log(err)
          },
          complete: ()=> {
            wx.hideLoading()
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.userinfo = res
            wx.setStorageSync('userinfo', this.userinfo)
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {},
          complete: ()=> {
            wx.hideLoading()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .user-header {
    display: flex;
    justify-content: center;
    img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin: 30rpx;
    }
  }
  .user-function {
    .user-functionList {
      display: flex;
      justify-content: center;
      padding: 50px;
    }
    .userButton {
    }
  }
}
</style>

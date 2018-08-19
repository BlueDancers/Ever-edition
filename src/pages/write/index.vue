<template>
<div class="page">
<div class="write">
    <div class="utils">
      <div class="utils-enter">
        <img src="/static/text-enter.png" alt="" @click="addEnter">
      </div>
       <div class="utils-enter">
        <img src="/static/text-enter.png" @click="add" alt="">
      </div>
       <div class="utils-enter">
        <img src="/static/text-enter.png" alt="">
      </div>
    </div>

    <div class="writer-text">
      <textarea maxlength=2000 placeholder="写点什么吧" auto-focus=true auto-height=true adjust-position=true fixed=true v-model="texts" @input="inputs" :focus="focus">
      </textarea>
    </div>
    <div class="footer-text">
      <span>{{ msg }}字数</span>
    </div>
  </div>
</div>
  
</template>

<script>
import config from '../../config.js'
import utils from '../../utils/index.js'
export default {
  data() {
    return {
      msg: '0', //字数
      texts: '', //文本框文字,
      focus: true, //控制焦点事件
      wid: null
      /*
        数据库需要的字段
        openid
        文本信息
        日期
        5
      */
    }
  },
  mounted() {
    let data = this.$root.$mp.query //获取要修改的数据信息

    if (JSON.stringify(data) === '{}') {
      console.log("第一次");
      
      // .....
    }
    if (JSON.stringify(data) !== '{}') {
      //说明是修改 所以不是空
      console.log(data)
      this.texts = data.data
      this.wid = data.wid
      this.msg = data.msg
    }
  },
  computed: {},
  methods: {
    inputs(e) {
      //获取字数
      console.log(e.target.value.length) //注意获取字数不要使用微信的 他的是获取当前光标前的字数
      console.log(this.texts)
      this.msg = e.target.value.length
    },
    addEnter() {
      //给文字加 分类点
      let text = this.texts
      let en = '\n\t•\t'
      this.texts = `${text}${en}`
      //给文字添加 • 的代码
      this.focus = true
    },
    add() {
      let data = wx.getStorageSync('userinfo') //提交用户的文本信息
      utils
        .post(`${config.server}/weapp/addtext`, {
          open_id: data.openId,
          text: this.texts,
          word_count: this.msg
        })
        .then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res)
        })
    },
    updateText() {      //对文本进行更新
    console.log("文本更新");
    
      utils.post(`${config.server}/weapp/updateText`,{
        wid: this.wid,
        text: this.texts,
        word_count: this.msg
      })
      .then(res=> {
        console.log(res);
      })
      .catch(()=> {
        console.log("失败");
      })
    },
    longPress() {
      //长按事件
      console.log('长按')
    }
  },
  onUnload() {
    console.log("执行卸载页面");
    
    if (parseInt(this.msg) == 0 || /^[ ]+$/.test(this.texts)) {
      //是空格不保存 是空的不保存
      console.log('不保存')
      return
    }
    //页面退出时候,假如是第一次写的标签,保存用户的所有为文字
    if (this.wid === null) {
      this.add()
    } else {      //假如wid存在就说明 是需要修改的便签
      this.updateText()
    }

    //因为这里是隐藏并不是
  },
  onLoad() {   //写入页面再次写入就手动初始化
    this.texts = '',
    this.msg = 0,
    this.wid = null
  }
}
</script>

<style lang="less" scoped>
.page {
  background-image: linear-gradient(
    to top,
    #d5d4d0 0%,
    #d5d4d0 1%,
    #eeeeec 31%,
    #efeeec 75%,
    #e9e9e7 100%
  );
  min-height: 1300rpx;
  max-height: 1500rpx;
  .write {
    position: relative;
    .utils {
      position: fixed;
      top: 0;
      width: 100%;
      height: 70rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background-color: #6f86d6;
      color: white;
      z-index: 1000;
      .utils-enter {
        margin: 0 10rpx;
        width: 40rpx;
        height: 40rpx;
        img {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .writer-text {
      textarea {
        z-index: 0;
        margin-top: 70rpx;
        max-height: 1060rpx;
        padding: 0rpx 20rpx;
        width: 95%;
        font-size: 40rpx;
        line-height: 1.5em;
      }
    }
    .footer-text {
      z-index: 1000;
      background: #e9e9e7;
      position: fixed;
      width: 100%;
      bottom: 1rpx;
      font-size: 30rpx;
      display: flex;
      justify-content: flex-end;
      span {
        display: inline-block;
        padding: 5rpx 10rpx;
      }
    }
  }
}
</style>

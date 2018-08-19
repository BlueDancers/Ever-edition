import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6f86d6',
      navigationBarTitleText: '记事本',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/main',
          text: "记事本",
          iconPath: "static/one.png",
          selectedIconPath: "static/one-open.png"

        },
        {
          pagePath: 'pages/user/main',
          text: "我",
          iconPath: "static/two.png",
          selectedIconPath: "static/two-open.png"
        }
      ]
    } 
  }
}

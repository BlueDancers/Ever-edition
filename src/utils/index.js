import config from '../config'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}


//对模态框的封装
function showModal(title, content, showCancel) {
  wx.showModal({
    title, //标题
    content, //主题文字
    showCancel, //是否显示取消按钮
    confirmColor: config.myColor, //按钮颜色
  })
}



//对request进行下层封装
function request(url,method,data){
  return new Promise((resolve,reject)=> {
    wx.request({
      url,
      method,
      data,
      success: (res=> {
        resolve(res)
      }),
      fail: res=> {
      reject(res)
      }
    })  
  })
}

//对get进行上层封装
function get(url,data){
  return request(url,"GET",data)
}
//对post进行上层封装
function post(url,data) {
  return request(url,"POST",data)
}



export default {
  formatNumber,
  formatTime,
  showModal,
  get,
  post
}

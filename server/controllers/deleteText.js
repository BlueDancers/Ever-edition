let { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  let { wid } = ctx.request.body
  console.log(wid);
  await mysql("text").where('wid',"=",wid).del()
  ctx.state.data = {
    msg: "删除成功"
  }
}


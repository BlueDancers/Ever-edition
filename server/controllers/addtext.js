const {
  mysql
} = require('../qcloud')

module.exports = async ctx => {
  let {
    open_id,
    text,
    word_count,
  } = ctx.request.body;
  //ctx.request.query; //获取get参数
  let wid = null;
  text_time = null;
  await mysql('text').insert({
    wid,
    open_id,
    text,
    word_count,
    text_time
  })
  ctx.state.data = {
    msg: "成功"
  }
}

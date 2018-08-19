let { mysql } = require('../qcloud')


module.exports = async ctx => {
  let { wid } = ctx.request.query;
  console.log(wid);
  let list = await mysql('text').select('wid', 'text','word_count', 'text_time').where('wid',"=",wid)
  console.log(list);
  
  ctx.state.data = {
    list
  }
}
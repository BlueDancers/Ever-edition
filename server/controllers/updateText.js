let {
  mysql
} = require('../qcloud')


module.exports = async (ctx) => {
  let {
    wid,
    text,
    word_count
  } = ctx.request.body
  console.log(wid);
  console.log(text);
  let text_time = null

  let datas = await mysql('text').where('wid', '=', wid).update({
      text,
      word_count,
      text_time
    })
    console.log(datas);
    
  

}

const { mysql } = require('../qcloud')

module.exports = async (ctx)=> {
  let open_id = ctx.request.query
  let list = await mysql('text').select('wid','text','text_time').where(open_id)
  let timePush;
  list.map(res=> {
    timePush = res.text_time.toString().split(" ");
    res.text_time = `${timePush[3]} ${timePush[4]}`
    console.log(res.text_time);
  })
  ctx.state.data = {
    list
  }
}

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const date = new Date()
const y = date.getFullYear().toString()
const m = (date.getMonth() + 1).toString()
const d = date.getDate().toString().length < 2 ? '0' + date.getDate().toString() : date.getDate().toString()
const ymd = y + m + d
exports.main = async (event, context) => {
  switch (event.action) {
    case 'getSelfCode':
      let arr = (await db.collection('arrange').where({
        _openid: cloud.getWXContext().OPENID,
        date: ymd
      }).get()).data
      console.log(cloud.getWXContext().OPENID)
      if (arr.length > 0) {
        return arr[arr.length - 1]['code']
      }
      break
    case 'getTodayAllUserCodeCount':
      return (await db.collection('arrange').where({
        date: ymd
      }).count()).total
      break
    case 'arrange':
      // todo 并发问题
      let code = (await db.collection('arrange').where({
        date: ymd
      }).count()).total + 1
      return db.collection('arrange').add({
        data: {
          _openid: cloud.getWXContext().OPENID,
          date: ymd,
          code: code
        }
      }).then(() => code)
      break
  }
}
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  switch (event.s) {
    case 'getList':
      if (event.p == (await db.collection('itemList').count()).total) {
        return []
      }
      return (await db.collection('itemList').skip(event.p).get()).data
      break
    case 'getDetail':
      return (await db.collection('itemList').doc(event.id).get()).data
      break
    case 'zan':
      return await db.collection('itemList').doc(event.id).update({
        data: {
          value: event.zan
        }
      })
      break
    case 'cang':
      return await db.collection('itemList').doc(event.id).update({
        data: {
          value: event.cang
        }
      })
      break
    case 'comment':
      return await db.collection('itemList').doc(event.id).update({
        data: {
          comments: event.value
        }
      })
      break
    default:
      throw Error('nos')
  }
}
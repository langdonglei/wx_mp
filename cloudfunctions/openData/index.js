const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYMAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  switch (event.s) {
    case "list":
      // 主动调 (可一可多项数据) 参数名是list 值是一个 cloudID 数组
      return (await cloud.getOpenData({
        list: event.list
      })).list
    default:
      // 被动调 (只有一项数据)云系统会检查参数对象一级属性里 是否有 openData 对象 (在小程序端通过 wx.cloud.CloudID('cloudID字符串') 获取) 如果有 就会自动把开放数据加入到 event 对象中
      return event
  }
}
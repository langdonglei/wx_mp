Page({
  getWeRunData: function () {
    wx.getWeRunData().then(res => {
      // 云方式一
      wx.cloud.callFunction({
        name: 'openData',
        data: {
          s: 'list',
          list: [res.cloudID]
        }
      }).then(res => {
        console.log(res)
        this.setData({
          arr: res.result[0].data.stepInfoList
        })
      })
      // 云方式二
      wx.cloud.callFunction({
        name: 'openData',
        data: {
          // carry 自定义的变量名 意为携带者 变量的值为 wx.cloud.CloudID('cloudID字符串') 函数包装后的对象
          carry: wx.cloud.CloudID(res.cloudID)
        }
      }).then(res => {
        // 返回的数据还在 carry 变量中
        this.setData({
          arr: res.result.carry.data.stepInfoList
        })
      })
    })
  }
})
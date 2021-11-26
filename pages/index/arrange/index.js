Page({
  onLoad: function () {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'arrange',
      data: {
        action: 'getSelfCode'
      }
    }).then(r => {
      if (r.result) {
        // 第一步请求有值 没有必要进行第二步请求
        this.setData({
          code: r.result
        })
      } else {
        // 有必要进行第二步请求
        // 重点 要!返回!一个 Promise 然后才能在下一个 then 中使用第二次的请求结果 这样才能保证 hideLoading 的正确场景
        return wx.cloud.callFunction({
          name: 'arrange',
          data: {
            action: 'getTodayAllUserCodeCount'
          }
        })
      }
    }).then(r => {
      if (r && (r.result || r.result == 0)) {
        this.setData({
          max: r.result,
          ready: true
        })
      } else {
        if (!this.data.code) {
          throw Error('err0')
        }
      }
    }).catch(r => {
      console.log(r)
      wx.showToast({
        title: 'error',
        icon: 'error'
      })
    }).finally(r => {
      wx.hideLoading()
    })
  },

  arrange: function () {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'arrange',
      data: {
        action: 'arrange'
      }
    }).then(r => {
      this.setData({
        code: r.result
      })
    }).catch(e => {
      wx.showToast({
        title: 'error',
        icon: 'error'
      })
    }).finally(f => {
      wx.hideLoading()
    })
  },

  cleanDB: function () {
    wx.cloud.callFunction({
      name: 'arrangeTimer'
    }).then(r => {
      wx.reLaunch({
        url: '/' + getCurrentPages()[0].route,
      })
    }).catch(e => {
      console.log(e)
    })
  }
})
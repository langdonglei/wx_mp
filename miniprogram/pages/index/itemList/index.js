Page({
  data: {
    list: []
  },
  onLoad: function () {
    this.getList()
  },
  onReachBottom: function () {
    this.getList()
  },
  getList: function () {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'itemList',
      data: {
        s: 'getList',
        p: this.data.list.length
      }
    }).then(r => {
      if (r.result.length == 0) {
        wx.showToast({
          title: '没有数据了',
          icon: 'none'
        })
      } else {
        this.setData({
          list: this.data.list.concat(r.result)
        })
      }
    }).catch(r => {
      wx.showToast({
        title: 'error',
        icon: 'error'
      })
    }).finally(r => {
      wx.hideLoading()
    })
  },
  detail: function (e) {
    wx.navigateTo({
      url: '/pages/index/itemList/itemDetail/index?id=' + e.currentTarget.dataset.id
    })
  }
})
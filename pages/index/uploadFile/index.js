Page({
  uploadFile: function () {
    wx.showLoading()
    wx.chooseImage({
      count: 1,
      success: res => {
        wx.cloud.uploadFile({
          filePath: res.tempFilePaths[0],
          cloudPath: 'my-photo.png',
          success: res => this.setData({
            image: res.fileID
          }),
          fail: () => wx.showToast({
            title: 'error',
            icon: 'error'
          })
        })
      },
      complete: () => wx.hideLoading()
    })
  },
  clear: function () {
    this.setData({
      image: ''
    });
  }
});
Page({
  data: {
    login_status_text: '未登录'
  },
  login: function () {
    wx.login({
      success: res => {
        wx.showLoading()
        wx.request({
          url: 'http://192.168.1.222/wxmp_php/api/login.php',
          data: {
            js_code: res.code
          },
          complete: () => wx.hideLoading(),
          success: res => {
            if (res.data.code === 0) {
              wx.setStorageSync('sessionID', res.data.msg)
              this.setData({
                login_status_text: '登录成功'
              })
            } else {
              this.setData({
                login_status_text: '登录失败'
              })
            }
          }
        })
      }
    })
  }
})
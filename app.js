App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'free-debug-0gro0veo3dce7d2a',
      traceUser: true,
    });
  }
});
Page({

  data: {

  },
  getInfo: function(e) {
    // 调用云函数
    wx.cloud.callFunction({
      name:'image',
      data:{
        avatar: e.detail.userInfo.avatarUrl, // 头像获取自 userInfo
        style: 2 // style 可以取值 1 ～ 4
      }
    }).then(res => {
      this.setData({
        avatarUrl:res.result.url
      })
    })
  }
})
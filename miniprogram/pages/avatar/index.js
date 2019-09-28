Page({
  onLoad() {
    wx.cloud.database().collection('avatar-images').get().then(res => {
      this.setData({
        showAvatar: res.data
      })
    })
  },
  data: {
    avatarUrl: '',
    showAvatar: []
  },
  preView() {
    wx.previewImage({
      urls: [this.data.avatarUrl],
    })
  },
  headimgHD(imageUrl) {
    console.log('原来的头像', imageUrl);

    imageUrl = imageUrl.split('/'); //把头像的路径切成数组

    //把大小数值为 46 || 64 || 96 || 132 的转换为0
    if (imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
      imageUrl[imageUrl.length - 1] = 0;
    }

    imageUrl = imageUrl.join('/'); //重新拼接为字符串

    return imageUrl;
  },

  getInfo: function(e) {
    wx.showLoading({
      title: '头像生成中',
    })
    this.data.avatarUrl = this.headimgHD(e.detail.userInfo.avatarUrl)
    // 调用云函数
    wx.cloud.callFunction({
      name: 'image',
      data: {
        avatar: this.data.avatarUrl, // 头像获取自 userInfo
        style: e.target.dataset.style // style 可以取值 1 ～ 4
      }
    }).then(res => {
      wx.hideLoading();
      wx.previewImage({
        urls: [res.result.url],
      })
    })
  }
})
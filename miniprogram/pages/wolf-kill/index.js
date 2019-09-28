// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerNum: '',
    roomNo: '',
    roomId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeNum(e) {
    this.setData({
      playerNum: e.detail.value
    })
  },
  changeNo(e) {
    this.setData({
      roomNo: e.detail.value
    })
  },
  checkRoom(id) {
    const db = wx.cloud.database()
    db.collection('wolf-kill-rooms').where({
      roomId: id
    }).get().then(res => {
      if (res.data.length > 0) {
        let newId = Math.floor(Math.random() * 99999);
        this.checkRoom(newId)
      } else {
        this.addRoom(id)
      }
    })
  },
  addRoom(id) {
    if (this.data.playerNum < 6 || this.data.playerNum > 18) {
      wx.showModal({
        title: '提示', //提示的标题,
        content: '人数要在6-18人之间才行', //提示的内容,
        showCancel: false, //是否显示取消按钮,
        cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', //取消按钮的文字颜色,
        confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#f0831e', //确定按钮的文字颜色,
      });
    } else {
      wx.cloud.callFunction({
        name: 'wolf-kill-addRoom',
        data: {
          playerNum: this.data.playerNum,
          roomId: id,
        }
      }).then(res => {
        console.log(res)
      })
    }
  },
  newRoom() {
    let id = (Math.ceil(Math.random() * 9999)).toString();
    this.checkRoom(id)
  },
  enterRoom() {
    wx.cloud.callFunction({
      name: 'wolf-kill-enterRoom',
      data: {
        roomID: this.data.roomNo
      }
    }).then(res => {
      console.log(res)
      this.setData({
        roomId: this.data.roomNo
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// miniprogram/pages/eat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awards: [],
    awardIndex: 0,
    toTurn: false,
    eat: [],
    eatThing: ''
  },
  beginTurn(e) {
    let awardIndex = Math.floor(Math.random() * this.data.awards.length);
    this.setData({
      awardIndex,
      toTurn: true
    })
  },
  turnOver(e) {
    this.setData({
      toTurn: false
    })
    wx.showModal({
      content: "今天就吃" + e.detail.awardName + '吧',
      showCancel: false
    });
  },
  enough() {
    if (this.data.eat.length > 1) {
      let awards = []
      this.data.eat.map((item, index) => {
        awards[index] = {
          awardName: item,
          index
        }
      })
      this.setData({
        awards
      })
    } else {
      wx.showModal({
        title: '',
        content: '你能再加点不？',
        showCancel: false
      })
    }
  },

  think() {
    this.setData({
      awardIndex: 0,
      toTurn: false,
      eat: [],
      awards: []
    })
  },
  change(e) {
    this.setData({
      eatThing: e.detail
    })
  },
  confirm(e) {
    this.selectComponent("#field").onClear()
    this.data.eat[this.data.eat.length] = e.detail
    let eat = this.data.eat
    this.setData({
      eat,
      eatThing: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
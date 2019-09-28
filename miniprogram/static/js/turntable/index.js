Component({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: true,
    runDegs: 0,
    awardsConfig: {}
  },
  properties: {
    awardIndex: {
      type: Number
    },
    awards: {
      type: Array
    },
    toTurn: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    'toTurn'(e) {
      if (e) {
        this.turn()
      }
    }
  },
  methods: {
    getLottery: function () {
      if (this.data.btnDisabled) {
        this.triggerEvent('beginTurn')
      }
    },
    turn() {
      this.setData({
        btnDisabled: false
      })
      //wx.hideLoading();
      var that = this
      var awardIndex = this.properties.awardIndex
      // 获取奖品配置
      var awardsConfig = this.data.awardsConfig
      var runNum = this.data.awardsConfig.length
      // console.log(awardIndex)
      // 旋转抽奖
      this.data.runDegs = this.data.runDegs || 0
      // console.log('deg', this.data.runDegs)
      this.data.runDegs = this.data.runDegs + (360 - this.data.runDegs % 360) + (360 * runNum - awardIndex * (360 / runNum))
      // console.log('deg', this.data.runDegs)
      var animationRun = wx.createAnimation({
        duration: 4000,
        timingFunction: 'ease'
      })
      that.animationRun = animationRun
      animationRun.rotate(this.data.runDegs).step()
      that.setData({
        animationData: animationRun.export(),
        btnDisabled: false
      })

      // 记录奖品
      var winAwards = {
        data: []
      }
      winAwards.data.push(that.data.awardsConfig[awardIndex].awardName + '1个')
      // 中奖提示
      setTimeout(function () {
        that.setData({
            btnDisabled: true
          }),
          that.triggerEvent('turnOver', that.data.awardsConfig[awardIndex])
      }, 4000);
    }
  },
  ready: function (e) {

    var that = this;

    // getAwardsConfig getAwardsConfig
    this.setData({
      awardsConfig: this.properties.awards
    })
    // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))
    // 绘制转盘
    var awardsConfig = this.data.awardsConfig
    var len = awardsConfig.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len // 文字旋转 turn 值
    // that.setData({
    //   btnDisabled: this.data.awardsConfig.chance ? '' : false
    // })
    // var ctx = wx.createContext()
    for (var i = 0; i < len; i++) {
      // 奖项列表
      html.push({
        turn: i * turnNum + 'turn',
        lineTurn: i * turnNum + turnNum / 2 + 'turn',
        award: awardsConfig[i].awardName,
        img: awardsConfig[i].cover
      });
    }
    that.setData({
      awardsList: html
    });

  }

})

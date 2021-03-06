"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames = _interopRequireDefault(require("../helpers/classNames"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}(0, _baseComponent.default)({
  relations: {
    "../index/index": {
      type: "parent"
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: "wux-index-item"
    },
    name: {
      type: String,
      value: ""
    }
  },
  data: {
    index: 0,
    top: 0,
    height: 0
  },
  computed: {
    classes: ["prefixCls", function (e) {
      return {
        wrap: (0, _classNames.default)(e),
        hd: "".concat(e, "__hd"),
        bd: "".concat(e, "__bd")
      }
    }]
  },
  methods: {
    updated: function (t) {
      var n = this,
        e = ".".concat(this.data.prefixCls);
      wx.createSelectorQuery().in(this).select(e).boundingClientRect(function (e) {
        e && n.setData({
          top: e.top,
          height: e.height,
          index: t
        })
      }).exec()
    }
  }
});

"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames2 = _interopRequireDefault(require("../helpers/classNames"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _defineProperty(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}(0, _baseComponent.default)({
  relations: {
    "../grids/index": {
      type: "parent"
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: "wux-grid"
    },
    hoverClass: {
      type: String,
      value: "default"
    },
    thumb: {
      type: String,
      value: ""
    },
    label: {
      type: String,
      value: ""
    }
  },
  data: {
    width: "100%",
    bordered: !0,
    square: !0,
    index: 0
  },
  computed: {
    classes: ["prefixCls, hoverClass, bordered, square", function (e, t, r, n) {
      var a;
      return {
        wrap: (0, _classNames2.default)(e, (_defineProperty(a = {}, "".concat(e, "--bordered"), r), _defineProperty(a, "".concat(e, "--square"), n), a)),
        content: "".concat(e, "__content"),
        inner: "".concat(e, "__inner"),
        hd: "".concat(e, "__hd"),
        thumb: "".concat(e, "__thumb"),
        bd: "".concat(e, "__bd"),
        label: "".concat(e, "__label"),
        hover: t && "default" !== t ? t : "".concat(e, "--hover")
      }
    }]
  },
  methods: {
    changeCurrent: function (e, t, r, n) {
      this.setData({
        width: e,
        bordered: t,
        square: r,
        index: n
      })
    },
    onTap: function () {
      this.triggerEvent("click", this.data)
    }
  }
});

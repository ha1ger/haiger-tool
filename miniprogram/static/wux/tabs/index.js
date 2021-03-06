"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames2 = _interopRequireDefault(require("../helpers/classNames"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e
}
var getDefaultActiveKey = function (e) {
    var t = e.filter(function (e) {
      return !e.data.disabled
    })[0];
    return t ? t.data.key : null
  },
  activeKeyIsValid = function (e, t) {
    return e.map(function (e) {
      return e.data.key
    }).includes(t)
  },
  getActiveKey = function (e, t) {
    var a = getDefaultActiveKey(e);
    return t && activeKeyIsValid(e, t) ? t : a
  };
(0, _baseComponent.default)({
  relations: {
    "../tab/index": {
      type: "child",
      observer: function () {
        this.debounce(this.updated)
      }
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: "wux-tabs"
    },
    defaultCurrent: {
      type: String,
      value: ""
    },
    current: {
      type: String,
      value: "",
      observer: function (e) {
        this.data.controlled && this.updated(e)
      }
    },
    scroll: {
      type: Boolean,
      value: !1
    },
    controlled: {
      type: Boolean,
      value: !1
    },
    theme: {
      type: String,
      value: "balanced"
    },
    direction: {
      type: String,
      value: "horizontal"
    }
  },
  data: {
    activeKey: "",
    keys: []
  },
  computed: {
    classes: ["prefixCls, direction, scroll", function (e, t, a) {
      var n;
      return {
        wrap: (0, _classNames2.default)(e, (_defineProperty(n = {}, "".concat(e, "--").concat(t), t), _defineProperty(n, "".concat(e, "--scroll"), a), n))
      }
    }]
  },
  methods: {
    updated: function (e) {
      var t = 0 < arguments.length && void 0 !== e ? e : this.data.activeKey,
        a = this.getRelationNodes("../tab/index"),
        n = getActiveKey(a, t);
      this.data.activeKey !== n && this.setData({
        activeKey: n
      }), this.changeCurrent(n, a)
    },
    changeCurrent: function (t, e) {
      var a = this.data,
        n = a.scroll,
        r = a.theme,
        i = a.direction;
      0 < e.length && e.forEach(function (e) {
        e.changeCurrent({
          current: e.data.key === t,
          scroll: n,
          theme: r,
          direction: i
        })
      }), this.data.keys.length !== e.length && this.setData({
        keys: e.map(function (e) {
          return e.data
        })
      })
    },
    emitEvent: function (e) {
      this.triggerEvent("change", {
        key: e,
        keys: this.data.keys
      })
    },
    setActiveKey: function (e) {
      this.data.controlled || this.updated(e), this.emitEvent(e)
    }
  },
  ready: function () {
    var e = this.data,
      t = e.defaultCurrent,
      a = e.current,
      n = e.controlled ? a : t;
    this.updated(n)
  }
});

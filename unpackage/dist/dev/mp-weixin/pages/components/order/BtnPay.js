"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit("cancel", null);
    },
    toOrderPayResult() {
      this.$emit("pay", null);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    b: common_vendor.o((...args) => $options.toOrderPayResult && $options.toOrderPayResult(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Study/uni-app/pages/components/order/BtnPay.vue"]]);
wx.createComponent(Component);

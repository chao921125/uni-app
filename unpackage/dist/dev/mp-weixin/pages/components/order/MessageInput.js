"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    sendMessage() {
      this.$emit("click", this.inputValue);
      this.inputValue = "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.inputValue,
    b: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    c: common_vendor.o((...args) => $options.sendMessage && $options.sendMessage(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/components/order/MessageInput.vue"]]);
wx.createComponent(Component);

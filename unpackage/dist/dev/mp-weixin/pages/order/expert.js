"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    defineProps({ id: { type: String } });
    common_vendor.onLoad((option) => {
      console.log("B \u9875\u9762 onLoad:", option);
    });
    common_vendor.onShow(() => {
      console.log("B \u9875\u9762 onShow");
    });
  },
  data() {
    return {};
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/order/expert.vue"]]);
wx.createPage(MiniProgramPage);

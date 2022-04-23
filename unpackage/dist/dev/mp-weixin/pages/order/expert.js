"use strict";
var common_vendor = require("../../common/vendor.js");
var common_plugins_common_utils = require("../../common/plugins/common.utils.js");
var common_config_index = require("../../common/config/index.js");
require("../../common/config/color.js");
const _sfc_main = {
  data() {
    return {};
  },
  setup() {
    common_vendor.onLoad((option) => {
      console.log("B \u9875\u9762 onLoad:", option);
    });
    common_vendor.onShow(() => {
      console.log("B \u9875\u9762 onShow");
    });
  },
  methods: {
    toOrderPay(type) {
      common_plugins_common_utils.utils.href(common_config_index.defaultConfig.routePath.orderPay + `?id=${type}`, false);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toOrderPay(1))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/order/expert.vue"]]);
wx.createPage(MiniProgramPage);

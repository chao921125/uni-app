"use strict";
var common_plugins_common_utils = require("../../common/plugins/common.utils.js");
var common_config_index = require("../../common/config/index.js");
var common_vendor = require("../../common/vendor.js");
require("../../common/config/color.js");
const _sfc_main = {
  data() {
    return {};
  },
  created() {
  },
  methods: {
    toExpert(type) {
      common_plugins_common_utils.utils.href(common_config_index.defaultConfig.routePath.orderExpert + `?id=${type}`, false);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_card2 + _easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toExpert(1)),
    b: common_vendor.o(($event) => $options.toExpert(2)),
    c: common_vendor.o(($event) => $options.toExpert(3)),
    d: common_vendor.o(($event) => $options.toExpert(4)),
    e: common_vendor.p({
      column: 3,
      showBorder: false,
      square: false
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/tabbar/home.vue"]]);
wx.createPage(MiniProgramPage);

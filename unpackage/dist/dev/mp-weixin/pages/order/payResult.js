"use strict";
var common_config_index = require("../../common/config/index.js");
var common_plugins_common_utils = require("../../common/plugins/common.utils.js");
var common_vendor = require("../../common/vendor.js");
require("../../common/config/color.js");
const _sfc_main = {
  data() {
    return {
      imgPath: common_config_index.defaultConfig.imgPath,
      returnTime: 5
    };
  },
  created() {
    this.setReturnTime();
  },
  methods: {
    setReturnTime() {
      let _this = this;
      setInterval(() => {
        _this.returnTime--;
        if (_this.returnTime === 0) {
          common_plugins_common_utils.utils.hrefTabbar(common_config_index.defaultConfig.routePath.tabbarOrder, false);
        }
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.imgPath
  }, $data.imgPath ? {
    b: $data.imgPath.PaySuccess
  } : {}, {
    c: common_vendor.t($data.returnTime)
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Study/uni-app/pages/order/payResult.vue"]]);
wx.createPage(MiniProgramPage);

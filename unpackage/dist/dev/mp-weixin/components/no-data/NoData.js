"use strict";
var common_config_index = require("../../common/config/index.js");
var common_vendor = require("../../common/vendor.js");
require("../../common/config/routers.js");
require("../../common/config/images.js");
require("../../common/config/request.js");
require("../../common/config/color.js");
require("../../common/config/emoji.js");
const _sfc_main = {
  data() {
    return {
      imgPath: common_config_index.defaultConfig.imgPath
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.imgPath
  }, $data.imgPath ? {
    b: $data.imgPath.NoData
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/components/no-data/NoData.vue"]]);
wx.createComponent(Component);

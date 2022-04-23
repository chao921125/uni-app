"use strict";
var common_plugins_common_utils = require("../../common/plugins/common.utils.js");
var common_config_index = require("../../common/config/index.js");
var common_api_subject = require("../../common/api/subject.js");
var common_vendor = require("../../common/vendor.js");
require("../../common/config/color.js");
require("../../common/api/index.js");
require("../../common/plugins/http.js");
const _sfc_main = {
  data() {
    return {
      subjectList: []
    };
  },
  created() {
    this.getSubjectList();
  },
  methods: {
    getSubjectList() {
      common_api_subject.subjectList().then((res) => {
        this.subjectList = res.data;
      });
    },
    toExpert(e) {
      common_plugins_common_utils.utils.href(common_config_index.defaultConfig.routePath.orderExpert + `?id=${this.subjectList[e.detail.index].value}`, false);
    }
  }
};
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.subjectList || $data.subjectList.length === 0
  }, !$data.subjectList || $data.subjectList.length === 0 ? {} : {
    b: common_vendor.f($data.subjectList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: "7c16cbfc-1-" + i0 + ",7c16cbfc-0",
        d: common_vendor.p({
          index
        })
      };
    })
  }, {
    c: common_vendor.o($options.toExpert),
    d: common_vendor.p({
      column: 5,
      showBorder: false,
      square: false
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/tabbar/home.vue"]]);
wx.createPage(MiniProgramPage);

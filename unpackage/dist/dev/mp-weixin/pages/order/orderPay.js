"use strict";
var common_vendor = require("../../common/vendor.js");
var common_plugins_common_utils = require("../../common/plugins/common.utils.js");
var common_config_index = require("../../common/config/index.js");
require("../../common/config/color.js");
const BtnPay = () => "./component/BtnPay.js";
const _sfc_main = {
  components: {
    BtnPay
  },
  data() {
    return {
      form: {
        questionTitle: "",
        questionDesc: ""
      }
    };
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
    setQuestionTitle() {
      console.log(this.form.questionTitle);
    },
    setQuestionDesc() {
      console.log(this.form.questionDesc);
    },
    toOrderPayResult() {
      common_plugins_common_utils.utils.href(common_config_index.defaultConfig.routePath.orderPayResult, false);
    },
    toBack() {
      common_plugins_common_utils.utils.back();
    }
  }
};
if (!Array) {
  const _component_BtnPay = common_vendor.resolveComponent("BtnPay");
  _component_BtnPay();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o([($event) => $data.form.questionTitle = $event.detail.value, (...args) => $options.setQuestionTitle && $options.setQuestionTitle(...args)]),
    b: $data.form.questionTitle,
    c: common_vendor.o([($event) => $data.form.questionDesc = $event.detail.value, (...args) => $options.setQuestionDesc && $options.setQuestionDesc(...args)]),
    d: $data.form.questionDesc,
    e: common_vendor.o($options.toOrderPayResult),
    f: common_vendor.o($options.toBack)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Study/uni-app/pages/order/orderPay.vue"]]);
wx.createPage(MiniProgramPage);

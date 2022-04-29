"use strict";
var common_vendor = require("../../common/vendor.js");
var common_plugins_utils = require("../../common/plugins/utils.js");
var common_config_index = require("../../common/config/index.js");
var common_api_expert = require("../../common/api/expert.js");
var common_api_order = require("../../common/api/order.js");
require("../../common/config/color.js");
require("../../common/config/routers.js");
require("../../common/config/images.js");
require("../../common/config/request.js");
require("../../common/config/emoji.js");
require("../../common/api/index.js");
require("../../common/plugins/http.js");
const BtnPay = () => "../components/order/BtnPay.js";
const _sfc_main = {
  components: {
    BtnPay
  },
  data() {
    return {
      expertObject: {},
      form: {
        questionTitle: "",
        questionDesc: ""
      }
    };
  },
  setup() {
    const id = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      id.value = option.id;
    });
    return { id };
  },
  onLoad() {
    this.getExpertDetail();
  },
  methods: {
    setQuestionTitle() {
    },
    setQuestionDesc() {
    },
    getExpertDetail() {
      if (!common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey))
        common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.loginPermission, false);
      common_api_expert.expertDetail({ proficNo: this.id }).then((res) => {
        this.expertObject = res.data;
      });
    },
    addOrder() {
      if (!this.form.questionTitle && !this.form.questionDesc)
        common_plugins_utils.utils.toast("\u8BF7\u586B\u5199\u6807\u9898\u6216\u63CF\u8FF0");
      common_api_order.orderUser({
        fuserNo: common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey),
        proNo: this.expertObject.proficNo,
        title: this.form.questionTitle,
        text: this.form.questionDesc
      }).then((res) => {
        common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.orderPayResult, true);
      });
    },
    toOrderPayResult() {
      this.addOrder();
    },
    toBack() {
      common_plugins_utils.utils.hrefTabbar(common_config_index.defaultConfig.routePath.tabbarHome, false);
    }
  }
};
if (!Array) {
  const _component_BtnPay = common_vendor.resolveComponent("BtnPay");
  _component_BtnPay();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.expertObject.proficName),
    b: common_vendor.t($data.expertObject.price),
    c: common_vendor.o([($event) => $data.form.questionTitle = $event.detail.value, (...args) => $options.setQuestionTitle && $options.setQuestionTitle(...args)]),
    d: $data.form.questionTitle,
    e: common_vendor.o([($event) => $data.form.questionDesc = $event.detail.value, (...args) => $options.setQuestionDesc && $options.setQuestionDesc(...args)]),
    f: $data.form.questionDesc,
    g: common_vendor.o($options.toOrderPayResult),
    h: common_vendor.o($options.toBack)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/order/orderPay.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var common_vendor = require("../../common/vendor.js");
var common_plugins_utils = require("../../common/plugins/utils.js");
var common_config_index = require("../../common/config/index.js");
var common_api_order = require("../../common/api/order.js");
var common_api_expert = require("../../common/api/expert.js");
require("../../common/config/color.js");
require("../../common/config/routers.js");
require("../../common/config/images.js");
require("../../common/config/request.js");
require("../../common/config/emoji.js");
require("../../common/api/index.js");
require("../../common/plugins/http.js");
const NoData = () => "../../components/no-data/NoData.js";
const MessageInput = () => "../components/order/MessageInput.js";
const _sfc_main = {
  components: {
    NoData,
    MessageInput
  },
  data() {
    return {
      timeObject: null,
      timeLoading: false,
      orderObject: {},
      orderContentList: [],
      pageOption: {
        page: 1,
        pageSize: 100
      },
      loadMoreOption: {
        status: "more",
        contentText: {
          contentdown: "\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A",
          contentrefresh: "\u6B63\u5728\u52A0\u8F7D...",
          contentnomore: "\u6CA1\u6709\u6570\u636E\u4E86"
        }
      }
    };
  },
  setup() {
    const expertId = common_vendor.ref("");
    const orderId = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      expertId.value = option.expertId;
      orderId.value = option.orderId;
    });
    return { expertId, orderId };
  },
  onLoad() {
    this.orderContentList = [];
    this.getOrder();
    this.getOrderContentList();
    this.setIntervalContent();
  },
  onHide() {
    clearInterval(this.timeObject);
  },
  onReachBottom(e) {
    this.getMoreList();
  },
  methods: {
    setIntervalContent() {
      this.timeObject = setInterval(() => {
        this.timeLoading = true;
        if (!this.timeLoading) {
          this.getOrderContentList();
        }
      }, 1e4);
    },
    getExpertDetail() {
      if (!common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey))
        common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.loginPermission, false);
      common_api_expert.expertDetail({ proficNo: this.id }).then((res) => {
        this.orderObject = res.data;
      });
    },
    getOrder() {
      if (!common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey))
        common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.loginPermission, false);
      common_api_order.orderDetail({ orderNo: this.orderId, fuserNo: common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey) }).then((res) => {
        this.orderObject = res.data;
      });
    },
    getOrderContentList() {
      if (!common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey))
        common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.loginPermission, false);
      common_api_order.orderContentList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, orderNo: this.orderId, fuserNo: common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey) }).then((res) => {
        this.timeLoading = false;
        if (this.orderContentList.length > 0 && this.orderContentList.length < res.data.total) {
          this.orderContentList = this.orderContentList.concat(res.data.rows);
        } else if (this.orderContentList.length === 0) {
          this.orderContentList = res.data.rows;
        } else {
          this.loadMoreOption.status = "no-more";
        }
      });
    },
    getMoreList() {
      this.pageOption.page++;
      this.loadMoreOption.status = "loading";
      this.getOrderContentList();
    },
    addContent(val) {
      if (!val)
        return false;
      common_api_order.orderContentUser({ orderNo: this.orderId, fuserNo: common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey), content: val }).then((res) => {
        this.getOrderContentList();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _component_NoData = common_vendor.resolveComponent("NoData");
  const _component_MessageInput = common_vendor.resolveComponent("MessageInput");
  (_easycom_uni_load_more2 + _component_NoData + _component_MessageInput)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.orderObject.title),
    b: common_vendor.t($data.orderObject.text),
    c: $data.orderContentList.length > 0
  }, $data.orderContentList.length > 0 ? {
    d: common_vendor.f($data.orderContentList, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "P"
      }, item.type === "P" ? {
        b: common_vendor.t(item.content),
        c: index
      } : {}, {
        d: item.type === "U"
      }, item.type === "U" ? {
        e: common_vendor.t(item.content),
        f: index
      } : {});
    }),
    e: common_vendor.o($options.getMoreList),
    f: common_vendor.p({
      status: $data.loadMoreOption.status,
      contentText: $data.loadMoreOption.contentText
    })
  } : {}, {
    g: common_vendor.o($options.addContent)
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/order/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);

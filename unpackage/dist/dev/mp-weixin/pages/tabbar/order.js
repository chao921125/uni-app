"use strict";
var common_vendor = require("../../common/vendor.js");
var common_plugins_utils = require("../../common/plugins/utils.js");
var common_config_index = require("../../common/config/index.js");
var common_api_order = require("../../common/api/order.js");
require("../../common/config/color.js");
require("../../common/config/routers.js");
require("../../common/config/images.js");
require("../../common/config/request.js");
require("../../common/config/emoji.js");
require("../../common/api/index.js");
require("../../common/plugins/http.js");
const NoData = () => "../../components/no-data/NoData.js";
const _sfc_main = {
  components: {
    NoData
  },
  data() {
    return {
      imgPath: common_config_index.defaultConfig.imgPath,
      orderList: [],
      pageOption: {
        page: 1,
        pageSize: 10
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
  onShow() {
    this.orderList = [];
    this.getOrderList();
  },
  onReachBottom(e) {
    this.getMoreList();
  },
  methods: {
    getOrderList() {
      if (!common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey))
        common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.loginPermission, false);
      common_api_order.orderList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, fuserNo: common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey) }).then((res) => {
        if (this.orderList.length > 0 && this.orderList.length < res.data.total) {
          this.orderList = this.orderList.concat(res.data.rows);
        } else if (this.orderList.length === 0) {
          this.orderList = res.data.rows;
        } else {
          this.loadMoreOption.status = "no-more";
        }
      });
    },
    getMoreList() {
      this.pageOption.page++;
      this.loadMoreOption.status = "loading";
      this.getExpertList();
    },
    toDetail(expertId, orderId) {
      common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.orderDetail + `?expertId=${expertId}&orderId=${orderId}`, true);
    }
  }
};
if (!Array) {
  const _component_NoData = common_vendor.resolveComponent("NoData");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_NoData + _easycom_uni_card2 + _easycom_uni_load_more2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.orderList || $data.orderList.length === 0
  }, !$data.orderList || $data.orderList.length === 0 ? {} : {
    b: common_vendor.f($data.orderList, (item, index, i0) => {
      return common_vendor.e($data.imgPath ? {
        a: item.avatar || $data.imgPath.UserAvatar
      } : {}, {
        b: common_vendor.t(item.profileName),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.title),
        e: index,
        f: common_vendor.o(($event) => $options.toDetail(item.proNo, item.orderNo)),
        g: "2cb2ab8a-1-" + i0
      });
    }),
    c: $data.imgPath,
    d: common_vendor.o($options.getMoreList),
    e: common_vendor.p({
      status: $data.loadMoreOption.status,
      contentText: $data.loadMoreOption.contentText
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/tabbar/order.vue"]]);
wx.createPage(MiniProgramPage);

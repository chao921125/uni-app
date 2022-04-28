"use strict";
var common_plugins_utils = require("../../common/plugins/utils.js");
var common_config_index = require("../../common/config/index.js");
var common_vendor = require("../../common/vendor.js");
require("../../common/config/color.js");
require("../../common/config/routers.js");
require("../../common/config/images.js");
require("../../common/config/request.js");
require("../../common/config/emoji.js");
const NoData = () => "../../components/no-data/NoData.js";
const _sfc_main = {
  components: {
    NoData
  },
  data() {
    return {
      imgPath: common_config_index.defaultConfig.imgPath,
      expertList: [],
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
  created() {
    this.getExpertList();
  },
  onReachBottom(e) {
    this.getMoreSubjectList();
  },
  methods: {
    getExpertList() {
      let tempArr = [];
      for (let i = 0; i < 10; i++) {
        tempArr.push({
          avatar: "",
          name: "1" + i,
          desc: "i`m" + i
        });
      }
      this.expertList = tempArr;
    },
    getMoreSubjectList() {
      this.pageOption.page++;
      this.loadMoreOption.status = "loading";
      console.log("1");
      setTimeout(() => {
        if (this.pageOption.page < 3) {
          let tempArr = [];
          for (let i = 0; i < 10; i++) {
            tempArr.push({
              avatar: "",
              name: "1" + i,
              desc: "i`m" + i
            });
          }
          this.expertList = this.expertList.concat(tempArr);
        }
        this.loadMoreOption.status = "no-more";
      }, 3e3);
    },
    toDetail(id) {
      console.log(id);
      common_plugins_utils.utils.href(common_config_index.defaultConfig.routePath.orderDetail + `?id=${id}`, true);
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
    a: !$data.expertList || $data.expertList.length === 0
  }, !$data.expertList || $data.expertList.length === 0 ? {} : {
    b: common_vendor.f($data.expertList, (item, index, i0) => {
      return common_vendor.e($data.imgPath ? {
        a: item.avatar || $data.imgPath.UserAvatar
      } : {}, {
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.desc),
        d: common_vendor.t(item.desc),
        e: common_vendor.t(item.desc),
        f: index,
        g: common_vendor.o(($event) => $options.toDetail(item.name)),
        h: "03de020d-1-" + i0
      });
    }),
    c: $data.imgPath,
    d: common_vendor.o($options.getMoreSubjectList),
    e: common_vendor.p({
      status: $data.loadMoreOption.status,
      contentText: $data.loadMoreOption.contentText
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Study/uni-app/pages/tabbar/order.vue"]]);
wx.createPage(MiniProgramPage);

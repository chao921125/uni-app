"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_plugins_common_utils = require("../../../common/plugins/common.utils.js");
var common_config_index = require("../../../common/config/index.js");
var common_api_subject = require("../../../common/api/subject.js");
require("../../../common/config/color.js");
require("../../../common/api/index.js");
require("../../../common/plugins/http.js");
const NoData = () => "../../../components/no-data/NoData.js";
const _sfc_main = {
  components: {
    NoData
  },
  data() {
    return {
      imgPath: common_config_index.defaultConfig.imgPath,
      subjectList: [],
      expertList: [],
      pageOption: {
        page: 1,
        pageSize: 10
      },
      loadMoreOption: {
        scrollHeight: "0",
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
    this.initScrollHeight();
    this.getExpertList();
  },
  onReachBottom(e) {
    console.log(e);
  },
  methods: {
    initScrollHeight() {
      let _this = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          _this.loadMoreOption.scrollHeight = res.windowHeight + "px";
        }
      });
    },
    getSubjectList() {
      this.loadMoreOption.status = "more";
      common_api_subject.subjectList().then((res) => {
        this.subjectList = res.data;
      });
    },
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
    toExpert(e) {
      common_plugins_common_utils.utils.href(common_config_index.defaultConfig.routePath.orderExpert + `?id=${this.subjectList[e.detail.index].value}`, false);
    },
    getMoreSubjectList() {
      this.pageOption.page++;
      this.loadMoreOption.status = "loading";
      console.log("1");
      setTimeout(() => {
        let tempArr = [];
        for (let i = 0; i < 10; i++) {
          tempArr.push({
            avatar: "",
            name: "1" + i,
            desc: "i`m" + i
          });
        }
        this.expertList = this.expertList.concat(tempArr);
        this.loadMoreOption.status = "no-more";
      }, 3e3);
    }
  }
};
if (!Array) {
  const _component_NoData = common_vendor.resolveComponent("NoData");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_NoData + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_card2 + _easycom_uni_load_more2)();
}
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_card + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.subjectList || $data.subjectList.length === 0
  }, !$data.subjectList || $data.subjectList.length === 0 ? {} : {
    b: common_vendor.f($data.subjectList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: "5abcf858-2-" + i0 + ",5abcf858-1",
        d: common_vendor.p({
          index
        })
      };
    }),
    c: common_vendor.o($options.toExpert),
    d: common_vendor.p({
      column: 5,
      showBorder: false,
      square: false
    })
  }, {
    e: !$data.expertList || $data.expertList.length === 0
  }, !$data.expertList || $data.expertList.length === 0 ? {} : {
    f: common_vendor.f($data.expertList, (item, index, i0) => {
      return common_vendor.e($data.imgPath ? {
        a: item.avatar || $data.imgPath.UserAvatar
      } : {}, {
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.desc),
        d: index,
        e: "5abcf858-4-" + i0
      });
    }),
    g: $data.imgPath,
    h: common_vendor.o($options.getMoreSubjectList),
    i: common_vendor.p({
      status: $data.loadMoreOption.status,
      contentText: $data.loadMoreOption.contentText
    }),
    j: $data.loadMoreOption.scrollHeight,
    k: common_vendor.o((...args) => $options.getMoreSubjectList && $options.getMoreSubjectList(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Study/uni-app/pages/API/load-more/load-more.vue"]]);
wx.createPage(MiniProgramPage);

"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
var common_config_index = require("../../common/config/index.js");
var common_plugins_utils = require("../../common/plugins/utils.js");
var common_api_user = require("../../common/api/user.js");
require("../../common/config/routers.js");
require("../../common/config/images.js");
require("../../common/config/request.js");
require("../../common/config/color.js");
require("../../common/config/emoji.js");
require("../../common/api/index.js");
require("../../common/plugins/http.js");
const _sfc_main = {
  data() {
    return {
      imgPath: common_config_index.defaultConfig.imgPath,
      hasUserInfo: false,
      openId: "",
      userInfo: {},
      btnLoading: false
    };
  },
  onLoad() {
  },
  computed: __spreadValues({}, common_vendor.mapState([
    "loginProvider",
    "isUniverifyLogin"
  ])),
  methods: __spreadProps(__spreadValues({}, common_vendor.mapActions(["getPhoneNumber"])), {
    getUserInfo() {
      this.btnLoading = true;
      if (this.isUniverifyLogin) {
        this.getPhoneNumber(common_vendor.index.getStorageSync("univerifyInfo")).then((phoneNumber) => {
          this.hasUserInfo = true;
          this.userInfo = {
            phoneNumber
          };
        }).catch((err) => {
          console.error("getUserInfo fail:", err);
          this.hasUserInfo = false;
        }).finally(() => {
          this.btnLoading = false;
        });
        return;
      }
      if (this.loginProvider === "apple") {
        const nickname = common_vendor.index.getStorageSync("apple_nickname");
        if (nickname) {
          this.hasUserInfo = true;
          this.userInfo = { nickName: nickname };
          this.btnLoading = false;
          return;
        }
      }
      common_vendor.index.getUserInfo({
        provider: this.loginProvider,
        success: (result) => {
          this.hasUserInfo = true;
          this.userInfo = result.userInfo;
        },
        fail: (error) => {
          console.log("getUserInfo fail", error);
          let content = error.errMsg;
          if (~content.indexOf("uni.login")) {
            content = "\u8BF7\u5728\u767B\u5F55\u9875\u9762\u5B8C\u6210\u767B\u5F55\u64CD\u4F5C";
          }
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.userInfo"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "\u6388\u6743\u5931\u8D25",
                  content: "Hello uni-app\u9700\u8981\u83B7\u53D6\u60A8\u7684\u7528\u6237\u4FE1\u606F\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              } else {
                common_vendor.index.showModal({
                  title: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25",
                  content: "\u9519\u8BEF\u539F\u56E0" + content,
                  showCancel: false
                });
              }
            }
          });
        },
        complete: () => {
          this.btnLoading = false;
        }
      });
    },
    mpGetUserInfo(result) {
      console.log("mpGetUserInfo", result);
      if (result.detail.errMsg !== "getUserInfo:ok") {
        common_vendor.index.showModal({
          title: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25",
          content: "\u9519\u8BEF\u539F\u56E0" + result.detail.errMsg,
          showCancel: false
        });
        return;
      }
      this.hasUserInfo = true;
      if (result.detail && result.detail.userInfo) {
        this.userInfo = result.detail.userInfo;
        common_vendor.index.setStorageSync(common_config_index.defaultConfig.userKey, result.detail.userInfo);
        this.checkLogin();
      }
    },
    onGetPhoneNumber(result) {
      console.log(result);
    },
    clear() {
      this.hasUserInfo = false;
      this.userInfo = {};
    },
    checkLogin() {
      common_vendor.index.login({
        onlyAuthorize: true,
        success: (res) => {
          let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + common_config_index.defaultConfig.appId + "&secret=" + common_config_index.defaultConfig.secret + "&js_code=" + res.code + "&grant_type=authorization_code";
          common_vendor.index.request({
            url,
            method: "GET",
            success: (result) => {
              this.openId = result.data.openid;
              common_vendor.index.setStorageSync(common_config_index.defaultConfig.tokenKey, result.data.openid);
              this.loginUser();
            },
            fail: (err) => {
            }
          });
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    loginUser() {
      common_api_user.login({
        userNo: this.openId,
        imgUrl: this.userInfo.avatarUrl,
        userName: this.userInfo.nickName
      }).then((res) => {
        if (res) {
          common_plugins_utils.utils.hrefTabbar(common_config_index.defaultConfig.routePath.tabbarHome, false);
        }
      });
    }
  })
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.hasUserInfo === false
  }, $data.hasUserInfo === false ? {
    b: $data.imgPath.UserAvatar
  } : {}, {
    c: $data.hasUserInfo === true
  }, $data.hasUserInfo === true ? common_vendor.e({
    d: common_vendor.t($data.userInfo.nickName || $data.userInfo.nickname || $data.userInfo.gender || $data.userInfo.email || $data.userInfo.phoneNumber),
    e: $data.userInfo.avatarUrl || $data.userInfo.avatar_url
  }, $data.userInfo.avatarUrl || $data.userInfo.avatar_url ? {
    f: $data.userInfo.avatarUrl || $data.userInfo.avatar_url
  } : {}) : {}, {
    g: common_vendor.o((...args) => $options.mpGetUserInfo && $options.mpGetUserInfo(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/Works/GitHub/uni-app/pages/permission/permission.vue"]]);
wx.createPage(MiniProgramPage);

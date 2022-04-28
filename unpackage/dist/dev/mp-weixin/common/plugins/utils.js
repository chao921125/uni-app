"use strict";
var common_vendor = require("../vendor.js");
var common_config_color = require("../config/color.js");
var common_config_index = require("../config/index.js");
var utils = {
  toast: function(text, duration, success) {
    common_vendor.index.showToast({
      title: text || "\u51FA\u9519\u5566~",
      icon: success ? "success" : "none",
      duration: duration || 2e3
    });
  },
  modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
    common_vendor.index.showModal({
      title: title || "\u63D0\u793A",
      content,
      showCancel,
      cancelColor: common_config_color.color.modalBtnCancel,
      confirmColor: confirmColor || common_config_color.color.modalBtnConfirm,
      confirmText: confirmText || "\u786E\u5B9A",
      success(res) {
        if (res.confirm) {
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      }
    });
  },
  isAndroid: function() {
    const res = common_vendor.index.getSystemInfoSync();
    return res.platform.toLocaleLowerCase() == "android";
  },
  isPhoneX: function() {
    const res = common_vendor.index.getSystemInfoSync();
    let iphonex = false;
    let models = ["iphonex", "iphonexr", "iphonexsmax", "iphone11", "iphone11pro", "iphone11promax"];
    const model = res.model.replace(/\s/g, "").toLowerCase();
    if (models.includes(model)) {
      iphonex = true;
    }
    return iphonex;
  },
  showLoading: function(title, mask = true) {
    common_vendor.index.showLoading({
      mask,
      title: title || "\u8BF7\u7A0D\u5019..."
    });
  },
  setUserInfo: function(userInfo, token) {
    common_vendor.index.setStorageSync(common_config_index.defaultConfig.tokenKey, token);
    common_vendor.index.setStorageSync(common_config_index.defaultConfig.userKey, userInfo);
  },
  getToken: function() {
    return common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey);
  },
  isLogin: function() {
    return common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey) ? true : false;
  },
  href: function(url, isVerify = true) {
    if (isVerify && !common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey)) {
      common_vendor.index.navigateTo({ url: common_config_index.defaultConfig.routePath.loginPermission });
    } else {
      common_vendor.index.navigateTo({ url });
    }
  },
  hrefTabbar: function(url, isVerify = true) {
    if (isVerify && !common_vendor.index.getStorageSync(common_config_index.defaultConfig.tokenKey)) {
      common_vendor.index.switchTab({ url: common_config_index.defaultConfig.routePath.loginPermission });
    } else {
      common_vendor.index.switchTab({ url });
    }
  },
  back: function() {
    common_vendor.index.navigateBack();
  }
};
exports.utils = utils;

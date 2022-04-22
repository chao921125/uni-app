"use strict";
var common_vendor = require("../vendor.js");
var common_config_color = require("../config/color.js");
var common_config_config = require("../config/config.js");
let ajaxTimes = 1;
const http = {
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
  constNum: function() {
    let time = 0;
    return time;
  },
  delayed: null,
  showLoading: function(title, mask = true) {
    common_vendor.index.showLoading({
      mask,
      title: title || "\u8BF7\u7A0D\u5019..."
    });
  },
  defaultHeader: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Max-Age": "3600",
    "Access": "application/json",
    "Content-Type": "application/json;charset=utf-8",
    "accept": "application/json",
    "Authorization": getToken()
  },
  defaultHeaderFile: {
    "Authorization": getToken()
  },
  request: async function(url, method, params, isForm = false, hideLoading = false) {
    let loadding = false;
    if (!hideLoading) {
      loadding = true;
      http.showLoading();
    }
    if (isForm) {
      Object.assign(http.defaultHeader, { "Content-Type": "application/x-www-form-urlencoded" });
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: common_config_config.config.baseUrl + url,
        data: params,
        header: http.defaultHeader,
        method,
        dataType: "json",
        success: (res) => {
          if (loadding && !hideLoading) {
            common_vendor.index.hideLoading();
          }
          resolve(res.data);
        },
        fail: (res) => {
          common_vendor.index.hideLoading();
          http.toast("\u7F51\u7EDC\u4E0D\u7ED9\u529B\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5~");
          reject(res);
        },
        complete: () => {
          ajaxTimes--;
          if (ajaxTimes <= 0) {
            common_vendor.index.hideLoading();
          }
        }
      });
    });
  },
  uploadFile: function(url, src) {
    http.showLoading();
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: common_config_config.config.baseUrl + url,
        filePath: src,
        name: "imageFile",
        header: http.defaultHeaderFile,
        formData: {},
        success: function(res) {
          common_vendor.index.hideLoading();
          let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}");
          if (d.code % 100 == 0) {
            let fileObj = d.data;
            resolve(fileObj);
          } else {
            that.toast(res.msg);
          }
        },
        fail: function(res) {
          reject(res);
          that.toast(res.msg);
        }
      });
    });
  },
  httpJsonp: function(url, callback, callbackname) {
  },
  setUserInfo: function(userInfo, token) {
    common_vendor.index.setStorageSync(common_config_config.config.tokenKey, token);
    common_vendor.index.setStorageSync(common_config_config.config.userKey, userInfo);
  },
  getToken: function() {
    return common_vendor.index.getStorageSync(common_config_config.config.tokenKey);
  },
  isLogin: function() {
    return common_vendor.index.getStorageSync(common_config_config.config.tokenKey) ? true : false;
  },
  href(url, isVerify = true) {
    if (isVerify && !http.isLogin()) {
      common_vendor.index.navigateTo({ url: common_config_config.config.routePath.login });
    } else {
      common_vendor.index.navigateTo({ url });
    }
  }
};
exports.http = http;

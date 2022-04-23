"use strict";
var common_vendor = require("../vendor.js");
var common_config_index = require("../config/index.js");
var common_plugins_common_utils = require("./common.utils.js");
let ajaxTimes = 1;
let defaultHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Max-Age": "3600",
  "Access": "application/json",
  "Content-Type": "application/json;charset=utf-8",
  "accept": "application/json",
  "Authorization": common_plugins_common_utils.utils.getToken()
};
let defaultHeaderFile = {
  "Authorization": common_plugins_common_utils.utils.getToken()
};
var http = {
  request: async function(url, method, params, isForm = false, hideLoading = false) {
    let loadding = false;
    if (!hideLoading) {
      loadding = true;
      common_plugins_common_utils.utils.showLoading();
    }
    if (isForm) {
      Object.assign(defaultHeader, { "Content-Type": "application/x-www-form-urlencoded" });
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: common_config_index.defaultConfig.baseUrl + url,
        data: params,
        header: defaultHeader,
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
          common_plugins_common_utils.utils.toast("\u7F51\u7EDC\u4E0D\u7ED9\u529B\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5~");
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
    common_plugins_common_utils.utils.showLoading();
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: common_config_index.defaultConfig.baseUrl + url,
        filePath: src,
        name: "imageFile",
        header: defaultHeaderFile,
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
  }
};
exports.http = http;

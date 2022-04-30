"use strict";
var common_api_index = require("./index.js");
var common_plugins_http = require("../plugins/http.js");
function orderUser(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/user/order", "POST", params, false, false);
}
function orderList(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/order/list", "POST", params, false, false);
}
function orderDetail(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/order/alone", "POST", params, false, false);
}
function orderContentList(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/order/contentList", "POST", params, false, true);
}
function orderContentUser(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/order/insertOrderContent", "POST", params, false, false);
}
exports.orderContentList = orderContentList;
exports.orderContentUser = orderContentUser;
exports.orderDetail = orderDetail;
exports.orderList = orderList;
exports.orderUser = orderUser;

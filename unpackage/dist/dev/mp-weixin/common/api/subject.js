"use strict";
var common_api_index = require("./index.js");
var common_plugins_http = require("../plugins/http.js");
function subjectList(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/area/list", "POST", params, false, false);
}
function expertList(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/list", "POST", params, false, false);
}
exports.expertList = expertList;
exports.subjectList = subjectList;
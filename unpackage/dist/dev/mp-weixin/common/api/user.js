"use strict";
var common_api_index = require("./index.js");
var common_plugins_http = require("../plugins/http.js");
function login(params) {
  return common_plugins_http.http.request(common_api_index.config.basePath + "/profic/user/login", "POST", params, false, false);
}
exports.login = login;

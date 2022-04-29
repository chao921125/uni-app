"use strict";
var common_api_index = require("./index.js");
function login(params) {
  return http.request(common_api_index.config.basePath + "/profic/user/login", "POST", params, false, false);
}
exports.login = login;

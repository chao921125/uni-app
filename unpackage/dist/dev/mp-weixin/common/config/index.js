"use strict";
var common_config_routers = require("./routers.js");
var common_config_images = require("./images.js");
var common_config_request = require("./request.js");
var common_config_color = require("./color.js");
var common_config_emoji = require("./emoji.js");
var defaultConfig = {
  color: common_config_color.color,
  emoji: common_config_emoji.emoji,
  baseUrl: common_config_request.request.getBaseUrl(),
  httpCode: common_config_request.request.httpCode,
  tokenKey: "user-access-token",
  userKey: "user-info",
  historySearchKey: "local-history-search",
  appId: "wxa52bb659b38d1ae2",
  secret: "8f20daae39de4842271b28c5e8c9a5e9",
  routePath: common_config_routers.routerPath,
  imgPath: common_config_images.imgPath
};
exports.defaultConfig = defaultConfig;

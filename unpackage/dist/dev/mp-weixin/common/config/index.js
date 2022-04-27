"use strict";
var common_config_routers = require("./routers.js");
var common_config_images = require("./images.js");
var common_config_http_config = require("./http.config.js");
var common_config_color = require("./color.js");
var common_config_emoji = require("./emoji.js");
var defaultConfig = {
  color: common_config_color.color,
  emoji: common_config_emoji.emoji,
  baseUrl: common_config_http_config.httpConfig.getBaseUrl(),
  httpCode: common_config_http_config.httpConfig.httpCode,
  tokenKey: "user-access-token",
  userKey: "user-info",
  historySearchKey: "local-history-search",
  appId: "wxeb407bb6c397aa4c",
  appKey: "675aeecfdac05b6b82b9910a8fd00e88",
  routePath: common_config_routers.routerPath,
  imgPath: common_config_images.imgPath
};
exports.defaultConfig = defaultConfig;

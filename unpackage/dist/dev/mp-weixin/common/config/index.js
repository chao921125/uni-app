"use strict";
function getBaseUrl() {
  {
    return "https://tiku.ilovenever.com";
  }
}
var defaultConfig = {
  baseUrl: getBaseUrl(),
  tokenKey: "user-access-token",
  userKey: "user-info",
  historySearchKey: "local-history-search",
  appId: "wxeb407bb6c397aa4c",
  appKey: "675aeecfdac05b6b82b9910a8fd00e88",
  routePath: {
    tabbarHome: "/pages/tabbar/home",
    tabbarOrder: "/pages/tabbar/order",
    tabbarUser: "/pages/tabbar/user",
    orderExpert: "/pages/order/expert",
    orderPay: "/pages/order/orderPay",
    orderPayResult: "/pages/order/payResult",
    orderList: "/pages/order/list"
  }
};
exports.defaultConfig = defaultConfig;

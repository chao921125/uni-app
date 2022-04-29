"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/tabbar/home.js";
  "./pages/tabbar/order.js";
  "./pages/tabbar/user.js";
  "./pages/permission/permission.js";
  "./pages/order/expert.js";
  "./pages/order/orderPay.js";
  "./pages/order/payResult.js";
  "./pages/order/orderDetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  onError: function() {
    console.log("App Error");
  },
  onUniNViewMessage: function() {
    console.log("App onUniNViewMessage");
  },
  onUnhandledRejection: function() {
    console.log("App UnhandledRejection");
  },
  onPageNotFound: function() {
    console.log("App PageNotFound");
  },
  onThemeChange: function() {
    console.log("App ThemeChange");
  },
  globalData: {
    text: "text"
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/huangchao/Works/GitHub/uni-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return { app };
}
createApp().app.mount("#app");
exports.createApp = createApp;

import App from "./App";

// #ifndef VUE3
import Vue from "vue";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
    ...App
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
// import http from "@/common/plugins/http.js";

export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  // app.config.globalProperties.$http = () => http;
  
  return {
		app,
		Pinia
	};
}
// #endif
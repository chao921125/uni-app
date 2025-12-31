import App from "./App";
import store from "./store";

import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import Vuex from "vuex";

import uviewPlus from "@/uni_modules/uview-plus";

export function createApp() {
	const app = createSSRApp(App);
	app.use(store);
	app.use(Pinia.createPinia());
	app.use(uviewPlus);
	app.config.globalProperties.$adpid = "wxa52bb659b38d1ae2";
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: "00:00:00",
	};
	return {
		app,
		Vuex, // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
		Pinia, // 此处必须将 Pinia 返回
	};
}

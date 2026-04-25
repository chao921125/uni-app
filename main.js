import App from "./App";

import {
	createSSRApp
} from "vue";
import * as Pinia from "pinia";

import UI from "@/common/plugins/ui.js";

import uviewPlus from "@/uni_modules/uview-plus";

export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	app.use(uviewPlus);
	
	app.config.globalProperties.$adpid = "wxa52bb659b38d1ae2";
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: "00:00:00",
	};
	app.config.globalProperties.$ui = UI;

	
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	};
}
import App from "./App";

import {
	createSSRApp
} from "vue";
import * as Pinia from "pinia";

import UI from "@/common/plugins/ui.js";
import errorHandler from "@/common/plugins/error-handler.js";

// TDesign 主题样式（CSS 变量）
import "@/uni_modules/tdesign-uniapp/components/common/style/theme/index.css";

export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	
	// 初始化全局错误处理
	errorHandler.init();
	
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
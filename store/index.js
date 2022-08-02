import { createStore } from "vuex";
import fetch from "@/common/plugins/http.js";
import defaultConfig from "@/common/config/index.js";

const store = createStore({
	state: {
		//用户登录手机号
		mobile: uni.getStorageSync(defaultConfig.tokenKey) || "",
		//是否登录 项目中改为真实登录信息判断，如token
		isLogin: uni.getStorageSync(defaultConfig.tokenKey) ? true : false,
		//登录后跳转的页面路径 + 页面参数
		returnUrl: "",
		//app版本
		version: "1.1.1",
		//当前是否有网络连接
		networkConnected: true,
		isOnline: true
	},
	mutations: {
		login(state, payload) {
			if (payload) {
				state.mobile = payload.mobile;
			}
			state.isLogin = true;
		},
		logout(state) {
			state.mobile = "";
			state.isLogin = false;
			state.returnUrl = "";
		},
		setReturnUrl(state, returnUrl) {
			state.returnUrl = returnUrl;
		},
		networkChange(state, payload) {
			state.networkConnected = payload.isConnected;
		},
		setOnline(state, payload) {
			state.isOnline = state.isOnline;
		}
	},
	getters: {
		// currentColor(state) {
		// 	return state.colorList[state.colorIndex]
		// }
	},
	actions: {
		getOnlineStatus: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				// #ifndef MP-WEIXIN
				resolve(true);
				// #endif
				// #ifdef MP-WEIXIN
				if (state.isOnline) {
					resolve(state.isOnline);
				} else {
					fetch.request("/Home/GetStatus", "GET", {}, false, true, true).then((res) => {
						if (res.code == 100 && res.data == 1) {
							commit("setOnline", {
								isOnline: true
							});
							resolve(true)
						} else {
							commit("setOnline", {
								isOnline: false
							});
							resolve(false);
						}
					}).catch((res) => {
						reject(false);
					})
				}
				// #endif
			})
		}
	}
})

export default store;

import {
    defineStore
} from "pinia";
import http from "@/common/plugins/http.js";
import config from "@/common/config/index.js";

export const useCounterStore = defineStore("counter", {
    state: () => {
        return {
            //用户登录手机号
            mobile: uni.getStorageSync(config.tokenKey) || "",
            //是否登录 项目中改为真实登录信息判断，如token
            isLogin: uni.getStorageSync(config.tokenKey) ? true : false,
            //登录后跳转的页面路径 + 页面参数
            returnUrl: "",
            //app版本
            version: "1.1.1",
            //当前是否有网络连接
            networkConnected: true,
            isOnline: true,
        };
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        login(payload) {
            if (payload) {
                this.mobile = payload.mobile;
            }
            this.isLogin = true;
        },
        logout() {
            this.mobile = "";
            this.isLogin = false;
            this.returnUrl = "";
        },
        setReturnUrl(returnUrl) {
            this.returnUrl = returnUrl;
        },
        networkChange(payload) {
            this.networkConnected = payload.isConnected;
        },
        setOnline() {
            this.isOnline = this.isOnline;
        },
        getOnlineStatus: async function({
            commit
        }) {
            return await new Promise((resolve, reject) => {
                // #ifndef MP-WEIXIN
                resolve(true);
                // #endif
                // #ifdef MP-WEIXIN
                if (this.isOnline) {
                    resolve(this.isOnline);
                } else {
                    http
                        .request("/Home/GetStatus", "GET", {}, false, true, true)
                        .then((res) => {
                            if (res.code == 100 && res.data == 1) {
                                commit("setOnline", {
                                    isOnline: true,
                                });
                                resolve(true);
                            } else {
                                commit("setOnline", {
                                    isOnline: false,
                                });
                                resolve(false);
                            }
                        })
                        .catch((res) => {
                            reject(false);
                        });
                }
                // #endif
            });
        },
    },
});
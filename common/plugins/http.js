import color from "@/common/config/color.js";
import config from "@/common/config/config.js";

let ajaxTimes = 1;

const http = {
	toast: function(text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success ? "success" : "none",
			duration: duration || 2000
		});
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: title || "提示",
			content: content,
			showCancel: showCancel,
			cancelColor: color.modalBtnCancel,
			confirmColor: confirmColor || color.modalBtnConfirm,
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true);
				} else {
					callback && callback(false);
				}
			}
		});
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android";
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models = ["iphonex", "iphonexr", "iphonexsmax", "iphone11", "iphone11pro", "iphone11promax"];
		const model = res.model.replace(/\s/g, "").toLowerCase();
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time;
	},
	delayed: null,
	showLoading: function(title, mask = true) {
		uni.showLoading({
			mask: mask,
			title: title || "请稍候..."
		})
	},
    defaultHeader: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Max-Age": "3600",
        "Access": "application/json",
        "Content-Type": "application/json;charset=utf-8",
        "accept": "application/json",
        "Authorization": getToken()
    },
    defaultHeaderFile: {
        "Authorization": getToken()
    },
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param boolean isForm 数据格式
	 *  true: "application/x-www-form-urlencoded"
	 *  false:"application/json"
	 * @param boolean hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: async function(url, method, params, isForm = false, hideLoading = false) {
		//接口请求
		let loadding = false;
		if (!hideLoading) {
            loadding = true;
            http.showLoading();
		}
        if (isForm) {
            Object.assign(http.defaultHeader, { "Content-Type": "application/x-www-form-urlencoded" })
        }

		return new Promise((resolve, reject) => {
			uni.request({
				url: config.baseUrl + url,
				data: params,
				header: http.defaultHeader,
				method: method, //"GET","POST"
				dataType: "json",
				success: (res) => {
					if (loadding && !hideLoading) {
						uni.hideLoading();
					}
					resolve(res.data);
				},
				fail: (res) => {
                    uni.hideLoading();
					http.toast("网络不给力，请稍后再试~");
					reject(res);
				},
                complete: () => {
                    ajaxTimes--;
                    if (ajaxTimes <= 0){
                        // 关闭正在等待的图标
                        uni.hideLoading();
                    }
                }
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src) {
		http.showLoading()
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: config.baseUrl + url,
				filePath: src,
				name: "imageFile",
				header: http.defaultHeaderFile,
				formData: {},
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						that.toast(res.msg);
					}
				},
				fail: function(res) {
					reject(res)
					that.toast(res.msg);
				}
			})
		})
	},
	httpJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let httpScript = document.createElement("script");
		httpScript.src = url;
		httpScript.type = "text/javascript";
		document.head.appendChild(httpScript);
		document.head.removeChild(httpScript);
		// #endif
	},
	//设置用户信息
	setUserInfo: function(userInfo, token) {
		uni.setStorageSync(config.tokenKey, token);
		uni.setStorageSync(config.userKey, userInfo);
	},
	//获取token
	getToken: function() {
		return uni.getStorageSync(config.tokenKey);
	},
	//判断是否登录
	isLogin: function() {
		return uni.getStorageSync(config.tokenKey) ? true : false;
	},
	//跳转页面，校验登录状态
	href(url, isVerify = true) {
		if (isVerify && !http.isLogin()) {
			uni.navigateTo({ url: config.routePath.login });
		} else {
			uni.navigateTo({ url: url });
		}
	},
};

export default http;

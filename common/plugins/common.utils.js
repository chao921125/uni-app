import color from "@/common/config/color.js";
import defaultConfig from "@/common/config/index.js";

export default {
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
	showLoading: function(title, mask = true) {
		uni.showLoading({
			mask: mask,
			title: title || "请稍候..."
		})
	},
	//设置用户信息
	setUserInfo: function(userInfo, token) {
		uni.setStorageSync(defaultConfig.tokenKey, token);
		uni.setStorageSync(defaultConfig.userKey, userInfo);
	},
	//获取token
	getToken: function() {
		return uni.getStorageSync(defaultConfig.tokenKey);
	},
	//判断是否登录
	isLogin: function() {
		return uni.getStorageSync(defaultConfig.tokenKey) ? true : false;
	},
	//跳转页面，校验登录状态
	href(url, isVerify = true) {
		if (isVerify && !http.isLogin()) {
			uni.navigateTo({ url: defaultConfig.routePath.login });
		} else {
			uni.navigateTo({ url: url });
		}
	}
}
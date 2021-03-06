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
	removeUserInfo: function() {
		uni.removeStorageSync(defaultConfig.tokenKey);
		uni.removeStorageSync(defaultConfig.userKey);
	},
	//获取token
	setToken: function(token) {
		uni.setStorageSync(defaultConfig.tokenKey, token);
	},
	//获取token
	getToken: function() {
		return uni.getStorageSync(defaultConfig.tokenKey);
	},
	//判断是否登录
	checkPermiss: function() {
		if (!uni.getStorageSync(defaultConfig.tokenKey)) {
			uni.reLaunch({ url: defaultConfig.routePath.login });
		}
	},
	//判断是否登录
	isLogin: function() {
		return uni.getStorageSync(defaultConfig.tokenKey) ? true : false;
	},
	//跳转页面，校验登录状态，如果为了做APP那么需要做一些处理 使用 redirectTo
	// animationType https://uniapp.dcloud.io/api/router.html#animation
	// animationDuration 300
	gotoUrl: function(url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(defaultConfig.tokenKey)) {
			uni.navigateTo({ url: defaultConfig.routePath.login });
		} else {
			uni.navigateTo({ url: url });
		}
	},
	gotoUrlClose: function(url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(defaultConfig.tokenKey)) {
			uni.redirectTo({ url: defaultConfig.routePath.login });
		} else {
			uni.redirectTo({ url: url });
		}
	},
	gotoUrlCloseAll: function(url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(defaultConfig.tokenKey)) {
			uni.reLaunch({ url: defaultConfig.routePath.login });
		} else {
			uni.reLaunch({ url: url });
		}
	},
	gotoTab: function(url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(defaultConfig.tokenKey)) {
			uni.switchTab({ url: defaultConfig.routePath.login });
		} else {
			uni.switchTab({ url: url });
		}
	},
	gotoBack: function(delta = 1) {
		uni.navigateBack({ delta: delta });
	},
}
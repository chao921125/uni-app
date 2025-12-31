import Constants from "@/common/utils/constant.js";

export default {
	getSysInfo: async function () {
		// 微信小程序已经不再支持
		let res = {};
		// #ifndef MP-WEIXIN
		res = await uni.getSystemInfo();
		// #endif
		// #ifdef MP-WEIXIN
		const device = await uni.getDeviceInfo();
		const wind = await uni.getWindowInfo();
		const app = await uni.getAppBaseInfo();
		const appAuth = await uni.getAppAuthorizeSetting();
		const sysSet = await uni.getSystemSetting();
		res = Object.assign(device, wind, app, appAuth, sysSet);
		// #endif
		return res;
	},
	openAppAuth: function () {
		// 打开系统权限管理
		uni.openAppAuthorizeSetting({
			success(res) {
				console.log(res);
			},
		});
	},
	toast: function (text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success ? "success" : "none",
			duration: duration || 2000,
		});
	},
	modal: function (title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: title || "提示",
			content: content,
			showCancel: showCancel,
			cancelColor: Constants.color.modalBtnCancel,
			confirmColor: confirmColor || Constants.color.modalBtnConfirm,
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true);
				} else {
					callback && callback(false);
				}
			},
		});
	},
	isAndroid: function () {
		const res = uni.getDeviceInfo();
		return res.platform.toLocaleLowerCase() == "android";
	},
	isPhone: function () {
		const res = uni.getDeviceInfo();
		let iphone = false;
		const model = res.model.replace(/\s/g, "").toLowerCase();
		if (model.includes("iphone")) {
			iphone = true;
		}
		return iphone;
	},
	showLoading: function (title, mask = true) {
		uni.showLoading({
			mask: mask,
			title: title || "请稍候...",
		});
	},
	//设置用户信息
	setUserInfo: function (userInfo, token) {
		uni.setStorageSync(Constants.tokenKey, token);
		uni.setStorageSync(Constants.userKey, userInfo);
	},
	removeUserInfo: function () {
		uni.removeStorageSync(Constants.tokenKey);
		uni.removeStorageSync(Constants.userKey);
	},
	//设置token
	setToken: function (token) {
		uni.setStorageSync(Constants.tokenKey, token);
	},
	//获取token
	getToken: function () {
		return uni.getStorageSync(Constants.tokenKey);
	},
	//登录拦截
	checkPermiss: function () {
		if (!uni.getStorageSync(Constants.tokenKey)) {
			uni.reLaunch({
				url: Constants.routePath.login,
			});
		}
	},
	//判断是否登录
	isLogin: function () {
		return uni.getStorageSync(Constants.tokenKey) ? true : false;
	},
	//跳转页面，校验登录状态，如果为了做APP那么需要做一些处理 使用 redirectTo
	// animationType https://uniapp.dcloud.io/api/router.html#animation
	// animationDuration 300
	gotoPage: function (url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(Constants.tokenKey)) {
			uni.navigateTo({
				url: Constants.routePath.login,
			});
		} else {
			uni.navigateTo({
				url: url,
			});
		}
	},
	gotoPageClose: function (url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(Constants.tokenKey)) {
			uni.redirectTo({
				url: Constants.routePath.login,
			});
		} else {
			uni.redirectTo({
				url: url,
			});
		}
	},
	gotoPageCloseAll: function (url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(Constants.tokenKey)) {
			uni.reLaunch({
				url: Constants.routePath.login,
			});
		} else {
			uni.reLaunch({
				url: url,
			});
		}
	},
	gotoPageTab: function (url, isVerify = true) {
		if (isVerify && !uni.getStorageSync(Constants.tokenKey)) {
			uni.switchTab({
				url: Constants.routePath.login,
			});
		} else {
			uni.switchTab({
				url: url,
			});
		}
	},
	gotoPageBack: function (delta = 1) {
		uni.navigateBack({
			delta: delta,
		});
	},
};

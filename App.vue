<script>
import { mapMutations } from "vuex";
import { version } from "./package.json";
import { storeHeight } from "@/store/navHeight.js";
import Storage from "@/common/plugins/storage.js";
import Constants from "@/common/utils/constants.js";

export default {
	onLaunch: function () {
		console.log("App Launch");

		// 设置小程序分享
		wx.showShareMenu({
			withShareTicket: true,
			menus: ["shareAppMessage", "shareTimeline"],
		});
		// 隐藏原生的tabbar
		// uni.hideTabBar();
	},
	onShow: function () {
		// #ifndef H5 || APP-PLUS
		//判断当前微信版本是否支持版本更新
		if (uni.canIUse("getUpdateManager")) {
			const updateManager = uni.getUpdateManager();
			// 请求完新版本信息的回调
			updateManager.onCheckForUpdate(function (res) {
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						uni.showModal({
							title: "更新提示",
							content: "新版本已经准备好，是否重启应用？",
							success: function (res) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							},
						});
					});
					// 新的版本下载失败
					updateManager.onUpdateFailed(function () {
						uni.showModal({
							title: "已经有新版本了哟~",
							content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
						});
					});
				}
			});
		} else {
			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			uni.showModal({
				title: "提示",
				content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
			});
		}
		// #endif

		uni.getSystemInfo({
			success: (e) => {
				let statusBar = 0;
				let custom = 0;
				let customBar = 0;
				// #ifdef MP-WEIXIN
				statusBar = e.statusBarHeight;
				custom = wx.getMenuButtonBoundingClientRect();
				customBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif
				storeHeight().setHeightStatus(statusBar);
				storeHeight().setHeightBound(custom.height || 0);
				storeHeight().setHeightNav(customBar);
				Storage.setStorageSync(Constants.key.heightStatus, statusBar);
				Storage.setStorageSync(Constants.key.heightBound, custom.height || 0);
				Storage.setStorageSync(Constants.key.heightNav, customBar);
			},
		});
		// 隐藏原生的tabbar
		// uni.hideTabBar();
		console.log("App Show");
	},
	// 只能在App.vue里监听应用的生命周期
	onHide: function () {
		console.log("App Hide");
	},
	onError: function () {
		console.log("App Error");
	},
	onUniNViewMessage: function () {
		console.log("App UniNViewMessage");
	},
	onUnhandledRejection: function () {
		console.log("App UnhandledRejection");
	},
	onPageNotFound: function () {
		console.log("App PageNotFound");
	},
	onThemeChange: function () {
		console.log("App ThemeChange");
	},
	globalData: {
		test: "CCNET",
	},
	methods: {
		...mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"]),
	},
};
</script>

<style lang="scss">
// 组件
// @import "@/uni_modules/uni-scss/index.scss";
@import "@/uni_modules/uview-plus/index.scss";
@import "@/static/styles/index.scss";
</style>

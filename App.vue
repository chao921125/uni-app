<script>
import { storeHeight } from "@/store/navHeight.js";
import Storage from "@/common/plugins/storage.js";
import Constants from "@/common/utils/constants.js";

export default {
	onLaunch: function () {
		console.log("App Launch");

		// 设置小程序分享
		// #ifdef MP-WEIXIN
		uni.showShareMenu({
			withShareTicket: true,
			menus: ["shareAppMessage", "shareTimeline"],
		});
		// #endif

		// #ifdef MP-WEIXIN
		const custom = uni.getMenuButtonBoundingClientRect();
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
	},
	onShow: function () {
		// #ifndef H5 || APP-PLUS
		if (uni.canIUse("getUpdateManager")) {
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate((res) => {
				if (res.hasUpdate) {
					updateManager.onUpdateReady(() => {
						// 避免重复弹窗
						if (this._updateModalShown) return;
						this._updateModalShown = true;

						uni.showModal({
							title: "更新提示",
							content: "新版本已经准备好，是否重启应用？",
							success: (res) => {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
								this._updateModalShown = false;
							},
						});
					});

					updateManager.onUpdateFailed(() => {
						uni.showModal({
							title: "更新失败",
							content: "新版本下载失败，请删除当前小程序后重新打开",
						});
					});
				}
			});
		}
		// #endif
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
	onExit() {
		console.log("App Exit");
	},
};
</script>

<style lang="scss">
// 组件
// @import "@/uni_modules/uni-scss/index.scss";
@import "@/uni_modules/uview-plus/index.scss";
@import "@/static/styles/index.scss";
</style>

<script>
import { storeHeight } from "@/store/navHeight.js";
import Storage from "@/common/plugins/storage.js";
import Constants from "@/common/utils/constants.js";
import { injectSystemVars, watchSystemChange } from "@/common/plugins/system.js";

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

		// 启动时注入 CSS 变量
		injectSystemVars(); // 监听屏幕变化（可选）
		watchSystemChange((metrics) => {
			console.log("📱 屏幕变化:", metrics.windowWidth, metrics.windowHeight);
			// 可在此触发页面重布局
		});

		// 全局未捕获的Promise错误处理
		// #ifndef H5
		if (typeof Promise !== "undefined") {
			Promise.prototype.catch = (function (originalCatch) {
				return function (onRejected) {
					return originalCatch.call(this, function (reason) {
						// 记录错误但不阻止传播
						console.error("[Global] Unhandled Promise Rejection:", reason);
						if (onRejected) {
							return onRejected(reason);
						}
						throw reason;
					});
				};
			})(Promise.prototype.catch);
		}
		// #endif
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
	onError: function (err) {
		console.error("[App Error]", err);
		// 可以在这里上报错误到监控系统
		// reportError(err);
	},
	onUniNViewMessage: function () {
		console.log("App UniNViewMessage");
	},
	onUnhandledRejection: function (res) {
		// res 包含 reason 和 promise 属性
		console.error("[UnhandledRejection]", res?.reason || res);
		
		// 开发环境显示详细错误
		// #ifdef DEV
		if (res?.reason) {
			console.error("错误详情:", res.reason);
			console.error("错误堆栈:", res.reason?.stack);
		}
		// #endif
		
		// 生产环境可以上报错误日志
		// reportError(res?.reason);
		
		// 给用户友好提示（可选）
		// uni.showToast({
		//   title: '程序出现异常',
		//   icon: 'none'
		// });
	},
	onPageNotFound: function (res) {
		console.warn("[PageNotFound]", res);
		// 页面不存在时的处理
		uni.redirectTo({
			url: "/pages/tabbar",
		});
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

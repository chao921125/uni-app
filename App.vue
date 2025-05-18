<script>
import { mapMutations } from "vuex";
import { version } from "./package.json";
import { useHeightStore } from "@/store/height.js";
// #ifdef APP
import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";
// #endif

export default {
	onLaunch: function () {
		console.log("App Launch");
		// #ifdef APP-PLUS
		// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=4542
		if (plus.runtime.appid !== "HBuilder") {
			// 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
			checkUpdate();
		}

		// 一键登录预登陆，可以显著提高登录速度
		uni.preLogin({
			provider: "univerify",
			success: (res) => {
				// 成功
				this.setUniverifyErrorMsg();
				console.log("preLogin success: ", res);
			},
			fail: (res) => {
				this.setUniverifyLogin(false);
				this.setUniverifyErrorMsg(res.errMsg);
				// 失败
				console.log("preLogin fail res: ", res);
			},
		});
		// #endif
		// 设置小程序分享
		wx.showShareMenu({
			withShareTicket: true,
			menus: ["shareAppMessage", "shareTimeline"],
		});
		// 隐藏原生的tabbar，太丑了
		uni.hideTabBar();
	},
	onShow: function () {
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
				useHeightStore().setHeightStatus(statusBar);
				useHeightStore().setHeightBound(custom.height || 0);
				useHeightStore().setHeightNav(customBar);
			},
		});
		// 隐藏原生的tabbar，太丑了
		uni.hideTabBar();
		console.log("App Show");
	},
	onHide: function () {
		console.log("App Hide");
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
		test: "CC APP",
	},
	methods: {
		...mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"]),
	},
};
</script>

<style lang="scss">
@import "@/uni_modules/uni-scss/index.scss";
</style>

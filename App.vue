<script>
import { mapMutations } from "vuex";
import { version } from "./package.json";
import { useHeightStore } from "@/store/height.js";

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
		test: "CC APP",
	},
	methods: {
		...mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"]),
	},
};
</script>

<style lang="scss">
// 组件
@import "@/uni_modules/uni-scss/index.scss";
@import "@/wxcomponents/vant/common/index.wxss";
@import "@/static/styles/index.scss";
</style>

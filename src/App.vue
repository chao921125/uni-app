<script>
	import config from "@/config/index";
	
	export default {
		globalData: {
			title: "CC NET",
		},
		// 只能在App.vue里, 当uni-app 初始化完成时触发（全局只触发一次）
		onLaunch: function () {
			config.loadFontFace();
			// 设置小程序分享
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"],
			});
		},
		onError: function (e) {
			console.log("App Error", e);
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
		onExit: function () {
			console.log("App onExit");
		},
		// 仅执行一次
		onLoad: function () {
			console.log("App onLoad");
		},
		// 重复执行
		onShow: function () {
			console.log("App onShow");
		},
		onReady: function () {
			console.log("App onReady");
		},
		onHide: function () {
			console.log("App onHide");
		},
		onUnload: function () {
			console.log("App onUnload");
		},
		onResize: function () {
			console.log("App onResize");
		},
		onPullDownRefresh: function () {
			console.log("App onPullDownRefresh");
		},
		onReachBottom: function () {
			console.log("App onReachBottom");
		},
		onTabItemTap: function () {
			console.log("App onTabItemTap");
		},
		onShareAppMessage: function () {
			console.log("App onShareAppMessage");
		},
		onPageScroll: function () {
			console.log("App onPageScroll");
		},
		onNavigationBarButtonTap: function () {
			console.log("App onNavigationBarButtonTap");
		},
		onBackPress: function () {
			console.log("App onBackPress");
		},
		onNavigationBarSearchInputChanged: function () {
			console.log("App onNavigationBarSearchInputChanged");
		},
		onNavigationBarSearchInputConfirmed: function () {
			console.log("App onNavigationBarSearchInputConfirmed");
		},
		onNavigationBarSearchInputClicked: function () {
			console.log("App onNavigationBarSearchInputClicked");
		},
		onShareTimeline: function () {
			console.log("App onShareTimeline");
		},
		onAddToFavorites: function () {
			console.log("App onAddToFavorites");
		},
	};
</script>

<style lang="scss">
	/* 组件 */
	// @use "@/wxcomponents/vant/common/index.wxss";
	/* 每个页面公共css */
	@use "@/static/styles/index.scss";
	@use "@/static/styles/pages.scss";
</style>

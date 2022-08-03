<script>
    // onLaunch	当uni-app 初始化完成时触发（全局只触发一次）
    // onShow	当 uni-app 启动，或从后台进入前台显示
    // onHide	当 uni-app 从前台进入后台
    // onError	当 uni-app 报错时触发
    // onUniNViewMessage	对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯(opens new window)
    // onUnhandledRejection	对未处理的 Promise 拒绝事件监听函数（2.8.1+）
    // onPageNotFound	页面不存在监听函数
    // onThemeChange	监听系统主题变化
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/uni-methods.js";
	export default {
		onLaunch: function() {
			utils.setToken("123");
			if (utils.getToken()) {
				let routes = getCurrentPages();
				if (routes.length) {
					let curRoute = routes[routes.length - 1].route;
					if (defaultConfig.routePath.whiteList.inclouds(curRoute)) {
						utils.gotoTab(defaultConfig.routePath.tabbarHome, true);
					}
				}
			} else {
				utils.gotoUrl(defaultConfig.routePath.login, false);
			}
		},
		onShow: function() {
		},
		onHide: function() {
		},
		onError: function(e) {
			console.log('App Error', e)
		},
		onUniNViewMessage: function() {
		},
		onUnhandledRejection: function() {
		},
		onPageNotFound: function() {
		},
		onThemeChange: function() {
		},
		// getApp().globalData.testText = 'test'
		globalData: {  
			testText: 'text'  
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css，且无需更改其他文件 */
	@import "@/static/style/index.scss";
</style>

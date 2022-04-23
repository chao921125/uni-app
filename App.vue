<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError: function() {
			console.log('App Error')
		},
		onUnhandledRejection: function() {
			console.log('App UnhandledRejection')
		},
		onPageNotFound: function() {
			console.log('App PageNotFound')
		},
		onThemeChange: function() {
			console.log('App ThemeChange')
		},
		// getApp().globalData.text = 'test'
		globalData: {  
			text: 'text'  
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css，且无需更改其他文件 */
	@import "@/static/style/index.scss";
</style>

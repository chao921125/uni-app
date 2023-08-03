<script>
	export default {
		onLaunch: function () {
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			});
			console.log("App Launch");
		},
		onShow: function () {
			console.log("App Show");
		},
		onHide: function () {
			console.log("App Hide");
		},
	};
</script>

<style>
	.container {
		padding: 15px;
	}

	button {
		margin-bottom: 15px;
	}
</style>

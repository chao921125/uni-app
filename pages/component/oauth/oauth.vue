<template>
	<uni-popup>
		
		<!-- 非个人小程序 如果用手机号登录，获取手机号码相关信息 -->
		<!-- <button type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">手机号一键登录</button> -->
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 手机登录时获取手机号码相关信息的函数
			getPhoneNumber(e) {
				console.log(e);
			},
		}
	}
</script>

<style lang="scss">

</style>

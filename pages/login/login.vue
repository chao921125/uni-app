<template>
	<view class="view-box login-box">
		<image class="login-bg"></image>
		<view class="login-form">
			<view class="cc-flex-center login-title">登录</view>
			<view class="cc-flex-center form-phone"></view>
			<view class="cc-flex-center form-code"></view>
			<view class="cc-flex-center form-btn"><button class="btn">登录</button></view>
			<view class="cc-flex-center login-wx"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.login-box {
		position: relative;
		z-index: 1;
		.login-bg {
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
		}
	}
</style>

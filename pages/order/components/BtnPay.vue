<template>
	<view class="btn-space"></view>
	<view class="btn-bottom re-flex-row-between re-z-index-90">
		<button type="primary" class="btn" @click="cancel">取消</button>
		<button type="primary" class="btn" @click="toOrderPayResult">支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			cancel() {
				this.$emit("cancel", null);
			},
			toOrderPayResult() {
				this.$emit("pay", null);
			}
		}
	}
</script>

<style lang="scss">
.btn-space {
	width: 100%;
	height: 100rpx;
}
.btn-bottom {
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0;
	.btn {
		width: 50%;
		height: 100rpx;
	}
}
</style>

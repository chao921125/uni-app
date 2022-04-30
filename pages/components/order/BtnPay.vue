<template>
	<view class="btn-space"></view>
	<view class="btn-bottom re-flex-row-between re-z-index-80">
        <view class="btn-box btn-left"><button type="primary" class="btn" @click="cancel">取消</button></view>
        <view class="btn-box btn-right"><button type="primary" class="btn" @click="toOrderPayResult">支付</button></view>
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
	height: 120rpx;
    padding-bottom: constant(safe-area-inset-bottom); 
    padding-bottom: env(safe-area-inset-bottom); 
}
.btn-bottom {
	background-color: #FFF;
	width: 100%;
	height: 120rpx;
	position: fixed;
	bottom: 0;
    box-shadow: 0 -10rpx 10rpx 0 #D3D3D3;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .btn-box {
        width: 50%;
        padding: 20rpx 40rpx;
    }
	.btn {
		height: 80rpx;
        line-height: 80rpx;
	}
}
</style>

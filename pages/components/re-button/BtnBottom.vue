<template>
	<view class="btn-space"></view>
	<view class="btn-bottom re-flex-row-between re-z-index-80">
        <view class="btn-box btn-right"><button type="primary" :disabled="disabled" class="btn btn-confirm" @click="confirm">{{textConfirm}}</button></view>
	</view>
</template>

<script>
	import { ref, reactive, watchEffect } from "vue";
	
	export default {
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			defaultConfirm: {
				type: String,
				default: "提交"
			}
		},
		setup(props, context) {
			const textConfirm = ref(props.defaultConfirm);
			
			function confirm() {
				context.emit("confirm", true);
			}
			
			return {
				textConfirm,
				
				confirm,
			}
		},
	}
</script>

<style lang="scss">
.btn-space {
	width: 100%;
	height: 120rpx;
	background-color: #FFF;
    padding-bottom: constant(safe-area-inset-bottom); 
    padding-bottom: env(safe-area-inset-bottom); 
}
.btn-bottom {
	width: 100%;
	height: 120rpx;
	background-color: #FFF;
	position: fixed;
	bottom: 0;
    box-shadow: 0 -10rpx 10rpx 0 #D3D3D3;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .btn-box {
        width: 100%;
        padding: 20rpx 40rpx;
    }
	.btn {
		height: 80rpx;
        line-height: 80rpx;
	}
}
</style>

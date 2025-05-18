<template>
	<view class="container fixed-bottom safe-area-bottom">
		<view class="fixed-btn">
			<button
				class="btn-primary btn-short"
				@tap="changeClick"
				>{{ props.btnText }}</button
			>
		</view>
	</view>
	<view class="fixed-bottom-safe safe-area-bottom"></view>
</template>

<script setup name="">
	const props = defineProps({
		btnText: {
			required: true,
			type: String,
			default: "Confirm",
		},
	});
	const emits = defineEmits(["click"]);
	const changeClick = () => {
		emits("click", true);
	};
	defineExpose({
		changeClick,
	});
</script>

<style scoped lang="scss">
	.fixed-bottom-safe {
		height: 100rpx;
	}
	.fixed-bottom {
		width: calc(100% - 40rpx);
		position: fixed;
		z-index: 999;
		bottom: 0;
		.fixed-btn {
		}
	}
	.btn-short {
		width: 180rpx;
		background: #000000;
		border-radius: 10rpx;
		float: right;
	}
</style>

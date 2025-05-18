<template>
	<uni-popup
		ref="dialog"
		:type="props.type"
		background-color="#fff">
		<view class="dialog-container">
			<view class="content-text">{{ props.content }}</view>
			<view class="btn-box">
				<button
					class="btn btn-left"
					@tap="onCancel"
					>Cancel</button
				>
				<button
					class="btn btn-right"
					@tap="onConfirm"
					>Confirm</button
				>
			</view>
		</view>
	</uni-popup>
</template>

<script setup name="">
	import { ref } from "vue";
	const props = defineProps({
		type: {
			required: false,
			type: String,
			default: "center",
		},
		title: { required: false, type: String, default: "Title" },
		content: {
			required: false,
			type: String,
			default: "Tips",
		},
	});

	const dialog = ref();
	const open = () => {
		dialog.value.open();
	};
	const close = () => {
		dialog.value.close();
	};
	defineExpose({
		open,
		close,
	});

	const emits = defineEmits(["onCancel", "onConfirm"]);
	const onCancel = () => {
		emits("onCancel", true);
	};
	const onConfirm = () => {
		emits("onConfirm", true);
	};
</script>

<style scoped lang="scss">
	.dialog-container {
		padding: 70rpx 40rpx;
		.content-text {
			font-size: 30rpx;
			font-family: SFPro-Semibold, SFPro;
			font-weight: 600;
			color: #000000;
			line-height: 30rpx;
			text-align: center;
		}
		.btn-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 66rpx;
			.btn {
				width: 180rpx;
				padding: 11rpx 37rpx 13rpx;
				border-radius: 10rpx;
				font-size: 30rpx;
				font-family: SFPro-Black, SFPro;
				font-weight: 900;
				line-height: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
			.btn-left {
				border: 2rpx solid #979797;
				color: #000000;
				margin-right: 30rpx;
			}
			.btn-right {
				background: #000000;
				color: #00ffff;
				margin-left: 30rpx;
			}
		}
	}
</style>

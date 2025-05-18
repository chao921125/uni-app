<template>
	<uni-popup
		ref="popup"
		class="popup-body"
		background-color="#F7F7F7"
		:type="props.type"
		:is-mask-click="isMask">
		<view
			class="container popup-content"
			:class="{ 'popup-height': props.type === 'left' || props.type === 'right' }">
			<button
				class="popup-btn"
				@tap="openCamera"
				>Take a Photo</button
			>
			<button
				class="popup-btn"
				@tap="openPhoto"
				>Go to album selection</button
			>
			<button
				v-if="props.isShowDelete"
				class="popup-btn"
				@tap="deletePhoto"
				>Delete</button
			>
			<view
				class="re-text-center popup-text"
				@tap="cancel"
				>Cancel</view
			>
		</view>
	</uni-popup>
</template>

<script setup name="">
	import { ref } from "vue";
	const props = defineProps({
		type: {
			required: false,
			type: String,
			default: "bottom",
		},
		count: {
			required: false,
			type: Number,
			default: 1,
		},
		isShowDelete: {
			required: false,
			type: Boolean,
			default: false,
		},
		isMask: {
			type: Boolean,
			default: true,
		},
	});
	const emits = defineEmits(["open", "close", "result", "delete"]);

	const popup = ref(null);
	const open = () => {
		popup.value.open(props.type);
	};
	const close = () => {
		popup.value.close();
	};
	const cancel = () => {
		emits("close", false);
	};

	const openCamera = () => {
		uni.chooseImage({
			count: props.count,
			sourceType: ["camera"],
			success: (e) => {
				emits("result", e);
			},
			complete: () => {
				close();
			},
		});
	};
	const openPhoto = () => {
		uni.chooseImage({
			count: props.count,
			sourceType: ["album"],
			success: (e) => {
				emits("result", e);
			},
			complete: () => {
				close();
			},
		});
	};
	const deletePhoto = () => {
		emits("delete", true);
	};

	defineExpose({
		open,
		close,
	});
</script>

<style scoped lang="scss">
	.popup-body {
		background-color: #f7f7f7;
	}
	.popup-btn {
		background: #ffffff;
		border-radius: 10rpx;
		font-size: 36rpx;
		font-family: SFPro-Semibold, SFPro;
		font-weight: 600;
		color: #000000;
		line-height: 43rpx;
		padding-top: 9rpx;
		padding-bottom: 8rpx;
		margin-top: 20rpx;
	}
	.popup-text {
		font-size: 36rpx;
		font-family: SFPro-Black, SFPro;
		font-weight: 900;
		color: #000000;
		line-height: 43rpx;
		margin-top: 39rpx;
	}
</style>

<template>
	<view
		class="re-btn-fixed"
		:style="styleObj">
		<view
			v-if="props.position === 'top'"
			class="re-w-fill nav-status"></view>
		<view class="re-w-fill">
			<button
				class="re-w-fill btn-primary"
				@tap="changeClick">
				<slot>{{ props.text }}</slot>
			</button>
		</view>
		<view
			v-if="props.position === 'bottom'"
			class="re-w-fill safe-area-bottom"></view>
	</view>
</template>

<script setup name="TempScriptSetup">
	import { onMounted, ref } from "vue";
	const props = defineProps({
		text: {
			required: true,
			type: String,
			default: "button",
		},
		width: {
			required: true,
			type: Number,
			default: "100%",
		},
		position: {
			required: false,
			type: String,
			default: "top",
		},
		topVal: { required: false, type: Number, default: 0 },
		bottompVal: { required: false, type: Number, default: 0 },
		leftpVal: { required: false, type: Number, default: 0 },
		rightpVal: { required: false, type: Number, default: 0 },
		zIndex: {
			required: false,
			type: Number,
			default: 998,
		},
	});

	const styleObj = ref({});

	onMounted(() => {
		let style = {
			zIndex: props.zIndex,
			// width: props.width
		};
		if (props.position.top === "top") {
			Object.assign(style, { top: props.topVal });
		} else if (props.position.top === "bottom") {
			Object.assign(style, { bottom: props.bottompVal });
		}
		styleObj.value = style;
	});

	const emits = defineEmits(["change"]);
	const changeClick = () => {
		emits("change", true);
	};
	defineExpose({
		changeClick,
	});
</script>

<style scoped lang="scss">
	.re-btn-fixed {
		position: fixed;
		z-index: 998;
		bottom: 0;
		padding-left: 20rpx;
		padding-right: 20rpx;
		width: calc(100% - 40rpx);
	}
</style>

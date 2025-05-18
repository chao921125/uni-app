<template>
	<view
		class="re-btn-fixed"
		:style="styleObj">
		<view
			v-if="props.position === 'top'"
			class="re-w-fill nav-status"></view>
		<view class="re-w-fill">
			<button @tap="">{{ props.text }}</button>
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
		};
		if (position.top === "top") {
			Object.assign(style, { top: props.topVal });
		} else if (position.top === "bottom") {
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
	}
</style>

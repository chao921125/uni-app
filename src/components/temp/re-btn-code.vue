<template>
	<button
		class="btn-primary-small btn-time"
		:disabled="isLoading"
		@tap="onClick"
		>{{ btnText }}</button
	>
</template>

<script setup name="TempScriptSetup">
	import { ref } from "vue";
	const props = defineProps({
		time: {
			required: false,
			type: Number,
			default: 121,
		},
		text: {
			required: false,
			type: String,
			default: "Get Code",
		},
	});

	const btnText = ref(props.text);
	const timeNum = ref(props.time);
	const isLoading = ref(false);

	const emits = defineEmits(["click"]);
	const onClick = () => {
		isLoading.value = true;
		let timeObj = setInterval(() => {
			timeNum.value -= 1;
			if (timeNum.value < 0) {
				btnText.value = props.text;
				isLoading.value = false;
				clearInterval(timeObj);
				timeObj = null;
				return false;
			}
			btnText.value = `${timeNum.value} s`;
		}, 1000);
		emits("click", true);
	};
	defineExpose({
		onClick,
	});
</script>

<style scoped lang="scss">
	.btn-time {
		min-width: 150rpx;
	}
</style>

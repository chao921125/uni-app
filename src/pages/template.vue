<script setup name="">
	const props = defineProps({
		name: {
			required: false,
			type: String,
			default: "",
		},
	});
	const emits = defineEmits(["change"]);
	const changeClick = () => {
		emits("change", true);
	};
	defineExpose({
		changeClick,
	});
</script>

<template>
	<view @tap="changeClick">template {{ props.name }}</view>
</template>

<style scoped lang="scss"></style>

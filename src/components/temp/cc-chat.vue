<template>
	<scroll-view></scroll-view>
	<view @tap="changeClick">template {{ props.name }}</view>
</template>

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

<style scoped lang="scss"></style>

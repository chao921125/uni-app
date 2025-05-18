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
	<view>
		<view>匹配正则</view>
		<view>匹配数字+大小写字母组合：/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9a-zA-Z]+$/</view>
		<view>匹配数字+大小写字母组合：!/^([0-9]*|[a-z]*|[A-Z]*)$/</view>
	</view>
</template>

<style scoped lang="scss"></style>

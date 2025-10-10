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

const onToHome = () => {
	uni.switchTab({
		url: "/pages/tab-bar/home"
	})
}
</script>

<template>广告
	<view @click="changeClick">template {{ props.name }}</view>
	<button @tap="onToHome">to home</button>
</template>

<style scoped lang="scss"></style>

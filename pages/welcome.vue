<script setup name="">
	import UniMethods from "@/common/plugins/uni-methods.js";
	
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

const testMth = async() => {
	console.log("========", await UniMethods.getSysInfo());
}

</script>

<template>广告
	<view @click="changeClick">template {{ props.name }}</view>
	<button @tap="onToHome">to home</button>
	<button @click="testMth">test</button>
</template>

<style scoped lang="scss"></style>

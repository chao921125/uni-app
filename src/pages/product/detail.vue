<script setup name="TempScriptSetup">
	import ReVanNavBar from "@/pages/comonents/re-van-nav-bar.vue";

	const changeClick = () => {
		Toast.loading({
			message: "加载中...",
			forbidClick: true,
		});
	};
</script>

<template>
	<view>
		<re-van-nav-bar title="详情"></re-van-nav-bar>
		<text>https://www.baidu.com</text>
		<van-button @tap="changeClick">detail</van-button>
		<van-toast id="van-toast" />
	</view>
</template>

<style scoped lang="scss"></style>

<script setup>
	import { onLoad } from "@dcloudio/uni-app";
	import About from "@/pages/index/about.vue";
	import Tutorial from "@/pages/index/tutorial.vue";
	import Home from "@/pages/index/home.vue";
	import ReVanNavBar from "@/pages/comonents/re-van-nav-bar.vue";
	import ReVanTabBar from "@/pages/comonents/re-van-tab-bar.vue";
	import Demo from "@/pages/index/demo.vue";
	import { ref } from "vue";
	import constants from "@/plugins/utils/constants";

	const urlParams = ref();
	onLoad((option) => {
		urlParams.value = option || "";
		if (option.index) {
			changeIndex(Number(option.index));
		}
		timer.value = setTimeout(() => {
			isLoading.value = true;
			clearTimeout(timer.value);
			timer.value = null;
		}, 1500);
	});

	const timer = ref(null);
	const isLoading = ref(false);

	const tabBarIndex = ref(0);
	const tabBarTitle = ref("首页");
	const changeIndex = (index) => {
		tabBarIndex.value = index;
		tabBarTitle.value = constants.TabBar[index].name;
	};
</script>

<template>
	<template v-if="!isLoading">
		<view class="re-wh-full re-wh-fill re-text-center welcome-box">
			<van-loading
				type="spinner"
				color="#1989fa"
				>加载中...</van-loading
			>
		</view>
	</template>
	<template v-else>
		<view class="re-w-full">
			<re-van-nav-bar
				:title="tabBarTitle"
				:isShowLeft="false"></re-van-nav-bar>
			<about v-if="tabBarIndex === 3"></about>
			<demo v-else-if="tabBarIndex === 1"></demo>
			<tutorial v-else-if="tabBarIndex === 2"></tutorial>
			<home v-else></home>
			<re-van-tab-bar
				:index="tabBarIndex"
				@change="changeIndex"></re-van-tab-bar>
		</view>
	</template>
</template>

<style scoped lang="scss">
	.welcome-box {
		margin-top: 50%;
	}
</style>

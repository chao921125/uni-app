<script setup name="">
	import SlotMachine from "@lucky-canvas/uni/slot-machine";
	import ReVanNavBar from "@/pages/comonents/re-van-nav-bar.vue";
	import { reactive, ref } from "vue";
	import { onHide } from "@dcloudio/uni-app";

	const luckyRef = ref();
	const luckyOptions = reactive({
		prizes: [
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "旅游", top: "15%" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "游乐场", top: "15%" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "商场", top: "15%" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "吃吃吃", top: "15%" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "爬山", top: "15%" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "游泳", top: "15%" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "玩玩玩", top: "15%" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "睡睡睡", top: "15%" }] },
			{ background: "#e9e8fe", borderRadius: "10px", fonts: [{ text: "宅宅宅", top: "15%" }] },
			{ background: "#b8c5f2", borderRadius: "10px", fonts: [{ text: "约约约", top: "15%" }] },
		],
		blocks: [
			{ padding: "10px", background: "#869cfa" },
			{ padding: "10px", background: "#e9e8fe" },
		],
		slots: [
			{ order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], speed: 3, direction: 1 },
			{ order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], speed: 3, direction: -1 },
			{ order: [2, 3, 4, 5, 6, 7, 8, 9, 0, 1], speed: 3, direction: 1 },
		],
		defaultStyle: {
			borderRadius: Infinity,
			background: "#bac5ee",
			fontSize: "32px",
			fontColor: "#333",
		},
		defaultConfig: {
			rowSpacing: "20px",
			colSpacing: "10px",
		},
	});

	const isLoading = ref(false);
	const startLucky = () => {
		isLoading.value = true;
		luckyRef.value.play();
		setTimeout(() => {
			const res = [
				[9, 9, 9],
				[0, 0, 0],
				[6, 6, 6],
				[8, 8, 8],
			];
			const index = res[(Math.random() * 4) >> 0];
			luckyRef.value.stop(index);
		}, 2500);
	};
	const endLucky = (prize) => {
		console.log("抽到奖品为：", prize);
		isLoading.value = false;
	};

	onHide(() => {
		luckyRef.value.stop([0, 0, 0]);
	});
</script>

<template>
	<re-van-nav-bar title="老虎机"></re-van-nav-bar>
	<view class="re-flex-row-center re-mt-20">
		<SlotMachine
			width="600rpx"
			height="600rpx"
			ref="luckyRef"
			:prizes="luckyOptions.prizes"
			:blocks="luckyOptions.blocks"
			:slots="luckyOptions.slots"
			:default-config="luckyOptions.defaultConfig"
			:default-style="luckyOptions.defaultStyle"
			@end="endLucky"></SlotMachine>
	</view>
	<view class="re-mt-20 re-flex-row-center">
		<van-button
			@tap="startLucky"
			:disabled="isLoading"
			:loading="isLoading"
			loading-type="spinner"
			>开始</van-button
		>
	</view>
</template>

<style scoped lang="scss"></style>

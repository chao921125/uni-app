<script setup name="">
	import LuckyGrid from "@lucky-canvas/uni/lucky-grid";
	import { onMounted, reactive, ref } from "vue";
	import { onHide } from "@dcloudio/uni-app";

	const props = defineProps({
		dataList: {
			required: true,
			type: Array,
			default: () => {
				return [];
			},
		},
	});

	const luckyRef = ref();
	const luckyOptions = reactive({
		prizes: [
			{ x: 0, y: 0, fonts: [{ text: "旅游" }] },
			{ x: 1, y: 0, fonts: [{ text: "游乐场" }] },
			{ x: 2, y: 0, fonts: [{ text: "商场" }] },
			{ x: 2, y: 1, fonts: [{ text: "吃吃吃" }] },
			{ x: 2, y: 2, fonts: [{ text: "爬山" }] },
			{ x: 1, y: 2, fonts: [{ text: "游泳" }] },
			{ x: 0, y: 2, fonts: [{ text: "玩玩玩" }] },
			{ x: 0, y: 1, fonts: [{ text: "睡睡睡" }] },
		],
		blocks: [
			{ padding: "10px", background: "#869cfa" },
			{ padding: "10px", background: "#e9e8fe" },
		],
		buttons: [
			{
				x: 1,
				y: 1,
				background: "#9c9dd8",
				fonts: [{ text: "开始", top: "25%" }],
			},
		],
		defaultStyle: {
			background: "#b8c5f2",
		},
	});

	const emits = defineEmits(["getResult"]);
	const startLucky = () => {
		luckyRef.value.play();
		setTimeout(() => {
			const index = (Math.random() * 6) >> 0;
			luckyRef.value.stop(index);
		}, 2500);
	};
	const endLucky = (prize) => {
		emits("getResult", prize.fonts[0].text);
	};

	const setData = () => {
		luckyOptions.prizes = [];
		let posi = [
			[0, 0],
			[1, 0],
			[2, 0],
			[2, 1],
			[2, 2],
			[1, 2],
			[0, 2],
			[0, 1],
		];
		for (let i in props.dataList) {
			luckyOptions.prizes.push({ x: posi[i][0], y: posi[i][1], fonts: [{ text: props.dataList[i] }] });
		}
	};

	onMounted(() => {
		setData();
	});

	onHide(() => {
		luckyRef.value.stop(0);
	});
</script>

<template>
	<view class="re-flex-row-center re-mt-20">
		<LuckyGrid
			width="600rpx"
			height="600rpx"
			ref="luckyRef"
			:prizes="luckyOptions.prizes"
			:blocks="luckyOptions.blocks"
			:buttons="luckyOptions.buttons"
			:default-style="luckyOptions.defaultStyle"
			@start="startLucky"
			@end="endLucky"></LuckyGrid>
	</view>
</template>

<style scoped lang="scss"></style>

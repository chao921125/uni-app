<script setup name="">
	import LuckyWheel from "@lucky-canvas/uni/lucky-wheel";
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
		prizes: [],
		blocks: [{ padding: "10px", background: "#869cfa" }],
		buttons: [
			{ radius: "40%", background: "#617df2" },
			{ radius: "35%", background: "#afc8ff" },
			{
				radius: "30%",
				background: "#869cfa",
				pointer: true,
				fonts: [{ text: "开始", top: "-10px" }],
			},
		],
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
		const colors = ["#e9e8fe", "#b8c5f2"];
		for (let i in props.dataList) {
			luckyOptions.prizes.push({ background: colors[i % 2], fonts: [{ text: props.dataList[i] }] });
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
		<LuckyWheel
			width="600rpx"
			height="600rpx"
			ref="luckyRef"
			:prizes="luckyOptions.prizes"
			:blocks="luckyOptions.blocks"
			:buttons="luckyOptions.buttons"
			@start="startLucky"
			@end="endLucky"></LuckyWheel>
	</view>
</template>

<style scoped lang="scss"></style>

<script setup name="">
	import SlotMachine from "@lucky-canvas/uni/slot-machine";
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
		blocks: [
			{ padding: "10px", background: "#869cfa" },
			{ padding: "10px", background: "#e9e8fe" },
		],
		slots: [
			{ order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], speed: 3, direction: 1 },
			{ order: [5, 6, 7, 8, 9, 0, 1, 2, 3, 4], speed: 3, direction: -1 },
			{ order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], speed: 3, direction: 1 },
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
	const emits = defineEmits(["getResult"]);
	const prizeRel = ref([]);
	const startLucky = () => {
		isLoading.value = true;
		luckyRef.value.play();
		setTimeout(() => {
			luckyRef.value.stop(prizeRel.value[(Math.random() * props.dataList.length) >> 0]);
		}, 2500);
	};
	const endLucky = (prize) => {
		isLoading.value = false;
		emits("getResult", prize || "null");
	};

	const setData = () => {
		luckyOptions.prizes = [];
		for (let i in props.dataList) {
			prizeRel.value.push([Math.floor(Math.random() * props.dataList.length), Math.floor(Math.random() * props.dataList.length), Math.floor(Math.random() * props.dataList.length)]);
			prizeRel.value.push([i, i, i]);
			luckyOptions.prizes.push({ fonts: [{ text: props.dataList[i], top: "15%" }] });
		}
	};

	onMounted(() => {
		setData();
	});

	onHide(() => {
		luckyRef.value.stop([0, 0, 0]);
	});
</script>

<template>
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

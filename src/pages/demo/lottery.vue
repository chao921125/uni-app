<script setup>
	import { reactive, ref } from "vue";
	import ReVanNavBar from "@/pages/comonents/re-van-nav-bar.vue";
	import LotteryGrid from "./components/lottery-grid.vue";
	import LotteryMachine from "./components/lottery-machine.vue";
	import LotteryWheel from "./components/lottery-wheel.vue";

	// 地球,火星,太阳,木星,金星,水星,火星,土星
	const data = reactive({
		lottery: {
			type: "1",
			text: "",
			array: [],
			result: "",
			resultTime: "",
		},
	});

	const changeType = (event) => {
		data.lottery.type = event.detail;
	};

	const isInput = ref(true);

	const textToArray = () => {
		if (!data.lottery.text) data.lottery.array = [];
		const text = data.lottery.text
			.trim()
			.replace(/[,，\s]+$/, "")
			.replace(/^[,，\s]+/, "")
			.replace(/[,，\s]+/gi, ",");
		data.lottery.array = text.split(",");
	};

	const startLottery = () => {
		if (!data.lottery.text.length) {
			uni.showToast({
				icon: "none",
				title: "不能为空",
			});
			return false;
		}
		if (data.lottery.type === "1" && data.lottery.array.length < 4) {
			uni.showToast({
				icon: "none",
				title: "最少为4个",
			});
			return false;
		}
		if (data.lottery.type === "2" && data.lottery.array.length !== 8) {
			uni.showToast({
				icon: "none",
				title: "只能为8个",
			});
			return false;
		}
		if (data.lottery.type === "3" && data.lottery.array.length !== 9) {
			uni.showToast({
				icon: "none",
				title: "只能为9个",
			});
			return false;
		}
		isInput.value = false;
	};
	const backLottery = () => {
		isInput.value = true;
		data.lottery.resultTime = "";
		data.lottery.result = "";
	};

	const getResult = (rel) => {
		data.lottery.resultTime = new Date().toLocaleString();
		data.lottery.result = rel;
	};
</script>

<template>
	<re-van-nav-bar title="抽奖"></re-van-nav-bar>
	<view class="container">
		<view v-if="isInput">
			<view class="uni-title">请选择抽奖的方式</view>
			<view class="re-mt-10">
				<van-radio-group
					:value="data.lottery.type"
					direction="horizontal"
					@change="changeType">
					<van-radio name="1">大转盘</van-radio>
					<van-radio name="2">九宫格</van-radio>
					<van-radio name="3">老虎机(不建议使用)</van-radio>
				</van-radio-group>
			</view>
			<view class="uni-title re-mt-20">请输入抽奖的内容（请用逗号或者空格分割）</view>
			<textarea
				class="lottery-text re-mt-10"
				placeholder="请输入抽奖的内容"
				auto-focus="true"
				:maxlength="-1"
				v-model="data.lottery.text"
				@input="textToArray()"
				@confirm="textToArray()"></textarea>
			<view class="uni-title re-mt-20">您输入的内容是 {{ data.lottery.array.length }}</view>
			<view>{{ data.lottery.array }}</view>
			<view class="re-mt-20"
				><van-button
					@tap="startLottery"
					type="info"
					block
					>开始抽奖</van-button
				></view
			>
		</view>
		<view v-if="!isInput">
			<van-button @tap="backLottery">返回</van-button>
			<view
				v-show="data.lottery.result"
				class="lottery-result">
				抽奖结果[{{ data.lottery.resultTime }}]：{{ data.lottery.result === "null" ? "未中奖" : data.lottery.result }}
			</view>
			<lottery-wheel
				v-if="data.lottery.type === '1'"
				:dataList="data.lottery.array"
				@get-result="getResult"></lottery-wheel>
			<lottery-grid
				v-if="data.lottery.type === '2'"
				:dataList="data.lottery.array"
				@get-result="getResult"></lottery-grid>
			<lottery-machine
				v-if="data.lottery.type === '3'"
				:dataList="data.lottery.array"
				@get-result="getResult"></lottery-machine>
		</view>
	</view>
</template>

<style lang="scss">
	.lottery-text {
		width: calc(100% - 20rpx);
		border: 1rpx solid #999;
		border-radius: 5rpx;
		padding: 10rpx;
	}
	.lottery-result {
		color: #ff4040;
		font-size: 30rpx;
		font-weight: bold;
	}
</style>

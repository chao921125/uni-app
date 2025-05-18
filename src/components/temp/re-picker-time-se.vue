<template>
	<uni-popup
		ref="popup"
		background-color="#fff">
		<view
			class="popup-content"
			:class="{ 'popup-height': props.type === 'left' || props.type === 'right' }">
			<view class="re-flex-row-between re-pt-20 re-pb-40">
				<text
					class="re-pl-20 btn-text"
					@tap="cancel"
					>Cancel</text
				>
				<text>{{ result[0] }} - {{ result[1] }}</text>
				<text
					class="re-pr-20 btn-text"
					@tap="confirm"
					>Confirm</text
				>
			</view>
			<picker-view
				:indicator-style="indicatorStyle"
				:value="pickerValue"
				@change="changeTime"
				class="picker-view">
				<picker-view-column>
					<view
						class="item"
						v-for="(item, index) in 24"
						:key="index">
						{{ item % 12 === 0 ? "12" : item % 12 < 10 ? `0${item % 12}` : item % 12 }}
					</view>
				</picker-view-column>
				<picker-view-column>
					<view
						class="item"
						v-for="(item, index) in 60"
						:key="index">
						{{ item - 1 < 10 ? `0${item - 1}` : item - 1 }}
					</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item">-</view>
				</picker-view-column>
				<picker-view-column>
					<view
						class="item"
						v-for="(item, index) in 24"
						:key="index">
						{{ item % 12 === 0 ? "12" : item % 12 < 10 ? `0${item % 12}` : item % 12 }}
					</view>
				</picker-view-column>
				<picker-view-column>
					<view
						class="item"
						v-for="(item, index) in 60"
						:key="index">
						{{ item - 1 < 10 ? `0${item - 1}` : item - 1 }}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</uni-popup>
</template>

<script setup name="TempScriptSetup">
	import { ref, watch } from "vue";
	const props = defineProps({
		isShow: {
			required: false,
			type: Boolean,
			default: false,
		},
		type: {
			required: false,
			type: String,
			default: "bottom",
		},
	});
	const emits = defineEmits(["open", "close", "value"]);

	// 时间范围选择
	const indicatorStyle = `height: 50px;`;
	// h m - h m
	const pickerValue = ref([0, 0, 0, 0, 0]);
	const result = ref(["1:0am", "1:0am"]);
	const resultNum = ref([1, 0, 1, 0]);
	const changeTime = (e) => {
		let temp = pickerValue.value;
		temp[0] = e.detail.value[0];
		temp[1] = e.detail.value[1];
		temp[3] = e.detail.value[3];
		temp[4] = e.detail.value[4];
		resultNum.value[0] = e.detail.value[0] + 1;
		resultNum.value[1] = e.detail.value[1];
		resultNum.value[2] = e.detail.value[3] + 1;
		resultNum.value[3] = e.detail.value[4];
		setResult(temp);
		pickerValue.value = temp;
	};
	const setResult = (arr) => {
		let start = "";
		let end = "";
		if (arr[0] < 11) {
			start = `${arr[0] + 1}:${arr[1]}am`;
		} else if (arr[0] === 23) {
			start = `0:${arr[1]}am`;
		} else {
			start = `${(arr[0] % 12) + 1}:${arr[1]}pm`;
		}
		if (arr[3] < 11) {
			end = `${arr[3] + 1}:${arr[4]}am`;
		} else if (arr[3] === 23) {
			end = `0:${arr[4]}am`;
		} else {
			end = `${(arr[3] % 12) + 1}:${arr[4]}pm`;
		}
		result.value[0] = start;
		result.value[1] = end;
	};

	// 弹窗
	const popup = ref(null);
	const dialogOpen = () => {
		result.value = ["1:0am", "1:0am"];
		resultNum.value = [1, 0, 1, 0];
		popup.value.open(props.type);
		emits("open", true);
	};
	const dialogClose = () => {
		popup.value.close();
		emits("close", false);
	};

	const confirm = () => {
		if (isLegal()) {
			emits("value", { result: result.value, value: resultNum.value });
			dialogClose();
		} else {
			uni.showToast({
				title: "end time must greater than start time",
				icon: "none",
			});
		}
	};
	const cancel = () => {
		dialogClose();
	};
	const isLegal = () => {
		if (pickerValue.value[0] > pickerValue.value[3]) {
			return false;
		}
		if (pickerValue.value[0] === pickerValue.value[3] && pickerValue[1] >= pickerValue[4]) {
			return false;
		}
		return true;
	};
	defineExpose({
		dialogOpen,
		dialogClose,
	});
</script>

<style scoped lang="scss">
	.picker-view {
		width: 100%;
		height: 600rpx;
		margin-top: 50rpx;
		z-index: 9999;
		opacity: 1;
		background-color: #fff;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
	}
	.btn-text {
		font-size: 36rpx;
		font-family: SFPro-Semibold, SFPro;
		font-weight: 600;
		color: #000000;
		line-height: 43rpx;
	}
</style>

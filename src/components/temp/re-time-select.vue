<template>
	<scroll-view
		v-if="timeArr.length"
		class="time-select-box"
		:scroll-x="true"
		:scroll-left="0">
		<template v-if="props.isEdit">
			<view class="re-flex-row-center-start time-block-container">
				<view class="re-flex time-block-box">
					<view
						v-for="(item, index) in timeArr"
						:key="index"
						class="time-block re-flex-row-center-end"
						:class="{ 'time-all': item % 1 === 0, 'time-half': item % 1 === 0.5 }">
						<view
							v-if="timeSelected[index] > -1"
							class="select-block"
							:class="{ 'select-block-active': timeSelect[index] === item }"></view>
						<view
							v-else
							class="select-block"
							:class="{ 'select-block-activeed': timeSelect[index] === item }"></view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="re-flex-row-center-start time-block-container">
				<view class="re-flex time-block-box">
					<view
						v-for="(item, index) in timeArr"
						:key="index"
						class="time-block re-flex-row-center-end"
						:class="{ 'time-all': item % 1 === 0, 'time-half': item % 1 === 0.5 }">
						<view
							class="select-block"
							:class="{ 'select-block-active': timeSelect[index] === item }"></view>
					</view>
				</view>
			</view>
		</template>

		<view class="re-flex-row-center-start">
			<view class="re-flex">
				<view
					v-for="(item, index) in timeTextArr"
					:key="index"
					class="time-text re-text-center">
					{{ item }}
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup name="">
	import { onMounted, watch, ref } from "vue";

	const props = defineProps({
		isEdit: {
			required: false,
			type: Boolean,
			default: false,
		},
		selectIndex: {
			required: false,
			type: Number,
			default: 0,
		},
		timeSelectArr: {
			required: false,
			type: Array,
			default: () => {
				return [];
			},
		},
	});

	// 渲染组件：暂时不可定义
	const timeTextArr = ["0am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12pm"];
	const timeArr = ref([]);
	const timeSelect = ref([]);
	const timeSelected = ref([]);
	const initData = () => {
		timeArr.value = [];
		timeSelect.value = [];
		timeSelected.value = [];
		let i = 0;
		while (i < 24) {
			timeArr.value.push(Number(i.toFixed(1)));
			let flag = false;
			for (let s in props.timeSelectArr) {
				if (i >= props.timeSelectArr[s].s && i <= props.timeSelectArr[s].e - 0.1) {
					flag = true;
				}
				if (Number(s) === props.timeSelectArr.length - 1) {
					if (flag) {
						timeSelect.value.push(Number(i.toFixed(1)));
					} else {
						timeSelect.value.push(-1);
					}
					break;
				}
			}
			// 处理选中的数据
			if (props.isEdit && props.timeSelectArr[props.selectIndex]) {
				if (i >= props.timeSelectArr[props.selectIndex].s && i <= props.timeSelectArr[props.selectIndex].e - 0.1) {
					timeSelected.value.push(Number(i.toFixed(1)));
				} else {
					timeSelected.value.push(-1);
				}
			}
			i = Number((i + 0.1).toFixed(1));
		}
	};

	onMounted(() => {
		initData();
	});

	watch(props, () => {
		initData();
	});

	const emits = defineEmits(["change"]);
	const changeClick = () => {
		emits("change", true);
	};
	defineExpose({
		changeClick,
	});
</script>

<style scoped lang="scss">
	.time-select-box {
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		background: #f8f8f8;
		.time-block-container {
			padding-left: 48rpx;
			padding-right: 48rpx;
		}
		.time-block-box {
			align-items: flex-end;
			border-right: 1rpx solid #000000;
		}
		.time-block {
			width: 9.6rpx;
			height: 74rpx;
			position: relative;
			border-bottom: 2rpx solid #000000;
		}
		.time-all {
			width: 9.6rpx;
			height: 74rpx;
			border-left: 1rpx solid #000000;
		}
		.time-half {
			width: 9.6rpx;
			height: 51rpx;
			border-left: 1rpx solid #8d8d8d;
		}
		.time-text {
			width: 96rpx;
			margin-left: 2rpx;
		}
		.select-block {
			width: 100%;
			height: 40rpx;
		}
		.select-block-active {
			background-color: #00ffff;
		}
		.select-block-activeed {
			background-color: #999;
		}
		.move-click {
			width: 10rpx;
			height: 10rpx;
			background-color: #fff;
			border: 2rpx solid #000;
			border-radius: 50%;
			position: absolute;
			top: calc(50% - 5rpx);
		}
		.move-start {
			width: 100%;
			height: 100%;
			position: relative;
			.move-click {
				left: -5rpx;
			}
		}
		.move-end {
			width: 100%;
			height: 100%;
			position: relative;
			.move-click {
				right: -5rpx;
			}
		}
	}
</style>

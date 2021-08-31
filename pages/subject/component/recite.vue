<template>
	<view class="comp-box">
		<view class="cc-flex-align-center body-title">
			<view class="order">第{{ index }}题</view>
			<view class="cc-flex-center type">{{ typeObj.name }}</view>
		</view>
		<view class="body-content">
			{{ subjectInfo.name || "" }}
		</view>
		<view v-if="subjectInfo.anwer" class="body-answer">
			<view class="answer-item" v-for="(item, index) in subjectInfo.anwer" :key="index" :class="{ 'answer-right' : Number(item.is_true) === 1 }">
				<text v-if="typeObj.value === 1 || typeObj.value === 2">{{ item.name }}.</text><text class="answer-select">{{ item.value }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
            subjectInfo: {
                type: Object,
                default: () => { return {}; }
            },
			typeObj: {
				type: Object,
				default: () => { return {}; }
			},
			index: {
				type: [String, Number],
				default: "1"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.comp-box {
		background-color: #FFFFFF;
		padding: 30rpx 30rpx 50rpx;
		color: #333333;
	}
	.body-title {
		.order {
			font-size: 34rpx;
			color: #000000;
		}
		.type {
			font-size: 24rpx;
			color: #FFFFFF;
			width: 100rpx;
			height: 40rpx;
			border-radius: 20rpx;
			margin-left: 15rpx;
			background-color: #6DB5FB;
		}
	}
	.body-content {
		width: 100%;
		word-break: break-word;
		white-space: pre-wrap;
		font-size: 26rpx;
		line-height: 46rpx;
	}
	.body-answer {
		margin-top: 20rpx;
		.answer-item {
		font-size: 26rpx;
			margin-top: 20rpx;
			background-color: #F4F4F4;
			padding: 15rpx 20rpx;
			border-radius: 5rpx;
		}
		.answer-select {
			margin-left: 10rpx;
		}
		.answer-right {
			border: 1rpx solid #6CBAE2;
			background-color: #EBF4F7;
		}
	}
</style>

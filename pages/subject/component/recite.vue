<template>
	<view class="comp-box">
		<view class="cc-flex-align-center body-title">
			<view class="order">第1题</view>
			<view class="cc-flex-center type">单选题</view>
		</view>
		<view class="body-content">
			单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题单选题
		</view>
		<view class="body-answer">
			<view class="answer-item" v-for="(item, index) in 4" :key="index" :class="{ 'answer-right' : index === 3 }" @click="selectAnswer(item)">
				<text>A.</text><text class="answer-select">11111</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			rightAnswer: {
				type: Array,
				default: () => { return [1]; }
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			selectAnswer(item) {}
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

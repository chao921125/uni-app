<template>
	<view class="comp-box">
		<view class="cc-flex-align-center an-title"><text class="title-text">试题解析</text></view>
		<view class="an-body">
			<view class="cc-flex-space-between an-an">
				<view><text class="detail-title">正确答案：</text><text class="detail-an">D</text></view>
				<view><text class="feedback" @click="toFeedback">纠错</text></view>
			</view>
			<view class="an-content">
				<text class="ct-title">解析：</text>
				<text class="ct-detail">xxxxxxxxxxxxxxxxxxxxxxxxxx</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			toFeedback() {
				uni.navigateTo({
					url: "/pages/about/feedback"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.comp-box {
		padding: 30rpx 0 50rpx;
		width: 100%;
		background-color: #FFFFFF;
		color: #333333;
	}
	.an-title {
		height: 30rpx;
		font-size: 24rpx;
		border-left: 6rpx solid #4E9BF5;
		.title-text {
			margin-left: 20rpx;
		}
	}
	.an-body {
		padding: 0 30rpx;
		.an-an {
			margin-top: 25rpx;
			font-size: 28rpx;
		}
		.detail-title {
			font-size: 28rpx;
		}
		.feedback {
			color: #4E9BF5;
		}
		.an-content {
			font-size: 26rpx;
		}
		.ct-title {
			font-size: 26rpx;
		}
	}
</style>

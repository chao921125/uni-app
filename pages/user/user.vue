<template>
    <view class="view-box">
		<view class="base-info info-box">
			<view class="cc-flex-space-between info-item border-bottom-line">
				<view class="item-title">头像</view>
				<view class="item-body"><image class="user-logo" :src="images.userHead"></image></view>
			</view>
			<view class="cc-flex-space-between info-item">
				<view class="item-title">姓名</view>
				<view class="item-body">
					<input v-if="true" class="input-name" placeholder="请输入姓名"/>
					<text v-else>姓名</text>
				</view>
			</view>
		</view>
		<view class="safe-info info-box">
			<view class="cc-flex-space-between info-item">
				<view class="item-title">手机号码</view>
				<view class="item-body">
					<text v-if="true" class="cc-text-click">绑定</text>
					<text v-else><text>13322221111</text><text class="cc-text-click re-bind">重新绑定</text></text>
				</view>
			</view>
		</view>
		<view class="cc-flex-center save-btn">
			<button class="cc-flex-center cc-btn btn">保存</button>
		</view>
	</view>
</template>

<script>
export default {
	name: "user",
	data() {
		return {
			images: {
				userHead: require("@/static/images/user-head.png"),
			}
		}
	}
}
</script>

<style scoped lang="scss">
	.info-box {
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}
	.base-info {
		background-color: #FFFFFF;
	}
	.safe-info {
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}
	.info-item {
		padding: 15rpx 20rpx;
		.item-title {
			font-size: 28rpx;
			color: #333333;
			text-align: left;
		}
		.item-body {
			font-size: 28rpx;
			color: #7A7D7C;
			text-align: right;
		}
	}
	.border-bottom-line {
		border-bottom: 1rpx solid #D6D7D8;
	}
	.user-logo {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}
	.save-btn {
		margin-top: 100rpx;
	}
	.re-bind {
		margin-left: 20rpx;
	}
</style>

<template>
	<view class="">
		<view class="nav" :style="{ height: `${statusHeight + boundHeight}px` }">
			<view class="status" :style="{ height: `${statusHeight}px` }"></view>
			<view class="navigate" :style="{ height: `${boundHeight}px` }">
				<image v-if="isShowBack" class="nav-ico" src="/static/icons/back.png" mode="aspectFit" @tap="onToBack"></image>
				<text v-if="title">{{ title }}</text>
			</view>
		</view>
		<view class="nav-space" :style="{ height: `${statusHeight + boundHeight}px` }"></view>
	</view>
</template>

<script>
import Constant from "@/common/constants.js";
export default {
	name: "nav",
	props: {
		isShowBg: {
			type: Boolean,
			default: true,
		},
		title: {
			type: String,
			default: "",
		},
		path: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			statusHeight: uni.getStorageSync("statusBar"),
			boundHeight: uni.getStorageSync("customHeight"),
		};
	},
	methods: {
		onToBack() {
			if (this.path.includes("tabBar")) {
				uni.switchTab({
					url: this.path,
				});
			} else if (this.path) {
				uni.navigateTo({
					url: this.path,
				});
			} else {
				uni.navigateBack(-1);
			}
		},
	},
};
</script>

<style lang="scss">
.nav {
	width: 100%;
	padding-bottom: 10rpx;
	position: fixed;
	z-index: 9999;
}
.nav-space {
	width: 100%;
	position: relative;
	padding-bottom: 10rpx;
	z-index: 9;
	background: transparent;
}
.status {
	width: 100%;
}
.navigate {
	width: 100%;
	margin-top: 10rpx;
	font-weight: 500;
	font-size: 36rpx;
	color: #333333;
	line-height: 1;
	text-align: center;
	font-style: normal;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	.nav-ico {
		position: absolute;
		z-index: 9;
		left: 27rpx;
		width: 44rpx;
		height: 44rpx;
	}
}
</style>

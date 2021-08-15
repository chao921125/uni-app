<template>
	<view class="view-box wrong-box">
		<view class="wrong-num">
			<!-- <image class="wrong-bg" :src="images.demoImg"></image> -->
			<view class="cc-flex-center num-box">
				<view class="num-detail">
					<image class="wrong-img" :src="images.demoBg"></image>
					<view class="cc-flex-center cc-text-weight num-text">0</view>
					<view class="cc-flex-center num-text">我的错题</view>
				</view>
			</view>
			<view class="cc-flex-space-between num-box">
				<view class="cc-flex-center btn-item"><button class="cc-flex-center btn-box btn-left">今日错题</button></view>
				<view class="cc-flex-center btn-item"><button class="cc-flex-center btn-box btn-right">全部错题</button></view>
			</view>
		</view>
		<view class="wrong-detail">
			<view class="detail-title">按题型练习</view>
			<view class="detail-list">
				<uni-list :border="false">
					<uni-list-item title="题目类型1" rightText="0" :showArrow="true" :clickable="true" />
					<uni-list-item title="题目类型2" rightText="1" :showArrow="true" :clickable="true" />
				</uni-list>
			</view>
			<no-data class="no-data"></no-data>
		</view>
	</view>
</template>

<script>
	import NoData from "@/pages/component/no-data/no-data.vue";
	export default {
		name: "wrong",
		components: {
			NoData
		},
		data() {
			return {
				images: {
					demoImg: require("@/static/icon/tab-home-current.png"),
					demoBg: require("@/static/images/logo.png")
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrong-box {
		background-color: #FFFFFF;
	}
	.wrong-num {
		width: 100%;
		height: 500rpx;
		position: relative;
		z-index: 1;
		background-color: #6DB5FB;
		.wrong-bg {
			width: 100%;
			height: 500rpx;
			position: absolute;
			z-index: 2;
			left: 0;
			top: 0;
		}
		.num-box {
			.num-detail {
				width: 200rpx;
				height: 200rpx;
				position: relative;
				z-index: 2;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				.wrong-img {
					width: 200rpx;
					height: 200rpx;
					border-radius: 50%;
					position: absolute;
					z-index: 3;
					left: 0;
					top: 0;
				}
				.num-text {
					position: relative;
					z-index: 4;
					color: #FFFFFF;
				}
			}
			.btn-item {
				width: 50%;
				height: 50%;
				position: relative;
				z-index: 4;
				margin-top: 20rpx;
				.btn-box {
					width: 260rpx;
					height: 80rpx;
					border-radius: 40rpx;
					font-size: 32rpx;
				}
				.btn-left {
					background-color: #FFFFFF;
					color: #4E9BF5;
				}
				.btn-right {
					background-color: #4E9BF5;
					color: #FFFFFF;
				}
			}
		}
	}
	.wrong-detail {
		background-color: #FFFFFF;
		.detail-title {
			padding: 0 35rpx;
			font-size: 36rpx;
		}
		.detail-list {
			padding-top: 30rpx;
			::v-deep.uni-list-item__content-title {
				font-size: 32rpx;
				color: #333333;
			}
			::v-deep.uni-list-item__extra-text {
				font-size: 32rpx;
			}
		}
	}
</style>

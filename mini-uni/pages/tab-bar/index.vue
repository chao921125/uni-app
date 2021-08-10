<template>
	<view class="view-box">
		<view class="ad-box"></view>
		<view class="cc-flex-space-between user-count">
			<view class="left-box count-item">
				<view class="cc-flex-center count-title">坚持天数</view>
				<view class="cc-flex-center count-day">0</view>
				<view class="cc-flex-center count-order">排名0名</view>
			</view>
			<view class="line-bule"></view>
			<view class="right-box count-item">
				<view class="cc-flex-center count-title">刷题正确率</view>
				<view class="cc-flex-center count-day">0%</view>
				<view class="cc-flex-center count-order">排名0名</view>
			</view>
		</view>
		<view class="subject-box">
			<view class="cc-flex-space-between subject-top subject-item">
				<view class="subject-left item-box">
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">乱序刷题</view>
					</view>
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">专项刷题</view>
					</view>
				</view>
				<view class="cc-flex-center subject-center">
					<view class="center-box">
						<image class="center-img" :src="images.demoImg"></image>
						<view class="cc-text-center center-text">
							<view class="cc-flex-center center-title">顺序练习</view>
							<view class="cc-flex-center center-num">0/0</view>
						</view>
					</view>
				</view>
				<view class="subject-right item-box">
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">未作习题</view>
					</view>
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">我的错题</view>
					</view>
				</view>
			</view>
			<view class="cc-flex-space-between subject-bottom subject-item">
				<view class="subject-left item-box">
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">题型刷题</view>
					</view>
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">我的收藏</view>
					</view>
				</view>
				<view class="cc-flex-center subject-center">
					<view class="center-box">
						<image class="center-img" :src="images.demoImg"></image>
						<view class="cc-text-center center-text">
							<view class="cc-flex-center center-title">模拟考试</view>
						</view>
					</view>
				</view>
				<view class="subject-right item-box">
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">刷知识点</view>
					</view>
					<view class="item-sub">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.demoImg"></image>
						</view>
						<view class="cc-flex-center item-title">自我测评</view>
					</view>
				</view>
			</view>
		</view>
		<view class="convenient-box">
			<uni-list-item title="激活码通道" rightText="快捷入口" :showArrow="true" :clickable="true" :border="false" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				images: {
					demoImg: require("@/static/icon/tab-home-current.png")
				}
			}
		},
		methods: {
			toSubject() {
				uni.navigateTo({
					url: "/pages/subject/order/order"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.ad-box {
		height: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
	}
	.user-count {
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		padding: 10rpx 0;
		.line-bule {
			width: 20rpx;
			height: 80rpx;
			background-color: #4E9BF5;
		}
		.count-item {
			text-align: center;
			width: calc(100% - 10rpx);
			.count-title {
				font-size: 32rpx;
				color: #666666;
				font-weight: 400;
			}
			.count-day {
				font-size: 24rpx;
				color: #4E9BF5;
			}
			.count-order {
				font-size: 24rpx;
				color: #898989;
			}
		}
	}
	.subject-box {
		font-size: 32rpx;
		font-weight: 400;
		background-color: #FFFFFF;
		padding: 20rpx 0;
		margin-bottom: 10rpx;
		.item-box {
			width: calc(100% - 150rpx);
			.item-sub {
				margin: 10rpx 0;
				.item-img {
					.img {
						width: 80rpx;
						height: 80rpx;
					}
				}
				.item-title {
					color: #333333;
				}
			}
		}
		.subject-center {
			.center-box {
				width: 150rpx;
				height: 150rpx;
				position: relative;
				z-index: 1;
				.center-img {
					width: 150rpx;
					height: 150rpx;
					position: absolute;
					z-index: 2;
					top: 0;
					left: 0;
				}
				.center-text {
					width: 100%;
					color: #FFFFFF;
					position: absolute;
					z-index: 3;
					top: calc(50% - 32rpx);
					line-height: 32rpx;
				}
			}
		}
	}
	.subject-bottom {
		.subject-center {
			.center-box {
				.center-text {
					top: calc(50% - 15rpx) !important;
				}
			}
		}
	}
	.convenient-box {
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		padding: 0 60rpx;
		::v-deep.uni-list::before {
			height: 0;
			background: #FFFFFF;
		}
		::v-deep.uni-list::after {
			height: 0;
			background: #FFFFFF;
		}
		.item-header {
			font-size: 32rpx;
		}
		.item-body {
			font-size: 32rpx;
			text-align: right;
			justify-content: flex-end;
		}
		::v-deep.uni-list-item__content-title {
			font-size: 32rpx;
			color: #333333;
		}
		::v-deep.uni-list-item__extra-text {
			font-size: 32rpx;
		}
	}
</style>

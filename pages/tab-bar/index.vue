<template>
	<view class="view-box">
		<view class="ad-box">
			<swiper v-if="bannerList.length > 0" class="swiper" :indicator-dots="swiperConfig.indicatorDots" :autoplay="swiperConfig.autoplay"
				:interval="swiperConfig.interval" :duration="swiperConfig.duration">
				<swiper-item v-for="(item, index) in bannerList" :key="index" @click="gotoUrl(item.url)">
					<view class="swiper-item">
						<image class="ad-img" :src="item.pic"></image>
					</view>
				</swiper-item>
			</swiper>
			<view v-else></view>
		</view>
		<view class="cc-flex-space-between user-count">
			<view class="left-box count-item">
				<view class="cc-flex-center count-title">坚持天数</view>
				<view class="cc-flex-center count-day">
					<text v-if="userInfo">{{ userInfo.aa || 0 }}</text>
					<text v-else>0</text>
				</view>
				<view class="cc-flex-center count-order">
					<text v-if="userInfo">排名{{ userInfo.aa || 0 }}名</text>
					<text v-else>排名0名</text>
				</view>
			</view>
			<view class="line-bule"></view>
			<view class="right-box count-item">
				<view class="cc-flex-center count-title">刷题正确率</view>
				<view class="cc-flex-center count-day">
					<text v-if="userInfo">{{ userInfo.acc || 0 }}%</text>
					<text v-else>0%</text>
				</view>
				<view class="cc-flex-center count-order">
					<text v-if="userInfo">排名{{ userInfo.aa || 0 }}名</text>
					<text v-else>排名0名</text>
				</view>
			</view>
		</view>
		<view class="subject-box">
			<view class="cc-flex-space-between subject-top subject-item">
				<view class="subject-left item-box">
					<view class="item-sub" @click="toExercises">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.random"></image>
						</view>
						<view class="cc-flex-center item-title">乱序刷题</view>
					</view>
					<view class="item-sub" @click="toSpecial">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.accurate"></image>
						</view>
						<view class="cc-flex-center item-title">专项刷题</view>
					</view>
					<view class="item-sub" @click="toTypes">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.menu"></image>
						</view>
						<view class="cc-flex-center item-title">题型刷题</view>
					</view>
				</view>
				<view class="cc-flex-center-column subject-center">
					<view class="center-box" @click="toExercises">
						<image class="center-img" :src="images.order"></image>
						<view class="cc-text-center center-text">
							<view class="cc-flex-center center-title">顺序练习</view>
							<view class="cc-flex-center center-num">0/0</view>
						</view>
					</view>
					<view class="center-box center-bottom" @click="toExam">
						<image class="center-img" :src="images.examination"></image>
						<view class="cc-text-center center-text center-t-btm">
							<view class="cc-flex-center center-title">模拟考试</view>
						</view>
					</view>
				</view>
				<view class="subject-right item-box">
					<view class="item-sub" @click="toExercises">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.edit"></image>
						</view>
						<view class="cc-flex-center item-title">未作习题</view>
					</view>
					<view class="item-sub" @click="toExercises">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.wrong"></image>
						</view>
						<view class="cc-flex-center item-title">我的错题</view>
					</view>
					<view class="item-sub" @click="toTypes">
						<view class="cc-flex-center item-img">
							<image class="img" :src="images.collect"></image>
						</view>
						<view class="cc-flex-center item-title">我的收藏</view>
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
	import Storage from "@/common/storage.js";
	import { bannerGet } from "@/api/other.js";
	
	export default {
		name: "index",
		data() {
			return {
				images: {
					userHead: require("@/static/images/user-head.png"),
					random: require("@/static/icon/home-random.png"),
					edit: require("@/static/icon/home-edit.png"),
					accurate: require("@/static/icon/home-accurate.png"),
					wrong: require("@/static/icon/home-wrong.png"),
					menu: require("@/static/icon/home-menu.png"),
					collect: require("@/static/icon/home-collect.png"),
					order: require("@/static/icon/home-order.png"),
					examination: require("@/static/icon/home-exam.png"),
				},
				swiperConfig: {
					indicatorDots: false,
					autoplay: true,
					interval: 2000,
					duration: 500
				},
				bannerList: [],
				userInfo: {}
			}
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
				}
				this.getBanner();
			},
			getBanner() {
				bannerGet({}).then(res => {
					if (res) {
						this.bannerList = res;
					}
				});
			},
			gotoUrl(url) {
				// TODO 跳转页面
				console.log(url);
			},
			// 专项
			toSpecial() {
				uni.navigateTo({
					url: "/pages/subject/special"
				});
			},
			// 类型
			toTypes() {
				uni.navigateTo({
					url: "/pages/subject/typs"
				});
			},
			// 习题
			toExercises() {
				uni.navigateTo({
					url: "/pages/subject/exercises"
				});
			},
			// 考试
			toExam() {
				uni.navigateTo({
					url: "/pages/subject/exam"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.ad-box {
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
		text-align: center;
		line-height: 300rpx;
		.swiper {
			width: 100%;
			height: 300rpx;
			.swiper-item {
				width: 100%;
				height: 300rpx;
			}
		}
		.ad-img {
			width: 100%;
			height: 300rpx;
		}
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
				.center-t-btm {
					top: calc(50% - 16rpx);
				}
			}
			.center-bottom {
				margin-top: 44rpx;
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

<template>
	<view class="exam-box">
		<view class="time-num">
			<view class="tn-space"></view>
			<view class="cc-flex-space-between tn-fixed">
				<view class="tn-num"><text class="num-current">1</text><text>/</text><text>100</text></view>
				<view class="cc-flex-center tn-time"><text class="time-title">剩余时间：</text><cd-time class="time-text" :type="2" :seconds="2 * 60 * 60" @end="autoSubmit"></cd-time></view>
			</view>
		</view>
		<view class="body-subject"><examination></examination></view>
		<view class="btn-fixed">
			<view class="btn-space"></view>
			<view class="cc-flex-center btn-position">
				<view class="cc-flex-space-between btn-box">
					<view class="btn-item" @click="preSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconLeft"></image></view>
						<view class="cc-flex-center btn-text">上一题</view>
					</view>
					<view class="btn-item" @click="submitForm">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconAnalysis"></image></view>
						<view class="cc-flex-center btn-text">交卷</view>
					</view>
					<view class="btn-item" @click="showList">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconMenu"></image></view>
						<view class="cc-flex-center btn-text">题卡</view>
					</view>
					<view class="btn-item" @click="nextSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconRight"></image></view>
						<view class="cc-flex-center btn-text">下一题</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="dialogList" type="bottom">
			<view class="list-box">
				<view class="cc-flex-align-center list-header">
					<view class="header-title"><text class="title-text">提卡</text></view>
					<view class="header-num">1/100</view>
				</view>
				<scroll-view scroll-y="true" class="scroll-box">
					<view class="cc-flex list-body">
						<view class="cc-flex-center list-item" v-for="(item, index) in 100" :key="index" @click="gotoSubject(item)">{{ index + 1 }}</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="dialogSubmit" type="center">
			<view class="submit-box">
				<view class="cc-flex-center submit-title">交卷</view>
				<view class="cc-flex-center submit-img"><image class="img" :src="images.submitImg"></image></view>
				<view class="cc-flex-space-between submit-do">
					<view class="do-num">
						<view class="cc-flex-center do-num-val">{{doVal}}</view>
						<view class="cc-flex-center do-num-title">已做</view>
					</view>
					<view class="do-num">
						<view class="cc-flex-center do-num-val">{{unDoVal}}</view>
						<view class="cc-flex-center do-num-title">未做</view>
					</view>
				</view>
				<view class="cc-flex-space-between submit-btn">
					<view class="cc-flex-center btn-box"><button class="btn btn-submit">现在交卷</button></view>
					<view class="cc-flex-center btn-box"><button class="btn btn-continue">继续答题</button></view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import examination from "./component/examination.vue";
	import CdTime from "@/pages/component/countdown/cd-time.vue";
	import storage from "@/common/storage.js";
	export default {
		components:  {
			CdTime,
			examination
		},
		data() {
			return {
				images: {
					iconLeft: require("@/static/icon/icon-left-frame.png"),
					iconRight: require("@/static/icon/icon-right-frame.png"),
					iconAnalysis: require("@/static/icon/icon-analysis.png"),
					iconMenu: require("@/static/icon/icon-menu.png"),
					iconCollec: require("@/static/icon/icon-collec.png"),
					iconCollection: require("@/static/icon/icon-collection.png"),
					submitImg: require("@/static/images/subject-confirm.png")
				},
				answerList: [],
				unDoVal: 0,
				doVal: 0
			};
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				this.answerList = new Array(100);
				storage.setStorageSync("examDo", this.answerList);
			},
			preSubject() {
				
			},
			nextSubject() {
				
			},
			gotoSubject() {
				
			},
			submitForm() {
				this.$refs.dialogSubmit.open();
			},
			showList() {
				this.$refs.dialogList.open();
			},
			autoSubmit() {
				console.log("auto submit");
			}
		}
	}
</script>

<style scoped lang="scss">
	.time-num {
		color: #333333;
		.tn-space {
			width: 100%;
			height: 60rpx;
		}
		.tn-fixed {
			width: 100%;
			height: 60rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: #FFFFFF;
		}
		.tn-num {
			font-size: 26rpx;
			margin-left: 20rpx;
			.num-current {
				color: #4E9BF5;
			}
		}
		.tn-time {
			font-size: 26rpx;
			margin-right: 20rpx;
		}
	}
	.body-subject {
		margin-top: 20rpx;
	}
	.btn-fixed {
		.btn-space {
			width: 100%;
			height: 120rpx;
		}
		.btn-position {
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			position: fixed;
			// 底部适配
			bottom: env(safe-area-inset-bottom);;
			left: 0;
			z-index: 99;
		}
		.btn-box {
			width: calc(100% - 80rpx);
			padding: 0 40rpx;
		}
		.btn-item {
			width: calc(100% / 5);
			.btn-icon {
				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.btn-text {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #4E9BF5;
			}
		}
	}
	// 题卡
	.list-box {
		.list-header {
			height: 80rpx;
			border-radius: 10rpx 10rpx 0 0;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #D6D7D8;
			.header-title {
				height: 40rpx;	
				font-size: 28rpx;
				line-height: 40rpx;
				color: #333333;
				border-left: 8rpx solid #6DB5FB;
				.title-text {
					margin-left: 10rpx;
				}
			}
			.header-num {
				margin-left: 30rpx;
				font-size: 24rpx;
				color: #7A7D7C;
			}
		}
		.scroll-box {
			height: 600rpx;
		}
		.list-body {
			background-color: #FFFFFF;
			padding: 0 10rpx 10rpx;
			min-height: 600rpx;
			flex-wrap: wrap;
			.list-item {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				background-color: #F2F1F8;
				color: #333333;
				font-size: 28rpx;
				margin: 10rpx;
			}
			.list-item-active {
				background-color: #6DB5FB;
				color: #FFFFFF;
			}
		}
	}
	// 提交
	.submit-box {
		width: 560rpx;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		.submit-title {
			height: 80rpx;
			border-bottom: 1rpx solid #D6D7D8;
			font-size: 26rpx;
			color: #333333;
			margin-top: 10rpx;
		}
		.submit-img {
			height: 200rpx;
			.img {
				width: 180rpx;
				height: 180rpx;
			}
		}
		.submit-do {
			margin-top: 30rpx;
			.do-num {
				width: 50%;
				font-size: 26rpx;
				color: #333333;
			}
		}
		.submit-btn {
			margin-top: 30rpx;
			padding-bottom: 50rpx;
			.btn-box {
				width: 50%;
			}
			.btn {
				width: 200rpx;
				height: 80rpx;
				font-size: 30rpx;
				border-radius: 40rpx;
			}
			.btn-submit {
				color: #6DB5FB;
				background-color: #FFFFFF;
				border: 1rpx solid #6DB5FB;
			}
			.btn-continue {
				color: #FFFFFF;
				background-color: #6DB5FB;
				border: 1rpx solid #FFFFFF;
			}
		}
	}
</style>

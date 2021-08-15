<template>
	<view class="view-box">
		<view class="cc-flex-center exer-model">
			<views class="cc-flex-center btn-box">
				<button class="cc-flex-center btn btn-answer" :class="{ 'btn-select' : !isShowRecite }" @click="changeModel(false)">答题模式</button>
				<button class="cc-flex-center btn btn-recite" :class="{ 'btn-select' : isShowRecite }" @click="changeModel(true)">背题模式</button>
			</views>
		</view>
		<view v-if="!isShowRecite" class="body-subject"><answer></answer></view>
		<view v-else class="body-subject"><recite></recite></view>
		<view v-show="isShowAnalysis" class="body-an"><analysis></analysis></view>
		<view class="btn-fixed">
			<view class="btn-space"></view>
			<view class="cc-flex-center btn-position">
				<view class="cc-flex-space-between btn-box">
					<view class="btn-item" @click="preSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconLeft"></image></view>
						<view class="cc-flex-center btn-text">上一题</view>
					</view>
					<view class="btn-item" @click="showAnalysis">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconAnalysis"></image></view>
						<view class="cc-flex-center btn-text">解析</view>
					</view>
					<view class="btn-item">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconMenu"></image></view>
						<view class="cc-flex-center btn-text">1/2</view>
					</view>
					<view v-if="isCollection" class="btn-item" @click="addRemoveCollect(false)">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconCollection"></image></view>
						<view class="cc-flex-center btn-text"><text>已加入收藏</text></view>
					</view>
					<view v-else class="btn-item" @click="addRemoveCollect(true)">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconCollec"></image></view>
						<view class="cc-flex-center btn-text"><text>加入收藏</text></view>
					</view>
					<view class="btn-item" @click="nextSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconRight"></image></view>
						<view class="cc-flex-center btn-text">下一题</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import answer from "./component/answer.vue";
	import recite from "./component/recite.vue";
	import analysis from "./component/analysis.vue";
	export default {
		components: {
			answer,
			recite,
			analysis
		},
		data() {
			return {
				images: {
					iconLeft: require("@/static/icon/icon-left-frame.png"),
					iconRight: require("@/static/icon/icon-right-frame.png"),
					iconAnalysis: require("@/static/icon/icon-analysis.png"),
					iconMenu: require("@/static/icon/icon-menu.png"),
					iconCollec: require("@/static/icon/icon-collec.png"),
					iconCollection: require("@/static/icon/icon-collection.png")
				},
				isShowRecite: false,
				isShowAnalysis: false,
				isCollection: false,
				subject: {}
			};
		},
		methods: {
			initData() {
				
			},
			preSubject() {
				
			},
			nextSubject() {
				
			},
			changeSubject() {},
			changeModel(val) {
				this.isShowRecite = val;
			},
			showAnalysis() {
				this.isShowAnalysis = !this.isShowAnalysis;
			},
			addRemoveCollect(val) { // 是否加入收藏
				this.isCollection = val;
			}
		}
	}
</script>

<style scoped lang="scss">
	.exer-model {
		background-color: #FFFFFF;
		padding: 10rpx 0;
		.btn-box {
			border-radius: 8rpx;
			height: 50rpx;
			background-color: #4E9BF5;
			padding: 2rpx;
			.btn {
				width: 130rpx;
				height: 50rpx;
				padding: 0;
				font-size: 22rpx;
				border-radius: 0;
				background-color: #FFFFFF;
				color: #6DB5FB;
			}
			::v-deep.btn::after {
				border: none;
				border-radius: 0;
			}
			.btn-answer {
				border-radius: 8rpx 0 0 8rpx;
			}
			.btn-recite {
				border-radius: 0 8rpx 8rpx 0;
			}
			.btn-select {
				background-color: #6DB5FB;
				color: #FFFFFF;
			}
		}
	}
	.body-subject {
		margin-top: 10rpx;
	}
	.body-an {
		margin-top: 10rpx;
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
</style>

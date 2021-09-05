<template>
	<view class="view-box ranking-box">
		<view class="cc-flex-center search-box">
			<!-- <image class="search-bg" :src="images.userHead"></image> -->
			<view class="cc-flex-center btn-box">
				<button class="cc-flex-center btn-item btn-rank" :class="{'btn-un-select-r' : isShowScore}" @tap="changeRankScore(false)">排行榜</button>
				<button class="cc-flex-center btn-item btn-score" :class="{'btn-un-select-l' : !isShowScore}" @tap="changeRankScore(true)">我的成绩</button>
			</view>
		</view>
		<rank v-show="!isShowScore" :rank="rankInfo"></rank>
		<score v-show="isShowScore" :score="myScore"></score>
	</view>
</template>

<script>
	import rank from "./component/rank.vue";
	import score from "./component/score.vue";
	import Storage from "@/common/storage.js";
	import { getUserScore } from "@/api/user.js";
	import { getRank } from "@/api/other.js";
	
	export default {
		name: "ranking",
		components: {
			rank,
			score
		},
		data() {
			return {
				images: {
					userHead: require("@/static/images/user-head.png"),
				},
				isShowScore: false,
				userInfo: null,
				rankInfo: [],
				myScore: null
			}
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
					this.getRankInfo();
					this.getMyresult();
				}
			},
			getMyresult() {
				// 我的成绩
        getUserScore({
					uid: this.userInfo.id,
					cateid: this.userInfo.cateid
				}).then(res => {
					if (res.data) {
						this.myScore = res.data;
					}
				});
			},
			getRankInfo() {
				getRank({
					uid: this.userInfo.id
				}).then(res => {
					if (res.data) {
						this.rankInfo = res.data;
					}
				});
			},
			changeRankScore(val) {
				this.isShowScore = val;
			}
		}
	}
</script>

<style scoped lang="scss">
	.ranking-box {
		background-color: #FFFFFF;
	}
	.search-box {
		width: 100%;
		height: 120rpx;
		background-color: #6DB5FB;
		position: relative;
		z-index: 1;
		.search-bg {
			width: 100%;
			height: 120rpx;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
		}
	}
	.btn-box {
		width: 380rpx;
		height: 80rpx;
		padding: 2rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		position: relative;
		z-index: 3;
		.btn-item {
			width: 190rpx;
			height: 80rpx;
			border: none;
			border-radius: 0;
			font-size: 32rpx;
			background-color: #FFFFFF;
			color: #6DB5FB;
		}
		::v-deep.btn-item::after {
			border: none;
			border-radius: 0;
		}
		.btn-un-select-l {
			background-color: #6DB5FB;
			color: #FFFFFF;
			border-radius: 0 10rpx 10rpx 0;
		}
		.btn-un-select-r {
			background-color: #6DB5FB;
			color: #FFFFFF;
			border-radius: 10rpx 0 0 10rpx;
		}
	}
</style>

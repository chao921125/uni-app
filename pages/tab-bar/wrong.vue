<template>
	<view class="view-box wrong-box">
		<view class="wrong-num">
			<!-- <image class="wrong-bg" :src="images.userHead"></image> -->
			<view class="cc-flex-center num-box">
				<view class="num-detail">
					<image class="wrong-img" :src="images.userHead"></image>
					<view class="cc-flex-center cc-text-weight num-text">
						<text v-if="selectDayAll === 1">{{ wrongNum.day || 0 }}</text>
						<text v-else>{{ wrongNum.all || 0 }}</text>
					</view>
					<view class="cc-flex-center num-text">我的错题</view>
				</view>
			</view>
			<view class="cc-flex-space-between num-box">
				<view class="cc-flex-center btn-item"><button class="cc-flex-center btn-box btn-left" :class="{ 'btn-active' : selectDayAll === 1 }" @click="changeSelect(1)">今日错题</button></view>
				<view class="cc-flex-center btn-item"><button class="cc-flex-center btn-box btn-right" :class="{ 'btn-active' : selectDayAll === 0 }" @click="changeSelect(0)">全部错题</button></view>
			</view>
		</view>
		<view class="wrong-detail">
			<view class="detail-title">按题型练习</view>
			<view v-if="showWrong" class="detail-list">
				<uni-list :border="false">
					<uni-list-item v-for="(item, index) in typeList" :key="index" :title="item.name" @click="toExercises(item)" rightText=" " :showArrow="true" :clickable="true" />
				</uni-list>
			</view>
			<no-data v-else class="no-data"></no-data>
		</view>
	</view>
</template>

<script>
	import NoData from "@/pages/component/no-data/no-data.vue";
	import Storage from "@/common/storage.js";
	import { getWrongNum } from "@/api/user.js";
	import { getType } from "@/api/subject.js";
	
	export default {
		name: "wrong",
		components: {
			NoData
		},
		data() {
			return {
				images: {
					userHead: require("@/static/icon/home-exam.png"),
				},
				// 1 乱序 顺序 专项 2 题型 未作 3 错题 4 收藏
                methods: 3,
				selectDayAll: 1,
				showWrong: false,
				typeList: [],
				wrongNum: {
					day: 0,
					all: 0
				},
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
					this.getWrongInfo();
					this.getTypes();
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					});
				}
			},
			getWrongInfo() {
				getWrongNum({
					uid: this.userInfo.id
				}).then(res => {
					if (res.data) {
						this.wrongNum.day = res.data.todaynum;
						this.wrongNum.all = res.data.allnum;
						this.showWrong = !!res.data.todaynum;
					}
				});
			},
			getTypes() {
				getType({
					uid: this.userInfo.id
				}).then(res => {
					if (res.data) {
						let array = [];
						for (let k in res.data) {
							array.push({
								id: k,
								name: res.data[k]
							});
						}
						this.typeList = array;
					}
				});
			},
			changeSelect(val) {
				this.selectDayAll = val;
				if (val === 1 && this.wrongNum.day) {
					this.showWrong = true;
				} else if (val === 0 && this.wrongNum.all) {
					this.showWrong = true;
				} else {
					this.showWrong = false;
				}
			},
			// 习题
			toExercises(item) {
				uni.navigateTo({
					url: `/pages/subject/exercises?method=${this.methods}&type=${item.id}&isTody=${this.selectDayAll}`
				});
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
					background-color: #FFFFFF;
					color: #4E9BF5;
				}
				.btn-left {
					// background-color: #FFFFFF;
					// color: #4E9BF5;
				}
				.btn-right {
					// background-color: #4E9BF5;
					// color: #FFFFFF;
				}
				.btn-active {
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

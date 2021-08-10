<template>
	<view class="rank-box">
		<view class="search-box">
			<view class="cc-flex-align-center select-rank">
				<image class="icon-rank" :src="images.demoBg"></image>
				<picker @change="changeRank" class="rank-value" :value="indexPick" :range="arrayPick" mode="selector">
					<view class="uni-input">{{arrayPick[indexPick]}}</view>
				</picker>
				<uni-icons type="arrowdown" size="10" color="#FFFFFF"></uni-icons>
			</view>
			<view class="list-title-box">
				<view class="list-space"></view>
				<view class="cc-flex-space-between list-item">
					<view class="item-order">排名</view>
					<view class="item-name">昵称</view>
					<view class="item-score">分数（分）</view>
				</view>
			</view>
		</view>
		<scroll-view class="list-box" scroll-y="true">
			<view class="cc-flex-space-between list-item item-body" v-for="(item, index) in 10" :key="index">
				<view class="item-order">
					<image v-if="[0, 1, 2, '1', '2', '0'].indexOf(index) > -1" class="icon" :src="images.demoBg"></image>
					<text v-else>{{ item }}</text>
				</view>
				<view class="cc-flex-align-center item-name">
					<image class="user-img" :src="images.demoBg"></image>
					<view class="user-name">{{ item }}</view>
				</view>
				<view class="item-score">{{ item }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images: {
					demoImg: require("@/static/icon/tab-home-current.png"),
					demoBg: require("@/static/images/logo.png")
				},
				arrayPick: ["全国排行榜", "全球排行榜"],
				indexPick: 0
			};
		},
		created() {
			console.log("rank");
		},
		methods: {
			changeRank(e) {
				this.indexPick = e.target.value;
			}
		}
	}
</script>

<style scoped lang="scss">
	.rank-box {
		color: #333333;
		.search-box {
			width: 100%;
			height: 200rpx;
			background-color: #7BC0FD;
			.select-rank {
				height: 80rpx;
				.icon-rank {
					width: 30rpx;
					height: 60rpx;
					margin-left: 40rpx;
				}
				.rank-value {
					background-color: #7BC0FD;
					::v-deep.uni-input {
						background-color: #7BC0FD;
						font-size: 32rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
	.list-item {
		padding: 0 40rpx;
		color: #333333;
		.item-order {
			width: 120rpx;
			border-bottom: 1rpx solid #F2F1F6;
			padding: 20rpx 0;
			.icon {
				width: 20rpx;
				height: 50rpx;
			}
		}
		.item-name {
			width: calc(100% - 160rpx - 120rpx);
			border-bottom: 1rpx solid #F2F1F6;
			padding: 20rpx 0;
			.user-img {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.user-name {
				width: calc(100% - 80rpx);
			}
		}
		.item-score {
			width: 160rpx;
			border-bottom: 1rpx solid #F2F1F6;
			padding: 20rpx 0;
		}
	}
	.list-title-box {
		height: 110rpx;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #FFFFFF;
		margin-top: 12rpx;
		.item-order {
			border-bottom: none;
			padding: 0;
		}
		.item-name {
			border-bottom: none;
			padding: 0;
		}
		.item-score {
			border-bottom: none;
			padding: 0;
		}
	}
	.list-space {
		height: 40rpx;
	}
	.list-box {
		height: calc(100vh - 320rpx);
		background-color: #FFFFFF;
		.item-body {
			padding: 0 40rpx;
		}
	}
</style>

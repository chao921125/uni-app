<template>
    <view><cover-image class="logo-bg" v-if="imgPath" :src="imgPath.DemoLogo"></cover-image></view>
	<view class="re-flex-row-between re-margin-top-50">
		<view class="re-flex-row-center text-click">
			<view class="re-flex-row-center re-padding-20 text-circle text-line-height btn-left" @click="toShop">
				<uni-icons type="shop" size="20"></uni-icons>
				<text class="re-margin-left-15">山川</text>
			</view>
		</view>
		<view class="re-flex-row-center text-click">
			<view class="re-flex-row-center re-padding-20 text-circle text-line-height btn-right" @click="toBooking">
				<uni-icons type="calendar" size="20"></uni-icons>
				<text class="re-margin-left-15">云海</text>
			</view>
		</view>
	</view>
	<view class="re-margin-top-50">
		<uni-grid :showBorder="false" @change="toPlayerDetail">
			<uni-grid-item v-for="(item, index) in userAll" :index="index" :key="index">
				<view class="re-flex-column-center">
					<view class="re-flex-row-center">
						<cover-image class="avatar-circle" v-if="item.imgOne" :src="item.imgOne"></cover-image>
						<cover-image class="avatar-circle" v-else :src="imgPath.UserAvatar"></cover-image>
					</view>
					<view class="re-flex-row-center">{{item.name}}</view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
    <view><cover-image class="logo-bg" v-if="imgPath" :src="imgPath.DemoBg"></cover-image></view>
</template>

<script>
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/uni-methods.js";
	import requestConfig from "@/common/config/request.js";
	
    export default {
		data() {
			return {
				imgPath: defaultConfig.imgPath,
				userAll: [],
			}
		},
		onShow() {
			utils.checkPermiss();
			this.getPlayer();
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			getPlayer() {
				this.userAll = [];
				selectPlayer({}).then((res) => {
					this.userAll = res.data;
				});
			},
			toShop() {
				utils.gotoUrl(defaultConfig.routePath.shopList, false);
			},
			toBooking() {
				utils.gotoUrl(defaultConfig.routePath.booking, false);
			},
			toPlayerDetail(e) {
				uni.setStorageSync("player_info", this.userAll[e.detail.index]);
				utils.gotoUrl(defaultConfig.routePath.player, false);
			}
		},
    }
</script>

<style lang="scss" scoped>
	.logo-bg {
		height: 400rpx;
	}
	.text-click {
		width: 50%;
		.text-circle {
			text-align: center;
			display: block;
			width: 210rpx;
			height: 60rpx;
			border: 1px solid #000;
			border-radius: 20rpx;
		}
		.text-line-height {
			line-height: 60rpx;
		}
		.btn-left {
			background-color: beige;
		}
		.btn-right {
			background-color: blanchedalmond;
		}
	}
</style>

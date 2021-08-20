<template>
	<view class="view-box user-box">
		<view class="user-info">
			<!-- <image class="img-bg" :src="images.demoImg"></image> -->
			<view class="cc-flex-space-between info-box">
				<view class="user-left">
					<view class="cc-flex-align-center">您还未登录哦！</view>
					<view class="cc-flex-align-center">我的积分：<text class="score-num">0</text></view>
				</view>
				<view class="cc-flex-center user-right">
					<button v-if="true" class="cc-flex-center to-login" @click="toLogin">登录</button>
					<image v-else class="to-login" :src="images.demoImg"></image>
				</view>
			</view>
		</view>
		<view class="setting-go">
			<uni-list class="list-box">
				<uni-list-item class="list-item" :showArrow="true" :clickable="true" @click="toUser">
					<template v-slot:header>
						<view class="item-header">
							<image class="list-icon" :src="images.iconSet"></image>
							<text>个人设置</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item class="list-item" :showArrow="true" :clickable="true" @click="toSafe">
					<template v-slot:header>
						<view class="item-header">
							<image class="list-icon" :src="images.iconSafe"></image>
							<text>安全设置</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item class="list-item" :showArrow="true" :clickable="true" @click="toFeedback">
					<template v-slot:header>
						<view class="item-header">
							<image class="list-icon" :src="images.iconFbk"></image>
							<text>用户反馈</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item class="list-item" :showArrow="true" :clickable="true" @click="toAbout">
					<template v-slot:header>
						<view class="item-header">
							<image class="list-icon" :src="images.iconAbout"></image>
							<text>关于我们</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item class="list-item" :showArrow="true" :clickable="true" @click="logout">
					<template v-slot:header>
						<view class="item-header">
							<image class="list-icon" :src="images.iconOut"></image>
							<text>登出</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my",
		data() {
			return {
				images: {
					demoImg: require("@/static/images/logo.png"),
					iconAbout: require("@/static/icon/icon-about.png"),
					iconFbk: require("@/static/icon/icon-fbk.png"),
					iconSet: require("@/static/icon/icon-set.png"),
					iconSafe: require("@/static/icon/icon-safe.png"),
					iconOut: require("@/static/icon/icon-out.png")
				}
			}
		},
		methods: {
			toLogin() {
				uni.redirectTo({
					url: "/pages/login/login"
				});
			},
			toUser() {
				uni.navigateTo({
					url: "/pages/user/user"
				});
			},
			toSafe() {
				uni.navigateTo({
					url: "/pages/user/safe"
				});
			},
			toAbout() {
				uni.navigateTo({
					url: "/pages/about/about"
				});
			},
			toFeedback() {
				uni.navigateTo({
					url: "/pages/about/feedback"
				});
			},
			logout() {
				uni.redirectTo({
					url: "/pages/login/login"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-box {
		background-color: #FFFFFF;
	}
	.user-info {
		font-size: 32rpx;
		width: 100%;
		height: 280rpx;
		position: relative;
		z-index: 1;
		background-color: #6DB5FB;
		.img-bg {
			width: 100%;
			height: 280rpx;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
		}
		.info-box {
			width: 100%;
			height: 280rpx;
			position: absolute;
			z-index: 3;
			top: 0;
			left: 0;
			.user-left {
				width: 60%;
				padding-left: 40rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				.score-num {
					font-size: 40rpx;
				}
			}
			.user-right {
				width: 40%;
				.to-login {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					font-size: 32rpx;
					color: #333333;
				}
			}
		}
	}
	.setting-go {
		font-size: 32rpx;
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
			color: #333333;
		}
		.list-icon {
			margin-right: 10px;
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>

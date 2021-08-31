<template>
	<view class="view-box login-box">
		<view class="bg-box"><image class="login-bg"></image></view>
		<view class="cc-card login-form">
			<view class="cc-flex-center login-title">请登录</view>
			<view class="cc-flex-center form-phone">
				<image class="input-icon" :src="images.iconPhone"></image>
				<input class="form-input" maxlength="20" v-model="form.name" placeholder="请输入账号" />
			</view>
			<view class="cc-flex-center form-code">
				<image class="input-icon" :src="images.iconLock"></image>
				<input class="form-input" type="password" maxlength="30" v-model="form.password" placeholder="请输入密码" />
			</view>
			<view class="cc-flex-center form-btn">
				<button class="cc-flex-center btn" @click="loginUser" :disabled="isLoadingLogin" :loading="isLoadingLogin">登录</button>
			</view>
			<view class="login-wx">
				<view class="cc-flex-center">
					<view class="wx-line"></view>
					<image class="wx-icon" :src="images.iconWx" @click="wxLogin"></image>
					<view class="wx-line"></view>
				</view>
				<view class="cc-flex-center wx-text">微信登录</view>
			</view>
			<view><button @click="faceUp">人脸登录</button></view>
		</view>
	</view>
</template>

<script>
	import { isOpenSetting, getOpenSetting } from "@/common/plugin.js";
	import Storage from "@/common/storage.js";
	import { login } from "@/api/user.js";
	
	export default {
		data() {
			return {
				images: {
					iconPhone: require("@/static/icon/icon-phone.png"),
					iconLock: require("@/static/icon/icon-lock.png"),
					iconWx: require("@/static/icon/icon-wx.png")
				},
				isLoadingLogin: false,
				form: {
					name: "18811746451",
					password: "1"
				}
			};
		},
		methods: {
			loginUser() {
				if (!this.form.name) {
					uni.showToast({
					    title: "请输入账户",
					    icon: "none"
					});
					return false;
				} else if (!this.form.password) {
					uni.showToast({
					    title: "请输入密码",
					    icon: "none"
					});
					return false;
				}
				this.isLoadingLogin = true;
				// 18811746451   1
				login(this.form).then(res => {
					this.isLoadingLogin = false;
					if (res.data) {
						Storage.setStorageSync("userInfo", res.data);
						uni.switchTab({
							url: "/pages/tab-bar/index"
						});
					} else {
						uni.showToast({
						    title: "账号密码错误",
						    icon: "none"
						});
					}
				}).catch(e => {
					this.isLoadingLogin = false;
					console.log("login faild", e);
				});
			},
			// 查看已授权选项
			getSettingMes() {
				let _this = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 用户信息已授权，获取用户信息
							uni.getUserProfile({
								desc: "用于完善会员资料",
								success(res) {
									console.log("getUserProfile", res);
								},
								fail() {
									console.log("获取用户信息失败")
								}
							})
						} else if (!res.authSetting['scope.userInfo']) {
							console.log("需要点击按钮手动授权")
						}
					},
					fail() {
						console.log("获取已授权选项失败")
					}
				})
			},
			// 手动授权方法
			onGotUserInfo(e) {
				// 获取用户信息
				uni.getUserInfo({
					// 获取信息成功
					success(res) {
						console.log(res);
						// 成功后进行登录,获取code
						uni.login({
						  success (res) {
							 console.log(res);
							if (res.code) {
							  //发起网络请求
							  console.log(res.code);
							} else {
							  console.log('登录失败！' + res.errMsg)
							}
						  }
						})
					},
					fail() {
						console.log("获取用户信息失败");
					}
				})
			},
			wxLogin() {
				// this.getSettingMes();
				uni.getUserProfile({
				    desc: "完善用户资料",
				    success: function (res) {
						console.log('获取用户信息：' + JSON.stringify(res.userInfo));
						uni.login({
						  provider: 'weixin',
						  success: function (loginRes) {
						    console.log(loginRes.authResult);
						  }
						});
						uni.switchTab({
							url: "/pages/tab-bar/index"
						});
				    },
					fail: function(e) {
						console.log("获取用户信息失败", e);
					}
				});
			},
			faceUp() {
				isOpenSetting(5).then(res => {
					console.log(res);
				});
				getOpenSetting().then(res => {
					console.log(res);
				});
				// uni.chooseImage({
				// 	count: 1,
				// 	sizeType: ["original", "compressed"],
				// 	sourceType: ["camera"],
				// 	success: (res) => {
				// 		console.log(res);
				// 	}
				// });
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-box {
		background-color: #FFFFFF;
	}
	.bg-box {
		width: 100%;
		height: 300rpx;
		background-color: #6DB5FB;
	}
	.login-form {
		width: 600rpx;
		position: relative;
		z-index: 99;
		top: -150rpx;
		left: calc(50% - 300rpx - 30rpx);
		padding: 20rpx 30rpx;
		.login-title {
			font-size: 30rpx;
			color: #000000;
			margin-top: 25rpx;
		}
		.form-input {
			width: 100%;
			height: 60rpx;
			border: 1rpx solid #D6D7D8;
			border-radius: 10rpx;
			font-size: 26rpx;
			padding: 10rpx 0 10rpx 70rpx;
		}
		.input-icon {
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			left: 10rpx;
			z-index: 2;
		}
		.form-phone {
			margin-top: 60rpx;
			position: relative;
			z-index: 1;
		}
		.form-code {
			margin-top: 20rpx;
			position: relative;
			z-index: 1;
		}
		.form-btn {
			margin-top: 80rpx;
			.btn {
				width: 100%;
				height: 80rpx;
				background-color: #6DB5FB;
				color: #FFFFFF;
				font-size: 26rpx;
			}
		}
		.login-wx {
			margin-top: 20rpx;
			.wx-line {
				width: 100rpx;
				height: 2rpx;
				background-color: #333333;
			}
			.wx-icon {
				width: 80rpx;
				height: 80rpx;
				margin: 0 20rpx;
			}
			.wx-text {
				color: #D6D7D8;
				font-size: 24rpx;
			}
		}
	}
</style>

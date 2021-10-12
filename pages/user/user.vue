<template>
    <view class="view-box">
		<view class="base-info info-box">
			<view class="cc-flex-space-between info-item border-bottom-line">
				<view class="item-title">头像</view>
				<view class="item-body" @click="uploadFile"><image class="user-logo" :src="form.img || images.userHead"></image></view>
			</view>
			<view class="cc-flex-space-between info-item">
				<view class="item-title">姓名</view>
				<view class="item-body">
					<input class="input-name" v-model="form.name" placeholder="请输入姓名" maxlength="50"/>
				</view>
			</view>
		</view>
		<view class="safe-info info-box">
			<view class="cc-flex-space-between info-item">
				<view class="item-title">手机号码</view>
				<view class="item-body">
					<input class="input-name" v-model="form.phone" placeholder="请输入手机号" maxlength="11"/>
					<!-- <text v-if="true" class="cc-text-click">绑定</text> -->
					<!-- <text v-else><text>13322221111</text><text class="cc-text-click re-bind">重新绑定</text></text> -->
				</view>
			</view>
		</view>
		<view class="cc-flex-center save-btn">
			<button class="cc-flex-center cc-btn btn" @click="submitForm">保存</button>
		</view>
	</view>
</template>

<script>
	import Storage from "@/common/storage.js";
	import { updateUserInfo } from "@/api/user.js";
	import { pathToBase64 } from "@/common/file-base64.js";
	
	export default {
		name: "user",
		data() {
			return {
				images: {
					userHead: require("@/static/images/user-head.png"),
				},
				userInfo: {},
				form: {
					img: "",
					name: "",
					phone: ""
				}
			}
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
					this.form.img = this.userInfo.head_pic;
					this.form.name = this.userInfo.truename;
					this.form.phone = this.userInfo.phone;
				}
			},
			uploadFile() {
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],
					success: (res) => {
						const imgSrc = res.tempFilePaths[0];
						uni.getFileSystemManager().readFile({
							filePath: imgSrc,
							encoding: 'base64',
							success: r => {
								this.form.img = 'data:image/jpeg;base64,'  + r.data;
							}
						});
					}
				});
			},
			submitForm() {
				if (!this.form.img) {
					uni.showToast({
					    title: "头像不能为空",
					    icon: "none"
					});
					return false;
				} else if (!this.form.name) {
					uni.showToast({
					    title: "名字不能为空",
					    icon: "none"
					});
					return false;
				} else if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
					uni.showToast({
					    title: "手机号错误",
					    icon: "none"
					});
					return false;
				}
				updateUserInfo({
					uid: this.userInfo.id,
					head_pic: this.form.img,
					truename: this.form.name,
					phone: this.form.phone
				}).then(res => {
					uni.showToast({
					    title: res.msg,
					    icon: "none"
					});
					this.userInfo.head_pic = this.form.img;
					this.userInfo.truename = this.form.name;
					this.userInfo.phone = this.form.phone;
					Storage.setStorageSync("userInfo", this.userInfo);
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-box {
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}
	.base-info {
		background-color: #FFFFFF;
	}
	.safe-info {
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}
	.info-item {
		padding: 15rpx 20rpx;
		.item-title {
			font-size: 28rpx;
			color: #333333;
			text-align: left;
		}
		.item-body {
			font-size: 28rpx;
			color: #7A7D7C;
			text-align: right;
		}
	}
	.border-bottom-line {
		border-bottom: 1rpx solid #D6D7D8;
	}
	.user-logo {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}
	.save-btn {
		margin-top: 100rpx;
	}
	.re-bind {
		margin-left: 20rpx;
	}
</style>

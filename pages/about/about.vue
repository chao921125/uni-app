<template>
	<!-- 关于我们 -->
	<view class="about" v-html="aboutInfo"></view>
</template>

<script>
	import Storage from "@/common/storage.js";
	import { getAbout } from "@/api/other.js";
	
	export default {
		data() {
			return {
				userInfo: {},
				aboutInfo: ""
			}
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
					this.getAboutInfo();
				}
			},
			getAboutInfo() {
				getAbout({
					uid: this.userInfo.id
				}).then(res => {
					if (res) {
						this.aboutInfo = res.content;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scopeds>
	.about {
		padding: 30rpx 20rpx 10rpx;
	}
</style>

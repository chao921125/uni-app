<template>
	<view class="type-box">
		<view class="cc-flex-space-between type-item" v-for="(item, index) in typeList" :key="index" @click="toExercises(item)">
			<view class="cc-flex-align-center item-left">
				<view class="type-dot"></view>
				<view class="type-title">{{ item.name }}</view>
			</view>
			<view class="item-right"><uni-icons type="arrowright" size="10" color="#D6D7D8"></uni-icons></view>
		</view>
	</view>
</template>

<script>
	import Storage from "@/common/storage.js";
	import { getType } from "@/api/subject.js";
	
	export default {
		data() {
			return {
				userInfo: null,
				typeList: [],
				// 1 乱序 顺序 专项 2 题型 未作 3 错题 4 收藏
                methods: 1,
                type: 0
			};
		},
        onLoad(options) {
            if (options.method) {
                this.methods = options.method;
            }
            if (options.type) {
                this.type = options.type;
            }
        },
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
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
				}
			},
			// 习题
			toExercises(item) {
				uni.navigateTo({
					url: `/pages/subject/exercises?method=${this.methods}&type=${item.id}`
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.type-box {
		min-height: 100vh;
		background-color: #F2F1F8;
		padding: 10rpx 40rpx 0;
	}
	.type-item {
		width: 100%;
		height: 70rpx;
		background-color: #FFFFFF;
		margin-top: 15rpx;
		color: #333333;
		font-size: 28rpx;
		.item-left {
			margin-left: 15rpx;
			.type-dot {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background-color: #4E9BF5;
			}
			.type-title {
				margin-left: 25rpx;
			}
		}
		.item-right {
			margin-right: 25rpx;
		}
	}
</style>

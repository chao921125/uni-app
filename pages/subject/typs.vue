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
	export default {
		data() {
			return {
				typeList: [
					{
						id: "1",
						name: "单选题"
					},
					{
						id: "2",
						name: "多选题"
					}
				]
			};
		},
		methods: {
			// 习题
			toExercises(item) {
				uni.navigateTo({
					url: "/pages/subject/exercises"
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

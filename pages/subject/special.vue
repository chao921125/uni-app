<template>
	<view class="cc-flex special-box">
		<view class="body-box left-box">
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="cc-flex-align-center left-item" v-for="(item, index) in specialList" :key="index" :class="{ 'item-active'  : currentIndex === index }" @click="changeTap(index)">
					<view :class="{ 'text-active'  : currentIndex === index }"><text  class="left-text">{{ item.name }}</text></view>
				</view>
			</scroll-view>
		</view>
		<view class="body-box right-box">
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="cc-card right-item card-item" v-for="(item, index) in childrenList" :key="index">
					<view class="cc-flex-center">
						<view class="type-title-line"></view>
						<view class="type-title">{{item.name}}</view>
						<view class="type-title-line"></view>
					</view>
					<view class="cc-flex-space-between">
						<view class="cc-flex-center list-item" v-for="(row, i) in item.list" :key="i" :class="{ 'un-auth' : !row.auth }" @click="toExercises(row)">{{ row.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specialList: [],
				childrenList: [],
				currentIndex: 0
			};
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				this.specialList = [
					{
						id: "1",
						name: "示例1",
						types: [
							{
								id: "",
								name: "1-1",
								list: [
									{
										id: "",
										name: "单选",
										auth: true
									},
									{
										id: "",
										name: "多选",
										auth: true
									}
								]
							},
							{
								id: "",
								name: "1-2",
								list: [
									{
										id: "",
										name: "单选",
										auth: false
									},
									{
										id: "",
										name: "多选",
										auth: false
									}
								]
							}
						]
					},
					{
						id: "1",
						name: "示例2",
						types: [
							{
								id: "",
								name: "2-1",
								list: [
									{
										id: "",
										name: "单选",
										auth: true
									},
									{
										id: "",
										name: "多选",
										auth: false
									}
								]
							},
							{
								id: "",
								name: "2-2",
								list: [
									{
										id: "",
										name: "单选",
										auth: false
									},
									{
										id: "",
										name: "多选",
										auth: true
									}
								]
							}
						]
					}
				];
				this.childrenList = [];
				this.childrenList = this.specialList[this.currentIndex].types;
			},
			changeTap(index) {
				this.currentIndex = Number(index);
				this.childrenList = [];
				this.childrenList = this.specialList[this.currentIndex].types;
			},
			// 习题
			toExercises(item) {
				if (!item.auth) return ;
				uni.navigateTo({
					url: "/pages/subject/exercises"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.special-box {
		min-height: 100vh;
	}
	.body-box {
		min-height: 100vh;
	}
	.left-box {
		width: 200rpx;
		background-color: #F4F4F4;
		padding: 40rpx 0;
		.left-item {
			padding: 20rpx 0;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
		}
		.left-text {
			margin-left: 10rpx;
		}
		.item-active {
			background-color: #FFFFFF;
		}
		.text-active {
			width: 100%;
			height: 40rpx;
			background-color: #FFFFFF;
			border-left: 6rpx solid #4E9BF5;
		}
	}
	.right-box {
		width: calc(100% - 200rpx);
		background-color: #FFFFFF;
		padding: 10rpx;
		.card-item {
			padding: 50rpx 20rpx;
			margin-bottom: 20rpx;
		}
		.type-title-line {
			width: 50rpx;
			height: 5rpx;
			background-color: #4E9BF5;
		}
		.type-title {
			font-size: 24rpx;
			margin: 0 20rpx;
		}
		.list-item {
			width: 220rpx;
			height: 50rpx;
			font-size: 20rpx;
			border: 3rpx solid #D6D7D8;
			border-radius: 5rpx;
			margin-top: 20rpx;
			color: #333333;
			background-color: #FFFFFF;
		}
		.un-auth {
			background-color: #F4F4F4;
		}
	}
</style>

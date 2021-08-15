<template>
	<view>
		<view class="cc-flex-center">
			<image class="data-img" :src="images.noData"></image>
		</view>
		<view class="cc-flex-center data-text">{{ text }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: "暂无数据"
			}
		},
		data() {
			return {
				images: {
					noData: require("@/static/images/no-data.png")
				}
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.data-img {
		width: 400rpx;
		height: 400rpx;
	}
	.data-text {
		font-size: 28rpx;
		color: #CCCCCC;
		margin-top: 20rpx;
	}
</style>

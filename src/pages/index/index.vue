<template>
	<view class="content">
    <!-- 小程序头部兼容 -->
    <!-- #ifdef MP -->
    <view class="mp-search-box">
      <input class="ser-input" type="text" value="输入关键字搜索" disabled />
    </view>
    <!-- #endif -->

		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
    <view>
      <view>请选择您的身份</view>
      <view>开启您的职领生涯</view>
    </view>
    <view>
      <view>s</view>
      <view>s</view>
      <view>s</view>
      <view>s</view>
      <view>s</view>
      <view>s</view>
      <view>s</view>
      <view>s</view>
      <view>j</view>
      <view>t</view>
    </view>
    <uni-badge text="2" type="success"></uni-badge>
    <view><button  @click="gotoHome">确定</button></view>
    <button class="btnInfo" open-type="getUserInfo"/>

	</view>
</template>

<script>
import {uniBadge} from '@dcloudio/uni-ui'

	export default {
    components: {uniBadge},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
      gotoHome() {
        uni.navigateTo({url: '/pages/home/home'})
      }
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

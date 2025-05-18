<script setup>
	import Icon from "@/static/logo.png";
	import Gzh from "@/static/images/about/gzh.png";
	import PayWx from "@/static/images/about/pay-wx.png";
	import PayZfb from "@/static/images/about/pay-zfb.png";
	import HbZfb from "@/static/images/about/hb-zfb.png";
</script>

<template>
	<view class="container">
		<view class="re-flex-row-center">
			<van-image
				:src="Icon"
				fit="contain"
				round
				width="100"
				height="100"></van-image>
		</view>
		<view>十五年开发团队（前后端/设计/UI）经验，多端（web/小程序/APP）开发经验，欢迎咨询：19920008007（VX 同步</view>
		<view class="re-flex-row-center">
			<van-image
				:src="Gzh"
				fit="contain"
				width="200"
				height="300"></van-image>
			<van-image
				:src="HbZfb"
				fit="contain"
				width="200"
				height="300"></van-image>
		</view>
		<view class="re-flex-row-center">
			<van-image
				:src="PayWx"
				fit="contain"
				width="200"
				height="300"></van-image>
			<van-image
				:src="PayZfb"
				fit="contain"
				width="200"
				height="300"></van-image>
		</view>
	</view>
</template>

<style lang="scss"></style>

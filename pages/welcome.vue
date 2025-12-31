<script setup name="">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { storeHeight } from "@/store/navHeight.js";
import Constants from "@/common/utils/constant.js";
import { onShow } from "@dcloudio/uni-app";

const data = reactive({
	skip: {
		time: 5,
		timer: null,
		waitTime: 1000,
	},
});

const onStartTime = () => {
	data.skip.timer = setInterval(() => {
		if (data.skip.time) {
			data.skip.time--;
		} else {
			clearInterval(data.skip.timer);
			setTimeout(() => {
				onToHome();
			}, data.skip.waitTime);
		}
	}, 1000);
};

const onToHome = () => {
	clearInterval(data.skip.timer);
	uni.switchTab({
		url: "/pages/tab-home",
	});
};

onShow(() => {
	onStartTime();
});
</script>

<template>
	<view class="skip-btn" :style="{ top: `${storeHeight().heightNav + 10}px` }">
		<view v-if="data.skip.time" class="btn-ct re-flex-center">{{ data.skip.time }} s</view>
		<view v-else class="btn-ct re-flex-center" @click="onToHome">跳过</view>
	</view>
	<view class="re-fill re-flex-center">
		<image class="" :src="Constants.img.welcome"></image>
	</view>
</template>

<style scoped lang="scss">
.skip-btn {
	position: fixed;
	right: 10rpx;
}
.btn-ct {
	width: 120rpx;
	height: 60rpx;
	border: 1rpx solid #ccc;
	border-radius: 30rpx;
}
</style>

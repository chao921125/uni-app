<script setup name="">
	import { onUnmounted, reactive } from 'vue';
	import UniMethods from "@/common/plugins/uni-methods.js";
	import BLE from "@/common/plugins/ble.js";
	
const props = defineProps({
	name: {
		required: false,
		type: String,
		default: "",
	},
});
const emits = defineEmits(["change"]);
const changeClick = () => {
	emits("change", true);
};
defineExpose({
	changeClick,
});

const onToHome = () => {
	uni.switchTab({
		url: "/pages/tab-bar/home"
	})
}

const bleManager = new BLE({
  autoReconnect: true,
  mtu: 128,
  timeout: 8000
});
const testMth = async() => {
	
	// 注册全局回调（所有设备共用）
	bleManager.onConnected((info) => {
	  console.log('✅ 设备连接成功:', info.deviceId);
	});
	
	bleManager.onDataReceived((data) => {
	  console.log('📡 收到来自', data.deviceId, '的数据:', data.hex);
	});
	
	// 搜索设备
	const devices = await bleManager.discoverDevices(['FFF0']);
	if (devices.length >= 2) {
	  // 连接前两个设备
	  await bleManager.connect(devices[0].deviceId, 'FFF0');
	  await bleManager.connect(devices[1].deviceId, 'FFF0');
	}
	
	// 向指定设备发送数据
	await bleManager.writeHex(devices[0].deviceId, 'AA550102');
	
	// 断开某个设备
	await bleManager.disconnect(devices[1].deviceId);
	
	// 断开所有
	await bleManager.disconnectAll();
}
onUnmounted(() => {
  ble.destroy(); // 页面销毁时释放资源
});

let swiperData = reactive({
	list: [{name: "t1"}, {name: "t2"}, {name: "t3"}],
	current: 0,
});
const onSwiperAdd = () => {
	swiperData.list.push({name: `A${swiperData.current+1}`});
}
const onSwiperDel = () => {
	swiperData.list = swiperData.list.slice(0,-1);
}
</script>

<template>广告
	<view @click="changeClick">template {{ props.name }}</view>
	<button @tap="onToHome">to home</button>
	<button @click="testMth">test</button>
	<button @tap="onSwiperAdd">add swiper</button>
	<button @tap="onSwiperDel">del swiper</button>
	<swiper class="swiper" indicator-dots circular :current="swiperData.current">
		<swiper-item v-for="item in swiperData.list" :key="item.name">
			<view class="swiper-item uni-bg-red">{{item.name}}</view>
		</swiper-item>
	</swiper>
</template>

<style scoped lang="scss"></style>

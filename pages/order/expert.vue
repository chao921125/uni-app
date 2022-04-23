<template>
	<view>
		<uni-card>
			<view class="re-flex-row-between">
				<view>专家：111111</view>
				<view><button type="primary" size="mini" @click="toOrderPay(1)">下单</button></view>
			</view>
			<view>简介：111111</view>
		</uni-card>
	</view>
</template>

<script>
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/common.utils.js";
	import defaultConfig from "@/common/config/index.js";
	
	export default {
		data() {
			return {
				
			};
		},
		setup() {
			// const props = defineProps({ id: { type: String }, });
			// onLoad 接受 A 页面传递的参数
			onLoad((option) => {
			  console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
			});
			onShow(() => {
			  console.log("B 页面 onShow");
			});
		},
		methods: {
			toOrderPay(type) {
				utils.href(defaultConfig.routePath.orderPay + `?id=${type}`, false);
			}
		}
	}
</script>

<style lang="scss">

</style>

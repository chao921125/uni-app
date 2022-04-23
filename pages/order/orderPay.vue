<template>
	<view>
		<view>专家</view>
		<view>价格</view>
		<view>问题</view>
		<view>描述</view>
	</view>
	<BtnPay @pay="toOrderPayResult" @cancel="toBack"></BtnPay>
</template>

<script>
	import BtnPay from "./components/BtnPay.vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/common.utils.js";
	import defaultConfig from "@/common/config/index.js";
	
	export default {
		components: {
			BtnPay,
		},
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
			toBack() {
				utils.back();
			},
			toOrderPayResult() {
				utils.href(defaultConfig.routePath.orderPayResult, false);
			}
		}
	}
</script>

<style lang="scss">

</style>

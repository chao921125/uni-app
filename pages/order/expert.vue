<template>
	<view>
		
	</view>
</template>

<script>
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	export default {
		setup() {
			const props = defineProps({ id: { type: String }, });
			// onLoad 接受 A 页面传递的参数
			onLoad((option) => {
			  console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
			});
			onShow(() => {
			  console.log("B 页面 onShow");
			});
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>

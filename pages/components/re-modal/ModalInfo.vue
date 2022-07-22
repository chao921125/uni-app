<template>
	<uni-popup ref="modal" type="center">
		<view class="modal-body re-flex-row-center">请<text class="text-link" @click="toUser">补全信息</text>后进行购买</view>
	</uni-popup>
</template>

<script>
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/uniUtils.js";
	
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			openModal() {
				this.$refs.modal.open();
			},
			toUser() {
				utils.gotoTab(defaultConfig.routePath.tabbarUser, true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal-body {
		width: 100%;
		min-width: 500rpx;
		min-height: 200rpx;
		background-color: #FFF;
	}
</style>

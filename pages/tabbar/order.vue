<template>
    <view>
        <uni-card @click="toDetail(1)">
            <view>订单编号：1111111111</view>
            <view>专家：111111</view>
            <view>问题名称：111111</view>
            <view>问题描述：111111</view>
        </uni-card>
    </view>
</template>

<script>
	import utils from "@/common/plugins/common.utils.js";
	import defaultConfig from "@/common/config/index.js";
	
    export default {
        data() {
            return {
                
            };
        },
		methods: {
			toDetail(id) {
				utils.href(defaultConfig.routePath.orderList + `?id=${id}`, false);
			}
		}
    }
</script>

<style lang="scss">

</style>

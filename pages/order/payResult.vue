<template>
	<view class="re-flex-row-center pay-rel-title title-h1">
		支付成功
	</view>
	<view class="re-flex-row-center pay-rel-img">
		<cover-image class="rel-img" v-if="imgPath" :src="imgPath.PaySuccess"></cover-image>
	</view>
	<view class="re-flex-row-center pay-rel-text">
		<text>{{returnTime}}</text>s 后返回
	</view>
</template>

<script>
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/utils.js";
    
	export default {
		data() {
			return {
                imgPath: defaultConfig.imgPath,
                returnTime: 5,
			};
		},
        created() {
            this.setReturnTime();
        },
        methods: {
            setReturnTime() {
                let _this = this;
                setInterval(() => {
                    _this.returnTime--;
                    if (_this.returnTime === 0) {
                        utils.hrefTabbar(defaultConfig.routePath.tabbarOrder, true);
                    }
                }, 1000);
            }
        }
	}
</script>

<style lang="scss">
    .pay-rel-img {
        .rel-img {
            width: 60rpx;
            height: 60rpx;
        }
    }
</style>

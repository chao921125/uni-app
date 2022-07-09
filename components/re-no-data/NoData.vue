<template>
    <view class="re-flex-row-center">
        <cover-image class="img-no-data" v-if="imgPath" :src="imgPath.NoData"></cover-image>
    </view>
    <view v-if="text" class="re-flex-row-center text-msg re-margin-top-30">
        <text>{{ text }}</text>
    </view>
</template>

<script>
    import defaultConfig from "@/common/config/index.js";
	import { ref } from "vue";
    export default {
		props: {
			text: {
				type: String,
				default: "",
			}
		},
		setup() {
			const imgPath = ref(defaultConfig.imgPath);
			return {
				imgPath
			};
		},
        // data() {
        //     return {
        //         imgPath: defaultConfig.imgPath
        //     }
        // }
    }
</script>

<style lang="scss">
    .img-no-data {
        width: 200rpx;
        height: 200rpx;
    }
	.text-msg {
		font-size: 30rpx;
	}
</style>
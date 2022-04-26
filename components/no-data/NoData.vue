<template>
    <view class="re-flex-row-center">
        <cover-image class="img-no-data" v-if="imgPath" :src="imgPath.NoData"></cover-image>
    </view>
</template>

<script>
    import defaultConfig from "@/common/config/index.js";
    export default {
        data() {
            return {
                imgPath: defaultConfig.imgPath
            }
        }
    }
</script>

<style lang="scss">
    .img-no-data {
        width: 200rpx;
        height: 200rpx;
    }
</style>
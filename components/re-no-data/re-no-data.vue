<template>
    <view class="re-flex-row-center">
        <image class="img-no-data" v-if="imgPath" :src="imgPath.NoData"></image>
    </view>
    <view v-if="text" class="re-flex-row-center text-msg re-margin-top-30">
        <text>{{ text }}</text>
    </view>
</template>

<script>
import defaultConfig from '@/common/config/index.js';
export default {
    props: {
        text: {
            type: String,
            default: '暂无数据'
        }
    },
    data() {
        return {
            imgPath: defaultConfig.imgPath
        };
    }
};
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

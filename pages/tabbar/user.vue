<template>
    <view>
        <view><cover-image v-if="imgPath" :src="imgPath.UserAvatar"></cover-image></view>
        <view>名字</view>
    </view>
</template>

<script>
    import defaultConfig from "@/common/config/index.js";
    
    export default {
        data() {
            return {
                imgPath: defaultConfig.imgPath,
            };
        }
    }
</script>

<style lang="scss">

</style>

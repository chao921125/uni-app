<template>
    <view class="message-space"></view>
    <view class="message-bottom re-flex-row-between re-z-index-80">
        <view class="message-left"><input class="message-input" placeholder="请输入内容" v-model="inputValue"/></view>
        <view class="message-right"><button type="primary" class="btn" @click="sendMessage">发送</button></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                inputValue: "",
            };
        },
        methods: {
            sendMessage() {
                this.$emit("click", this.inputValue);
				this.inputValue = "";
            }
        }
    }
</script>

<style lang="scss">
.message-space {
    width: 100%;
    height: 120rpx;
    padding-bottom: constant(safe-area-inset-bottom); 
    padding-bottom: env(safe-area-inset-bottom); 
}
.message-bottom {
	background-color: #FFF;
    width: 100%;
    height: 120rpx;
    position: fixed;
    bottom: 0;
    box-shadow: 0 -10rpx 10rpx 0 #D3D3D3;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .message-left {
        width: calc(100% - 180rpx - 2rpx - 60rpx - 20rpx);
        padding: 0 20rpx;
    }
    .message-input {
        width: 100%;
        height: 80rpx;
        border: 1px solid #D3D3D3;
    }
    .btn {
        width: 180rpx;
        height: 80rpx;
        line-height: 80rpx;
        margin-right: 20rpx;
    }
}
</style>

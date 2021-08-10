<template>
  <view v-show="show" class="box">
    <view class="img"></view>
    <view class="text">{{text}}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      text: ''
    };
  },
  methods: {
    open(text) {
      this.show = true;
      this.text = text;
      setTimeout(() => { this.show = false; }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 560rpx;
  height: 250rpx;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 80;

  .img {
    width: 78rpx;
    height: 78rpx;
    margin-top: 56rpx;
    z-index: 900;
    background: url('../static/image/img-y-02.png');
    background-size: 78rpx 78rpx;
  }
  .text {
    font-size: 30rpx;
    color: rgba(255, 255, 255, 1);
    margin-top: 40rpx;
  }
}
</style>

<template>
  <view>
    <button @tap="toSubject">跳转</button>
  </view>
</template>

<script>
export default {
  name: "index",
  methods: {
    toSubject() {
      uni.navigateTo({
        url: "/pages/subject/order/order"
      });
    }
  }
}
</script>

<style scoped lang="scss">

</style>
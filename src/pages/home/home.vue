<template>
  <view class="home-box">
    首页
    <tab-bar :active="0"></tab-bar>
  </view>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  name: "home",
  components: {
    TabBar
  }
}
</script>

<style scoped lang="scss">
.home-box {
  background-color: #FFFFFF;
}
</style>

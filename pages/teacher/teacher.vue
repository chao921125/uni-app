<template>
  <view class="teacher-box">导师
    <tab-bar :active="1"></tab-bar></view>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  name: "teacher",
  components: {
    TabBar
  }
}
</script>

<style scoped lang="scss">
.teacher-box {
  background-color: #FFFFFF;
}
</style>

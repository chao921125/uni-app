<template>
  <view>话题广场
    <tab-bar :active="2"></tab-bar></view>
</template>

<script>
import TabBar from "@/components/TabBar";

export default {
  name: "topic",
  components: {
    TabBar
  }
}
</script>

<style scoped>

</style>

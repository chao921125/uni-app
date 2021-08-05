'<template>
  <van-tabbar :active="activeVal" @change="onChange">
    <van-tabbar-item icon="home-o">{{ router.home.label }}</van-tabbar-item>
    <van-tabbar-item icon="search">{{ router.teacher.label }}</van-tabbar-item>
    <van-tabbar-item icon="friends-o">{{ router.topic.label }}</van-tabbar-item>
    <van-tabbar-item icon="friends-o">{{ router.curriculum.label }}</van-tabbar-item>
    <van-tabbar-item icon="setting-o">{{ router.user.label }}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import constants from '@/common/constants';

export default {
  name: "tab-bar",
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeVal: 0,
      router: constants.routerList
    }
  },
  created() {
    this.activeVal = this.active;
  },
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      if (this.activeVal !== event.detail) {
        this.activeVal = event.detail;
        let toRouter = '';
        switch (event.detail) {
          case 0 : toRouter = this.router.home.url; break;
          case 1 : toRouter = this.router.teacher.url; break;
          case 2 : toRouter = this.router.topic.url; break;
          case 3 : toRouter = this.router.curriculum.url; break;
          case 4 : toRouter = this.router.user.url; break;
          default : toRouter = ''; break;
        }
        uni.redirectTo({ url: toRouter });
      }
    }
  }
}
</script>

<style scoped>

</style>

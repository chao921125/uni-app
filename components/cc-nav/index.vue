<template>
  <view class="custom-navbar">
    <!-- 1️⃣ 固定定位导航栏主体 -->
    <view class="navbar-wrapper" :class="{ 'is-fixed': fixed }" :style="wrapperStyle">
      <!-- 状态栏安全区 -->
      <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
      
      <!-- 导航栏内容区 -->
      <view class="nav-content" :style="{ height: navHeightNum + 'px' }">
        <!-- 左侧区域 -->
        <view v-if="showLeft" class="nav-side nav-left" @click.stop="handleLeft">
          <image v-if="leftIcon" class="side-icon" :src="leftIcon" mode="aspectFit" />
          <text v-if="leftText" class="side-text">{{ leftText }}</text>
          <slot name="left"></slot>
        </view>
        <view v-else class="nav-side nav-placeholder"></view>

        <!-- 中间区域（绝对居中，不受左右宽度影响） -->
        <view class="nav-center">
          <text v-if="title" class="nav-title" :style="computedTitleStyle">{{ title }}</text>
          <slot name="center"></slot>
        </view>

        <!-- 右侧区域 -->
        <view v-if="showRight" class="nav-side nav-right" @click.stop="handleRight">
          <slot name="right"></slot>
          <text v-if="rightText" class="side-text">{{ rightText }}</text>
          <image v-if="rightIcon" class="side-icon" :src="rightIcon" mode="aspectFit" />
        </view>
        <view v-else class="nav-side nav-placeholder"></view>
      </view>
    </view>

    <!-- 2️⃣ 占位层：防止 fixed 脱离文档流导致页面内容塌陷 -->
    <view v-if="placeholder" class="navbar-placeholder" :style="{ height: totalHeight + 'px' }"></view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  titleStyle: { type: [Object, String], default: '' },
  bgColor: { type: String, default: '#ffffff' },
  navHeight: { type: [Number, String], default: 44 },   // 导航栏内容高度（不含状态栏）
  placeholder: { type: Boolean, default: true },        // 是否自动占位
  fixed: { type: Boolean, default: true },              // 是否固定顶部
  showLeft: { type: Boolean, default: true },           // 左侧显隐
  showRight: { type: Boolean, default: true },          // 右侧显隐
  leftIcon: { type: String, default: '' },              // 左侧图标/图片路径
  leftText: { type: String, default: '' },              // 左侧文字
  rightIcon: { type: String, default: '' },             // 右侧图标/图片路径
  rightText: { type: String, default: '' },             // 右侧文字
  autoBack: { type: Boolean, default: true }            // 左侧是否自动返回
})

const emit = defineEmits(['leftClick', 'rightClick'])

// 安全计算
const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight || 0)
const navHeightNum = computed(() => parseInt(props.navHeight) || 44)
const totalHeight = computed(() => statusBarHeight.value + navHeightNum.value)

const wrapperStyle = computed(() => ({
  backgroundColor: props.bgColor
}))

const computedTitleStyle = computed(() => {
  const base = { fontSize: '32rpx', fontWeight: '500', color: '#303133' }
  if (typeof props.titleStyle === 'string') return props.titleStyle
  if (typeof props.titleStyle === 'object') return { ...base, ...props.titleStyle }
  return base
})

// 左侧点击：自动返回 + 事件抛出
const handleLeft = () => {
  if (props.autoBack && uni.getCurrentPages().length > 1) {
    uni.navigateBack()
  }
  emit('leftClick')
}

// 右侧点击
const handleRight = () => {
  emit('rightClick')
}
</script>

<style lang="scss" scoped>
.custom-navbar {
  width: 100%;
  box-sizing: border-box;
}

.navbar-wrapper {
  width: 100%;
  box-sizing: border-box;
  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
}

.status-bar {
  width: 100%;
  background-color: inherit;
}

.nav-content {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0 24rpx;
}

.nav-side {
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 2;
  box-sizing: border-box;
}

.nav-left { justify-content: flex-start; }
.nav-right { justify-content: flex-end; }
.nav-placeholder { pointer-events: none; } // 占位元素不可点击

.nav-center {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 60%; // 防止超长标题挤压两侧
  z-index: 1;
  overflow: hidden;
}

.nav-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}
.side-text {
  font-size: 28rpx;
  color: inherit;
}

.navbar-placeholder {
  width: 100%;
  pointer-events: none;
}
</style>
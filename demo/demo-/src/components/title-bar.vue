<template>
  <view class="title-bar" :style="boxStyle">
    <view class="status_bar"></view>
    <view class="flex-between title" :style="titleStyle">
      <image
        :style="leftShow ? '' : 'visibility:hidden'"
        class="back-icon"
        src="../static/image/arrow-left.png"
        @tap.stop="leftFunc"
      />
      <div class="title-tv" :style="titleTextStyle">{{ titleText }}</div>
      <div class="title-right" @tap.stop="rightFunc">
        <!-- <min-badge :count="rightNum" v-if="rightCart">
          <image class="right-img" src="../../static/img/tabbar-me-sle.png" mode="scaleToFill" />
        </min-badge>-->
      </div>
    </view>
    <view class="screen-view"></view>
  </view>
</template>

<script>
// import minBadge from './min-badge.vue';
export default {
  // name: 'title',
  components: {
    // minBadge
  },
  props: {
    // 標題顯示文本
    text: {
      type: String,
      default: 'GuuCube'
    },
    // 跳轉類型，默認redirectTo
    type: {
      type: String,
      default: 'redirectTo'
    },
    // 自定義回退地址
    url: {
      type: String,
      default: undefined
    },
    // 右側購物車按鈕
    rightCart: {
      type: Boolean,
      default: false
    },
    // 自定義的左側點擊事件
    leftClick: {
      type: Function,
      default: undefined
    },
    // 自定義的右側點擊事件
    rightClick: {
      type: Function,
      default: undefined
    },
    // 左側返回是否顯示
    leftShow: {
      type: Boolean,
      default: true
    },
    titleStyle: {
      type: String,
      default: ''
    },
    titleTextStyle: {
      type: String,
      default: ''
    },
    boxStyle: {
      type: String,
      default: ''
    }
  },
  computed: {
    titleText() {
      return `${this.text}`;
    }
  },
  data() {
    return {
      rightNum: 0
    };
  },
  created() {
    if (this.rightCart) {
      this.rightCount();
    }
    // this.titleStyle = `background-color: ${this.backgroundColor};color: ${this.textColor}`;
  },
  methods: {
    // 左側點擊執行
    leftFunc() {
      // 自定義左側路徑跳轉
      // if (this.url) {
      //   this.$uni[this.type]({ url: this.url });
      //   return;
      // }
      // 自定義左側點擊方法
      if (this.leftClick) {
        this.leftClick();
        return;
      }
      // 默認執行回退方法
      // history.back();
      this.$uni.navigateBack();
    },
    rightCount() {
      this.$axios
        .get({
          url: `/stat-info/order-count`
        })
        .then(result => {
          this.rightNum = result;
        });
    },
    // 右側點擊執行
    rightFunc() {
      // 自定義右側點擊方法
      if (this.rightClick) {
        this.rightClick();
        return;
      }
      // 右側跳轉購物車
      this.rightCart && this.$uni.switchTab({ url: '/pages/tabbar/tabbar-me' });
    }
  }
};
</script>

<style lang="scss">
.title-bar {
  position: sticky;
  top: 0;
  z-index: 999;
  padding-top: var(--status-bar-height);
  background-color: white;
}
.title {
  width: calc(100% - 60rpx);
  left: 0;
  height: 60rpx;
  padding: 14rpx 30rpx;
  background-color: white;
  border-bottom: 1px solid #ccc;
  // position: sticky;
  // top: 0;
  // z-index: 999;
  .back-icon {
    width: 20rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }

  .title-back {
    color: rgb(0, 0, 0);
    font-size: 40rpx;
  }

  .title-tv {
    flex: 1;
    width: 500rpx;
    text-align: center;
    font-size: 30rpx;
  }

  .title-right {
    width: 40rpx;
    height: 100%;
    padding-top: 10rpx;
  }
  .right-img {
    width: 40rpx;
    height: 40rpx;
    margin-top: 4rpx;
  }
}
</style>

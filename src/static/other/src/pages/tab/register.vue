<template>
  <view>
    <view v-html="productObj.content">{{productObj.content}}</view>
    <!-- <view class="head-box">
      <view class="search-box">
        <image
          class="search"
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/serach.png"
          mode="aspectFit"
        />
        <input class="search-inp" type="text" placeholder="搜索医院" />
      </view>
      <view class="tab-box">
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-registertab.png"
          mode="aspectFit"
        />
      </view>
    </view>
    <view class="register-list">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-registerlist.png"
        mode="aspectFit"
      />
    </view>-->
  </view>
</template>
<script>
export default {
  data() {
    return {
      code: '',
      productObj: {}
    };
  },
  onLoad(option) {
    if (option.code) {
      this.code = option.code;
      this.pageInit();
    }
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/wx/scan`,
        data: {
          code: this.code
        }
      }).then(res => {
        if (res && (res.code === 0 || res.code === '0')) {
          this.productObj = res.data;
          return;
        }
        this.$uni.showToast(res.message);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// .head-box {
//   width: calc(100% - 40rpx);
//   height: auto;
//   background: #ffffff;
//   padding: 20rpx 20rpx 36rpx 20rpx;
//   .search-box {
//     width: calc(100% - 40rpx);
//     height: 62rpx;
//     background: #f8f8f8;
//     border-radius: 30rpx;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     padding: 0 20rpx;
//     .search {
//       width: 30rpx;
//       height: 30rpx;
//       margin-right: 20rpx;
//     }
//     .search-inp {
//       width: calc(100% - 50rpx);
//       height: 62rpx;
//       font-size: 26rpx;
//       font-weight: 400;
//       color: #000000;
//     }
//   }
//   .tab-box {
//     width: 645rpx;
//     height: 154rpx;
//     margin: 0 auto;
//     margin-top: 36rpx;
//     image {
//       width: 100%;
//       height: 100%;
//     }
//   }
// }
// .register-list {
//   width: 100%;
//   height: 913rpx;
//   margin-top: 22rpx;
//   image {
//     width: 100%;
//     height: 100%;
//   }
// }
</style>

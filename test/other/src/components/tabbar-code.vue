<template>
  <div>
    <image
      v-if="!codeShow"
      class="tabbar-code"
      :src="chooseShow?'../../static/image/code-close.png':'../../static/image/tabbar-code.png'"
      @tap="getCode"
    />
    <div v-if="chooseShow" class="code-bg" @tap="bgClick"></div>
    <div v-if="chooseShow && !langType" class="flex-row choose">
      <div class="flex-column-center choose-view" @tap="showCode">
        <!-- <image src="/static/image/code-code.png" />
        <div>我的會員碼</div>-->
      </div>
      <div class="flex-column-center choose-view" @tap="getScan">
        <!-- <image src="/static/image/code-scan.png" />
        <div>掃碼</div>-->
      </div>
    </div>
    <div v-if="chooseShow && langType" class="flex-row chooseEnglish">
      <div class="flex-column-center choose-view" @tap="showCode">
        <!-- <image src="/static/image/code-code.png" />
        <div>我的會員碼</div>-->
      </div>
      <div class="flex-column-center choose-view" @tap="getScan">
        <!-- <image src="/static/image/code-scan.png" />
        <div>掃碼</div>-->
      </div>
    </div>
    <div v-if="codeShow" class="flex-column-center code-view">
      <div class="code-name">{{user.nickName}}</div>
      <image class="qr-code" :src="qrDetail.qrData" mode="aspectFit" />
      <div>Member ID：{{ qrDetail.code }}</div>
      <div class="close" @tap="codeShow = false"></div>
    </div>
  </div>
</template>

<script>
import Storage from '../extend/uni-storage-localstorage';
export default {
  props: {
    codeType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chooseShow: false,
      codeShow: false,
      qrDetail: '',
      user: undefined,
      // 语言分类，false代表繁体中文、true代表English
      langType: false
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getCode() {
      if (this.$store.getters.user) {
        this.chooseShow = !this.chooseShow;
      } else {
        this.$uni.navigateTo({ url: '/pages/login/login' });
      }
      if (Storage.get('i18n.locale') === 'zh-hk' || !Storage.get('i18n.locale')) {
        this.langType = false;
      } else {
        this.langType = true;
      }
    },
    bgClick() {
      this.codeShow = false;
      this.chooseShow = false;
    },
    showCode() {
      this.$axios.get({
        url: `/app-user/qr`
      }).then(res => {
        this.user = this.$store.getters.user;
        this.qrDetail = res;
        this.codeShow = true;
      });
    },
    getScan() { }
  },
  watch: {
    codeType(value) {
      this.codeShow = false;
      this.chooseShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabbar-code {
  width: 134rpx;
  height: 154rpx;
  position: fixed;
  bottom: 24rpx;
  z-index: 999;
  margin-left: 308rpx;
}
.code-bg {
  position: fixed;
  top: 0;
  width: 750rpx;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 699;
}
.choose,
.chooseEnglish {
  width: 750rpx;
  height: 480rpx;
  position: fixed;
  z-index: 998;
  background-image: url("../static/image/code-diamondbg.png");
  background-size: 100% 100%;
  bottom: 100rpx;
  .choose-view {
    width: 170rpx;
    margin: 0 auto;
    font-size: 34rpx;
    color: white;
    margin-top: -90rpx;
    height: 220rpx;
    image {
      width: 120rpx;
      height: 142rpx;
      margin-bottom: 20rpx;
    }
  }
}
.chooseEnglish {
  background-image: url("../static/image/code-diamondbg-english.png");
}
.qr-code {
  width: 400rpx;
  height: 400rpx;
}
.code-view {
  width: 708rpx;
  height: 774rpx;
  position: fixed;
  background-image: url("../static/image/code-bg.png");
  background-size: 100%;
  left: 22rpx;
  bottom: 50rpx;
  z-index: 999;
  .code-name {
    margin-top: 50rpx;
    font-size: 30rpx;
    font-weight: 500;
  }
}
.close {
  width: 100rpx;
  height: 100rpx;
  position: relative;
  bottom: -50rpx;
}
@media screen and (min-width: 480px) {
  .code-view {
    left: calc(50% - 354rpx);
  }
}
</style>

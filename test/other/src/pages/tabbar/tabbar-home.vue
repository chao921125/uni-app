<template>
  <view class="body-wrap">
    <!-- 商品介绍模块 -->
    <view class="home-head">
      <view class="home-head1">
        <view class="right-box">
          <image
            src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-home-right.png"
            mode="aspectFit"
          />
        </view>
        <view class="info-title">追溯码验证通过</view>
        <view class="qrcode-box">
          <canvas class="canvas-code" canvas-id="myQrcode" v-if="hasCanvasShow" />
        </view>
        <view class="info-num">{{ medicineObj.txId }}</view>
      </view>
      <view class="home-head2">
        <view class="sale-box">
          <view class="sale-img">
            <image
              src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-address.png"
              mode="aspectFit"
            />
          </view>
          <view class="sale-name">销售渠道：诗乐氏官方旗舰店</view>
        </view>
        <view class="product-box">
          <view class="drug-box" @tap="goTraceability('1')">
            <view class="drug-name">{{ medicineObj.productName }}</view>
            <view class="specifications">
              <text>规格:</text>
              {{ medicineObj.specifications }}
            </view>
            <view class="time">
              <view class="time-in">
                <view class="time-title">有效期:</view>
                <view class="time-info">{{ medicineObj.period }}</view>
              </view>
              <view class="home-go">
                <image
                  src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-go.png"
                  mode="aspectFit"
                />
              </view>
            </view>
          </view>
          <view class="manufactor-box" @tap="goTraceability('2')">
            <view class="drug-name">{{ medicineObj.companyName }}</view>
            <view class="manufactor-address">厂家地址</view>
            <view class="address-box">
              <view class="address-info">{{ medicineObj.officeAddress }}</view>
              <view class="home-go">
                <image
                  src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-go.png"
                  mode="aspectFit"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- tab模块 -->
    <view class="home-head4">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-home-modul1.png"
        mode="aspectFit"
        @tap="goService"
      />
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-home-modul2.png"
        mode="aspectFit"
        @tap="goProductInfo"
      />
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-home-modul3.png"
        mode="aspectFit"
        @tap="goMedicine"
      />
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-home-modul4.png"
        mode="aspectFit"
        @tap="goSale"
      />
    </view>
    <!-- type为1的文章列表 -->
    <view class="essay-box">
      <view
        class="essay-in"
        v-for="(item, index) in articleList"
        :key="index"
        @tap="goArticleDetail(item.id)"
      >
        <view class="essay-info">
          <view class="title">{{ item.tag }}</view>
          <view class="name">{{ item.title }}</view>
        </view>
        <view class="essay-data">
          <view class="read-box">
            <view>阅读</view>
            <text>{{ item.readCount }}</text>
          </view>
          <view class="fabulous-box">
            <view>点赞</view>
            <text>{{ item.thumbCount }}</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 视频播放模块 -->
    <view class="video-box">
      <video
        id="myVideo"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-video.mp4"
        poster="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-videoimg.png"
        controls
        object-fit="fill"
        auto-pause-if-open-native
        @fullscreenchange="fullScreen"
      ></video>
    </view>
    <!-- banner轮播模块(type为4的文章列表) -->
    <swiper class="swiper" circular :autoplay="true" :interval="4200" :duration="500">
      <swiper-item
        v-for="(item, index) in articleListBanner"
        :key="index"
        @tap="goArticleDetail(item.id)"
      >
        <view class="swiper-item">
          <image style="height: 250rpx;width: 700rpx;" :src="item.img" mode="aspectFit" />
        </view>
      </swiper-item>
    </swiper>
    <!-- type为2的文章列表 -->
    <view class="article-box">
      <view
        class="text-box"
        v-for="(item, index) in articleListTwo"
        :key="index"
        @tap="goArticleDetail(item.id)"
      >
        <view class="head-picture">
          <image :src="item.img" mode="aspectFit" />
        </view>
        <view class="article-info">
          <view class="content">{{ item.title }}</view>
          <view class="thumbs-box">
            <view>
              阅读
              <text>{{ item.readCount }}</text>
            </view>
            <view>
              点赞
              <text>{{ item.thumbCount }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- type为3的文章列表 -->
    <view
      class="long-article"
      v-for="(item, index) in articleListThree"
      :key="index"
      @tap="goArticleDetail(item.id)"
    >
      <view class="head-picture">
        <image :src="item.img" mode="aspectFit" />
      </view>
      <view class="article-info">
        <view class="content">{{ item.title }}</view>
        <view class="data-box">
          <view class="thumbs-box">
            <view>
              阅读
              <text>{{ item.readCount }}</text>
            </view>
            <view style="margin-left:20rpx;">
              点赞
              <text>{{ item.thumbCount }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 占位模块 -->
    <view class="home-bottom"></view>
    <web-view
      v-if="medecineShow"
      src="https://shop92159255.m.youzan.com/v2/showcase/homepage?alias=kN03r6xqZW&sf=wx_menu"
    ></web-view>
    <web-view
      v-if="saleShow"
      src="https://shop.m.jd.com/?shopId=995979&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&ad_od=share&gx=RnE1lWYNYTTfztRJ9sEsCMho431Q76w"
    ></web-view>
  </view>
</template>

<script>
import viewBase from '@/extend/view-base.js';
import _ from 'lodash';
import QRCode from '../../utils/qrcode';
export default {
  extends: viewBase,
  data() {
    return {
      code: '',
      articleList: [],
      articleListTwo: [],
      articleListThree: [],
      articleListBanner: [],
      articleOne: {},
      articleTwo: {},
      medicineObj: {
        qrcode: '',
        code: '',
        productName: '',
        specifications: '',
        period: '',
        periodUnit: '',
        companyName: '',
        officeAddress: ''
      },
      isPageInit: true,
      // 在线购买的web-view是否显示
      medecineShow: false,
      // 促销专区的web-view是否显示
      saleShow: false,
      // 有效期列表
      dateArr: [
        { value: 'YEAR', label: '年' },
        { value: 'MONTH', label: '月' },
        { value: 'DAY', label: '天' },
        { value: 'HOUR', label: '时' },
        { value: 'MINUTE', label: '分' },
        { value: 'SECOND', label: '秒' }
      ],
      // 当前有效期
      curStatus: {},
      hasCanvasShow: true
    };
  },
  onLoad(option) {
    let codeInfo = uni.getStorageSync('codeInfo');
    if (codeInfo) {
      this.code = codeInfo;
      return;
    }
    if (option && option.q) {
      // 获取到商品code，用来查询商品信息
      this.getUrlParamsObj(decodeURIComponent(option.q));
    } else {
      this.code = '12345';
    }
  },
  onShow() {
    this.medecineShow = false;
    this.saleShow = false;
    if (this.$store.getters.isUpd === 1 && this.isPageInit) {
      this.pageInit();
      return;
    }
    if (this.$store.getters.isUpd === 1) {
      this.getArticleList();
    }
  },
  methods: {
    // 获取商品详情
    pageInit() {
      this.$axios
        .get({
          url: `/wx/scan`,
          data: {
            code: this.code
          }
        })
        .then((res) => {
          if (res && (res.code === '0' || res.code === 0)) {
            this.medicineObj = res.data;
            this.getCodeImg();
            this.curStatus = _(this.dateArr).find({
              value: this.medicineObj.periodUnit
            });
            this.medicineObj.period = res.data.period + this.curStatus.label;
            this.getArticleList();
            this.isPageInit = false;
            uni.removeStorageSync('codeInfo');
            return;
          }
          this.$uni.showToast(res.message);
        });
    },
    // 二维码图片生成
    getCodeImg() {
      new QRCode('myQrcode', {
        text: this.medicineObj.codeUrl,
        width: 68,
        height: 68,
        padding: 2,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.L // 二维码可辨识度
      });
    },
    // 视频进入全屏或者退出全屏时，触发的事件
    fullScreen(e) {
      if (e.detail.direction === 'horizontal') {
        // 进入全屏
        this.hasCanvasShow = false;
      } else {
        // 退出全屏
        this.hasCanvasShow = true;
        this.getCodeImg();
      }
    },
    // 获取文章列表
    getArticleList() {
      this.$axios
        .get({
          url: `/wx/article/list`,
          data: {
            pageType: '1'
          }
        })
        .then((res) => {
          if (res && (res.code === '0' || res.code === 0)) {
            this.articleList = res.data[1];
            this.articleListTwo = res.data[2];
            this.articleListThree = res.data[3];
            this.articleListBanner = res.data[4];
            return;
          }
          this.$uni.showToast(res.message);
        });
    },
    // 跳转到咨询页面
    goService() {
      this.$uni.navigateTo({
        url: `/pages/tab/service`
      });
    },
    // 跳转到商品说明页面
    goProductInfo() {
      this.$uni.navigateTo({
        url: `/pages/tab/register?code=${this.code}`
      });
    },
    // 跳转到外链
    goMedicine() {
      // this.medecineShow = true;
      // this.$uni.navigateTo({
      //   url: `/pages/tab/buy-medicine`
      // });
    },
    // 跳转到外链
    goSale() {
      // this.saleShow = true;
      // this.$uni.navigateTo({
      //   url: `/pages/tab/sale`
      // });
    },
    // 跳转到区块链溯源页面
    goTraceability(num) {
      let drugsObj = {
        id: this.code,
        num: num
      };
      this.$uni.navigateTo({
        url: `/pages2/traceability/traceability-home?drugsObj=${JSON.stringify(
          drugsObj
        )}`
      });
    },
    // 跳转到文章详情页面
    goArticleDetail(id) {
      this.$uni.navigateTo({
        url: `/pages2/article/article-detail?id=${id}`
      });
    },
    // 获取url中所有参数，返回一个对象
    getUrlParamsObj(href) {
      if (href.indexOf('?') === -1) {
        return {};
      }
      href = decodeURIComponent(href);
      let queryString = href.substring(href.indexOf('?') + 1);
      let parameters = queryString.split('&');
      let all = {};
      let pos, paraName, paraValue;
      for (let i = 0; i < parameters.length; i++) {
        pos = parameters[i].indexOf('=');
        if (pos == -1) {
          continue;
        }
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);
        all[paraName] = paraValue;
      }
      this.code = all.code;
      uni.setStorageSync('codeInfo', this.code);
      return all;
    }
  }
};
</script>

<style lang="scss" scoped>
.body-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(316deg, #b11a26 0%, #c70026 100%);
  position: relative;
  padding-top: 20rpx;
}
.home-head {
  width: 690rpx;
  height: auto;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 0 6rpx 6rpx 6rpx;
  margin-top: 114rpx;
  .home-head1 {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .right-box {
      width: 148rpx;
      height: 170rpx;
      position: absolute;
      left: 50%;
      margin-left: -74rpx;
      top: -85rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .info-title {
      font-weight: bold;
      color: #000000;
      font-size: 30rpx;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 84rpx;
      font-family: SourceHanSansCN-Bold;
    }
    .qrcode-box {
      width: 128rpx;
      height: 128rpx;
      margin-top: 30rpx;
      .canvas-code {
        width: 100%;
        height: 100%;
      }
    }
    .info-num {
      width: 60%;
      font-weight: 400;
      color: #999999;
      text-align: center;
      font-size: 26rpx;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0 auto;
      margin-top: 10rpx;
    }
  }
  .home-head2 {
    width: calc(100% - 12rpx);
    background: rgba(178, 25, 38, 0.1);
    border-radius: 0rpx 0rpx 5rpx 5rpx;
    padding: 20rpx 6rpx;
    margin-top: 10rpx;
    .sale-box {
      width: 100%;
      height: auto;
      border-bottom: 1rpx solid #ffffff;
      padding-bottom: 10rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .sale-img {
        width: 25rpx;
        height: 29rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .sale-name {
        width: calc(100% - 38rpx);
        margin-left: 12rpx;
        font-size: 26rpx;
        font-family: SourceHanSansCN-Regular, SourceHanSansCN;
        font-weight: 400;
        color: #000000;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 8rpx;
      }
    }
    .product-box {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      margin-top: 22rpx;
      .drug-box,
      .manufactor-box {
        width: calc(49% - 20rpx);
        height: auto;
        border-right: 1rpx solid #ffffff;
        line-height: 1;
        padding-right: 20rpx;
        .drug-name {
          font-weight: bold;
          color: #000000;
          font-size: 26rpx;
          font-family: SourceHanSansCN-Bold, SourceHanSansCN;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .specifications {
          font-weight: 400;
          color: #000000;
          font-size: 26rpx;
          margin-top: 28rpx;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text {
            color: #999999;
            margin-right: 4rpx;
          }
        }
        .time {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .time-in {
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            width: calc(100% - 23rpx);
            height: auto;
            .time-title {
              width: 90rpx;
              font-weight: 400;
              color: #999999;
              font-size: 26rpx;
            }
            .time-info {
              width: calc(100% - 90rpx);
              font-weight: 400;
              color: #000000;
              font-size: 26rpx;
              margin-top: 14rpx;
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .home-go {
            width: 13rpx;
            height: 26rpx;
            margin-top: 12rpx;
            margin-left: 10rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .manufactor-box {
        width: calc(50% - 20rpx);
        border-right: none;
        padding-left: 20rpx;
        .manufactor-address {
          font-weight: 400;
          color: #999999;
          font-size: 26rpx;
          margin-top: 28rpx;
        }
        .address-box {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14rpx;
          .address-info {
            font-weight: 400;
            color: #000000;
            font-size: 26rpx;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .home-go {
            width: 13rpx;
            height: 26rpx;
            image {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
.home-head4 {
  width: 644rpx;
  height: 174rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 129, 117, 0.4);
  border-radius: 10rpx;
  padding: 48rpx 28rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 20rpx;
  image {
    width: 114rpx;
    height: 176rpx;
  }
}
.essay-box {
  width: 664rpx;
  height: auto;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(0, 129, 117, 0.4);
  border-radius: 10rpx;
  padding: 0 18rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  .essay-in {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #eeeeee;
    padding: 14rpx 0;
    .essay-info {
      width: 408rpx;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        width: 50rpx;
        height: 26rpx;
        background: #c70026;
        border-radius: 3rpx;
        font-size: 20rpx;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 26rpx;
      }
      .name {
        width: calc(100% - 70rpx);
        height: auto;
        margin-left: 20rpx;
        font-size: 26rpx;
        font-weight: 500;
        color: #000000;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .essay-data {
      width: calc(100% - 478rpx);
      height: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: 70rpx;
      .read-box,
      .fabulous-box {
        width: calc(55% - 10rpx);
        height: auto;
        border-right: 1rpx solid #eeeeee;
        line-height: 1;
        padding-right: 10rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        view {
          width: 54rpx;
          font-size: 24rpx;
          font-weight: 500;
          color: #000000;
        }
        text {
          width: calc(100% - 54rpx);
          font-size: 24rpx;
          color: #c70026;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .fabulous-box {
        width: 44%;
        border-right: none;
        padding-left: 10rpx;
      }
    }
  }
  .essay-in:last-child {
    border-bottom: none;
  }
}
.video-box {
  width: 700rpx;
  height: 354rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  z-index: 999;
  video {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
  }
}
// 轮播图
.swiper {
  height: 250rpx;
  margin-top: 20rpx;
  .swiper-item {
    display: block;
    text-align: center;
  }
}
.article-box {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  .text-box {
    width: 342rpx;
    height: 516rpx;
    border-radius: 10rpx;
    background: #ffdbdc;
    margin-top: 4rpx;
    overflow: hidden;
    margin-right: 16rpx;
    margin-top: 20rpx;
    .head-picture {
      width: 100%;
      height: 342rpx;
      border-radius: 10rpx 10rpx 0 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .article-info {
      width: calc(100% - 40rpx);
      height: 114rpx;
      padding: 30rpx 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      .content,
      .time {
        width: 100%;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 1.2;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .time {
        margin-top: 32rpx;
      }
      .thumbs-box {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;
        view {
          font-weight: 500;
          color: #000000;
          font-size: 28rpx;
          text {
            color: #c70026;
            margin-left: 4rpx;
          }
        }
      }
    }
  }
  .text-box:nth-of-type(2n) {
    margin-right: 0;
  }
}
.long-article {
  width: 710rpx;
  height: 518rpx;
  background: #fefefe;
  border-radius: 10rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  .head-picture {
    width: 100%;
    height: 342rpx;
    border-radius: 10rpx 10rpx 0 0;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .article-info {
    width: calc(100% - 40rpx);
    height: 114rpx;
    padding: 30rpx 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
    .content {
      width: 100%;
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.2;
    }
    .data-box {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-top: 30rpx;
      .thumbs-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        view {
          font-weight: 500;
          color: #000000;
          font-size: 28rpx;
          text {
            color: #c70026;
            margin-left: 4rpx;
          }
        }
      }
      .time {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
.home-bottom {
  padding-bottom: 20rpx;
}
</style>

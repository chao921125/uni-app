<template>
  <view>
    <view class="order-head">
      <view class="address-box">
        <view class="name">
          Jason
          <text>13611360013</text>
        </view>
        <view class="address">北京 北京市 朝阳区 金铜西路 10号 远洋光华国际AB座1218</view>
      </view>
      <view class="edit-box">
        <view>修改地址</view>
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-orderarrow.png"
          mode="aspectFit"
        />
      </view>
    </view>
    <view class="product-box">
      <view class="product-box-in">
        <image :src="productObj.img" mode="aspectFit" />
        <view class="pro-detail">
          <view>
            <view class="name">{{productObj.name}}</view>
            <view class="tip">{{productObj.spec}}</view>
          </view>
          <view class="worth">
            {{productObj.points}}
            <text class="points">积分 +</text>
            <text class="money">
              ￥
              <text>{{productObj.sellingPrice}}</text>
            </text>
          </view>
        </view>
      </view>
      <view class="cut-box">
        <view class="price-title">总积分</view>
        <view class="price-num">4500</view>
      </view>
      <view class="cut-box">
        <view class="price-title">应付积分</view>
        <view class="price-num">{{productObj.points}}</view>
        <!-- <view class="price-num-spciel">
          2,600
          <text>积分</text>
        </view>-->
      </view>
      <view class="cut-box">
        <view class="price-title">应付金额</view>
        <view class="price-num-spciel">
          <text>￥</text>
          {{productObj.sellingPrice}}
        </view>
      </view>
    </view>
    <view class="footer order-footer">
      <view class="shop-info">
        <text class="total-text">总计</text>
        {{productObj.points}}
        <text class="total-point">积分 +</text>
        <text class="money">
          ￥
          <text>{{productObj.sellingPrice}}</text>
        </text>
      </view>
      <view class="exchange-btn" @tap="sureOrder">确认订单</view>
    </view>
    <uni-popup :show="payShow" type="bottom" :custom="true" @change="payChange">
      <view class="pay-box">
        <view class="titile">选择支付方式</view>
        <view
          :class="item.chooseClass ? 'choose-in' : 'choose-pay'"
          v-for="(item,index) in payType"
          :key="index"
          @tap="chooseType(index)"
        >
          <view class="info-box">
            <view class="icon-box">
              <image :src="item.icon" mode="aspectFit" />
            </view>
            <view class="pay-name">{{item.name}}</view>
          </view>
          <view class="select-box">
            <image
              :src="item.chooseClass ? 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-selected.png' : 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/no-select.png'"
              mode="aspectFit"
            />
          </view>
        </view>
        <!-- <view class="info-box">
          <view class="name">XXXX药店会员积分抵扣</view>
          <view class="points">
            2,600
            <text>积分</text>
          </view>
        </view>-->
        <view class="foot">
          <view @tap="goResult()">确认支付</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import uniPopup from '@/components/uni-popup.vue';
export default {
  components: {
    uniPopup
  },
  data() {
    return {
      payShow: false,
      payType: [
        {
          icon: 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/pay-rnb.png',
          name: '数字人民币',
          value: 10,
          chooseClass: 'selected'
        },
        {
          icon: 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/pay-cash.png',
          name: '余额支付',
          value: 20,
          chooseClass: ''
        },
        {
          icon: 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/pay-wx.png',
          name: '微信支付',
          value: 30,
          chooseClass: ''
        }
      ],
      rangeIndex: 0,
      rangeValue: 10,
      productObj: {},
      id: undefined
    };
  },
  onLoad(option) {
    this.productObj = JSON.parse(option.productObj);
  },
  methods: {
    // 点击确认订单，对接下单接口
    sureOrder() {
      this.$axios.post({
        url: `/app-order/create`,
        data: {
          productId: this.productObj.id
        }
      }).then(res => {
        this.id = res.id;
        this.payShow = true;
      });
    },
    // 显示弹窗
    payChange(value) {
      this.payShow = value.show;
    },
    // 跳转到支付完成页面
    goResult() {
      this.$axios.post({
        url: `/app-order/pay`,
        data: {
          id: this.id,
          paymentMethod: this.rangeValue
        }
      }).then(res => {
        this.$uni.navigateTo({
          url: `/pages2/order/pay-result?id=${this.id}`
        });
        this.payShow = false;
      });
    },
    // 切换支付方式
    chooseType(index) {
      this.payType.forEach(item => {
        item.chooseClass = '';
      });
      this.payType[index].chooseClass = 'selected';
      this.rangeIndex = index;
      this.rangeValue = this.payType[this.rangeIndex].value;
    }
  }
};
</script>
<style lang="scss" scoped>
.order-head {
  width: calc(100% - 40rpx);
  height: 140rpx;
  background: #ffdbdc;
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  align-items: center;
  .address-box {
    width: 450rpx;
    height: auto;
    .name {
      font-weight: normal;
      color: #000000;
      font-size: 30rpx;
      text {
        margin-left: 48rpx;
      }
    }
    .address {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: normal;
      color: #000000;
      font-size: 24rpx;
      line-height: 1.2;
      margin-top: 10rpx;
    }
  }
  .edit-box {
    width: auto;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    view {
      font-weight: normal;
      color: #c70026;
      font-size: 26rpx;
    }
    image {
      width: 23rpx;
      height: 44rpx;
      margin-left: 20rpx;
    }
  }
}
.product-box {
  width: calc(100% - 60rpx);
  height: auto;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 14rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 0rpx 0rpx 10rpx 10rpx;
  padding: 30rpx 30rpx 20rpx 30rpx;
  .product-box-in {
    width: 100%;
    height: auto;
    border-bottom: 1rpx solid #eeeeee;
    display: flex;
    justify-content: space-between;
    padding-bottom: 30rpx;
    margin-bottom: 20rpx;
    image {
      width: 202rpx;
      height: 202rpx;
    }
    .pro-detail {
      width: calc(100% - 222rpx);
      height: 202rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
      .name,
      .tip {
        font-weight: 400;
        color: #000000;
        font-size: 28rpx;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .tip {
        font-size: 24rpx;
      }
      .worth {
        font-weight: bold;
        color: #000000;
        font-size: 40rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .points {
          font-size: 30rpx;
          margin-left: 10rpx;
        }
        .money {
          font-weight: 400;
          color: #000000;
          font-size: 26rpx;
          text {
            font-size: 36rpx;
            font-weight: 500;
          }
        }
      }
    }
  }
  .cut-box {
    width: 100%;
    height: 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price-title,
    .price-num {
      font-weight: 400;
      color: #000000;
      font-size: 24rpx;
    }
    .price-num-spciel {
      font-size: 40rpx;
      font-weight: 400;
      color: #c70026;
      text {
        font-size: 26rpx;
      }
    }
  }
}
.order-footer {
  position: absolute;
  background: #c70026;
  box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .shop-info {
    font-weight: bold;
    color: #ffffff;
    font-size: 40rpx;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    .total-text {
      font-weight: 400;
      font-size: 24rpx;
      margin-right: 10rpx;
    }
    .total-point {
      font-weight: 400;
      font-size: 28rpx;
      margin-left: 10rpx;
    }
    .money {
      font-weight: 400;
      color: #ffffff;
      font-size: 26rpx;
      text {
        font-size: 36rpx;
        font-weight: 500;
      }
    }
  }
  .exchange-btn {
    width: 190rpx;
    height: 50rpx;
    background: #000000;
    border-radius: 10rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
.pay-box {
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  .titile {
    width: 100%;
    height: 104rpx;
    border-bottom: 1rpx solid #eeeeee;
    text-align: center;
    line-height: 104rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #c70026;
  }
  .choose-pay,
  .choose-in {
    width: calc(100% - 60rpx);
    height: 102rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    .info-box {
      width: calc(100% - 60rpx);
      height: 102rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon-box {
        width: 74rpx;
        height: 74rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .pay-name {
        width: calc(100% - 114rpx);
        margin-left: 40rpx;
        font-size: 32rpx;
        font-weight: 400;
        color: #000000;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .select-box {
      width: 40rpx;
      height: 40rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .choose-in {
    background: #ffdbdc;
  }
  // .info-box {
  //   width: 100%;
  //   height: auto;
  //   text-align: center;
  //   margin-top: 36rpx;
  //   .name {
  //     font-weight: 400;
  //     color: #000000;
  //     font-size: 30rpx;
  //   }
  //   .points {
  //     font-weight: bold;
  //     color: #000000;
  //     font-size: 40rpx;
  //     margin-top: 20rpx;
  //     padding-bottom: 30rpx;
  //     text {
  //       font-size: 30rpx;
  //       margin-left: 10rpx;
  //     }
  //   }
  // }
  .foot {
    width: 100%;
    height: 100rpx;
    background: #c70026;
    box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
    line-height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    view {
      width: 190rpx;
      height: 50rpx;
      background: #000000;
      border-radius: 10rpx;
      text-align: center;
      font-size: 30rpx;
      line-height: 50rpx;
      font-weight: 400;
      color: #ffffff;
      margin-right: 20rpx;
    }
  }
}
</style>

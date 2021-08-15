<template>
	<view class="score-box">
		<view class="my-score">
			<view class="cc-flex-center score-body score">0</view>
			<view class="cc-flex-center score-body score-title">我的成绩</view>
		</view>
		<view class="card-box">
			<view class="card-body">
				<!-- 需要修改内置样式 -->
				<van-grid column-num="3" :border="false" class="card-grid">
				  <van-grid-item use-slot class="card-item">
					  <view class="cc-flex-center card-text text-num">0</view>
					  <view class="cc-flex-center card-text text-title">及格次数</view>
				  </van-grid-item>
				  <van-grid-item use-slot class="card-item">
					  <view class="cc-flex-center card-text text-num">0</view>
					  <view class="cc-flex-center card-text text-title">累计考试次数</view>
				  </van-grid-item>
				  <van-grid-item use-slot class="card-item">
					  <view class="cc-flex-center card-text text-num">0</view>
					  <view class="cc-flex-center card-text text-title">分数预测</view>
				  </van-grid-item>
				  <van-grid-item use-slot class="card-item">
					  <view class="cc-flex-center card-text text-num">0</view>
					  <view class="cc-flex-center card-text text-title">做题数量</view>
				  </van-grid-item>
				  <van-grid-item use-slot class="card-item">
					  <view class="cc-flex-center card-text text-num">0</view>
					  <view class="cc-flex-center card-text text-title">正确率</view>
				  </van-grid-item>
				  <van-grid-item use-slot class="card-item">
					  <view class="cc-flex-center card-text text-num">0</view>
					  <view class="cc-flex-center card-text text-title">未做数量</view>
				  </van-grid-item>
				</van-grid>
			</view>
		</view>
		<view class="substance">
			<view class="sub-card">
				<view class="cc-flex-space-between sub-is">
					<view class="sub-num">
						<view class="cc-flex-align-center num-week">累计签到<text class="week-num">0</text>天</view>
						<view v-if="false" class="cc-flex-align-center num-total">累计达标<text class="total-num">0</text>天</view>
					</view>
					<view v-if="false" class="sub-tips">
						<view class="cc-flex-align-center tips-box">
							<view class="tips-sub"></view>
							<text class="tips-text">已达标</text>
							<uni-icons type="help" size="20rpx" color="#F2706E"></uni-icons>
						</view>
						<view class="cc-flex-align-center tips-box">
							<view class="tips-unsub"></view>
							<text class="tips-text">未达标</text>
						</view>
					</view>
				</view>
				<view></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		created() {
			console.log("score");
		}
	}
</script>

<style scoped lang="scss">
	.my-score{
	  width: 100%;
	  height: 320rpx;
	  position: relative;
	  z-index: 1;
	  overflow: hidden;
	  color: #FFFFFF;
	  .score-body {
		  position: relative;
		  z-index: 3;
	  }
	  .score {
		  font-size: 40rpx;
		  font-weight: 400;
		  margin-top: 40rpx;
	  }
	}
	.my-score::after{
	  content: '';
	  display: block;
	  width: 140%;
	  height: 320rpx;
	  position: absolute;  /* 不同点1 */
	  z-index: 2;
	  left: -20%;
	  top: 0;
	  border-radius: 0 0 50% 50%;  /* 不同点2 */
	  background: #6DB5FB;
	}
	.card-box {
		padding: 0 30rpx;
		position: relative;
		z-index: 4;
		top: -100rpx;
		left: 0;
		color: #333333;
		.card-body {
			border-radius: 20rpx;
			box-shadow: 0px 10rpx 10rpx #D6D6D6;
			.card-grid {
				border-radius: 20rpx;
				::v-deep.van-grid {
					border-radius: 20rpx;
				}
			}
		}
		.card-text {
			color: #333333;
		}
	}
	.substance {
		height: 300rpx;
		padding: 0 30rpx;
		.sub-card {
			border-radius: 20rpx;
			padding: 20rpx;
			box-shadow: 10rpx 10rpx 10rpx #D6D6D6;
			.sub-is {
				.sub-num {
					.num-week {
						color: #000000;
						font-size: 32rpx;
						.week-num {
							margin-left: 10rpx;
							color: #56A1F4;
						}
					}
					.num-total {
						color: #B7B8CB;
						font-size: 26rpx;
						.total-num {
							margin-left: 10rpx;
							color: #56A1F4;
						}
					}
				}
				.sub-tips {
					.tips-box {
						font-size: 26rpx;
						color: #B7B8CB;
						.tips-sub {
							width: 12rpx;
							height: 12rpx;
							border-radius: 50%;
							background-color: #5CA4F7;
						}
						.tips-unsub {
							width: 10rpx;
							height: 10rpx;
							border-radius: 50%;
							border: 1rpx solid #F2706E;
						}
						.tips-text {
							margin: 0 5rpx;
						}
					}
				}
			}
		}
	}
</style>

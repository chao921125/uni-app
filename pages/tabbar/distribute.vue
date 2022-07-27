<template>
	<view class="user-info bg-color-dis re-padding-top-40 re-padding-bottom-40">
		<view class="re-flex-row-center-start user-avatar re-padding-left-20 re-padding-right-20">
			<cover-image class="re-margin-right-20 avatar-circle" v-if="imgPath.UserAvatar" :src="imgPath.UserAvatar"></cover-image>
			<view class="" v-if="userInfo.artUser">
				<view>{{ userInfo.artUser.uname || "" }} [{{ userInfo.artUser.tel || "" }}]</view>
				<view>推荐人：{{ userInfo.tuiJianRen.uname || "" }}</view>
				<view>{{ userInfo.artUser.deptName || "" }} 成员</view>
			</view>
		</view>
	</view>
	<view class="body-contains re-margin-top-30" v-if="userInfo.artUser">
		<uni-list>
			<uni-list-item title="我的邀请码">
				<template v-slot:footer>
					<text class="re-margin-right-20">{{userInfo.artUser.myInviteCode || ''}}</text>
					<text v-if="userInfo.artUser.myInviteCode" class="text-link" @click="copyCode">复制</text>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
	<view class="re-margin-top-30" v-if="userInfo.artUser">
		<uni-card title="" extra="">
			<view class="re-flex-row-between">
				<view>我的佣金</view>
				<view><button size="mini" type="primary" @click="openModalRecharge">提现</button></view>
			</view>
		</uni-card>
		<uni-card title="" extra="">
			<view class="re-flex-row-between re-margin-top-30">
				<view class="width-half re-flex-row-center text-bold text-error">{{distributeInfo.useableAmout || 0}}</view>
				<view class="width-half re-flex-row-center text-bold text-error">{{distributeInfo.txAmount || 0}}</view>
			</view>
			<view class="re-flex-row-between">
				<view class="width-half re-flex-row-center">可提现佣金（元）</view>
				<view class="width-half re-flex-row-center">已提现佣金（元）</view>
			</view>
		</uni-card>
		<uni-card title="" extra="">
			<view class="re-flex-row-between re-margin-top-30">
				<view class="width-half re-flex-row-center text-bold text-black">{{distributeInfo.tuiGuangYongJin || 0}}</view>
				<view class="width-half re-flex-row-center text-bold text-black">{{distributeInfo.tuiGuangDingDan || 0}}</view>
			</view>
			<view class="re-flex-row-between">
				<view class="width-half re-flex-row-center">推广佣金（元）</view>
				<view class="width-half re-flex-row-center">推广订单（笔）</view>
			</view>
		</uni-card>
		<uni-card title="" extra="">
			<view class="re-flex-row-between re-margin-top-30">
				<view class="width-half re-flex-row-center text-bold text-link" @click="toRecharge">提现明细</view>
				<view class="width-half re-flex-row-center text-bold text-link" @click="toFans">我的粉丝</view>
			</view>
		</uni-card>
	</view>
	
	<uni-popup ref="modalRecharge" type="center" :is-mask-click="false">
		<view class="re-padding-20 bg-color-white modal-body">
			<view class="re-margin-bottom-20">可提现金额 <text class="text-bold text-error">{{distributeInfo.useableAmout || 0}}</text> 元</view>
			<view class="re-margin-bottom-20">输入提现金额（元）</view>
			<view class="re-margin-bottom-20"><uni-easyinput type="number" v-model="form.amount" @blur="checkAmount" placeholder="请输入金额"></uni-easyinput></view>
			<view class="text-error" v-show="isShowErrorTips">{{form.errorTipsAmount}}</view>
			<view class="re-flex-row-between modal-btn-box">
				<button type="warn" size="mini" @click="closeModalRecharge">取消</button>
				<button type="primary" size="mini" @click="addRecharge">确认</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import utils from "@/common/plugins/uniUtils.js";
    import defaultConfig from "@/common/config/index.js";
	import { selectUserInfo, selectDistribute, createRecharge } from "@/common/api/user.js";

    export default {
        data() {
            return {
                imgPath: defaultConfig.imgPath,
				userInfo: {},
				distributeInfo: {},
				form: {
					amount: "",
					isShowErrorTips: false,
					errorTipsAmount: "",
				},
            };
        },
		onShow() {
			this.init();
		},
		methods: {
			init() {
				this.getUserInfo();
				this.getDistribute();
			},
			getUserInfo() {
				selectUserInfo({}).then((res) => {
					this.userInfo = res.data;
				});
			},
			getDistribute() {
				selectDistribute({}).then((res) => {
					this.distributeInfo = res.data;
					this.form.amount = this.distributeInfo.useableAmout;
				});
			},
			addRecharge() {
				let _this = this;
				if (!this.checkAmount()) return false;
				createRecharge({amount: this.form.amount}).then((res) => {
					if (!res.code) {
						utils.toast("申请成功，请等待审核！");
					} else {
						utils.toast("申请失败，请稍后重试！");
					}
					_this.init();
					_this.closeModalRecharge();
				}).catch(() => {
					utils.toast("申请失败，请稍后重试！");
					_this.closeModalRecharge();
				});
			},
			copyCode() {
				uni.setClipboardData({
					data: this.userInfo.artUser.myInviteCode,//要被复制的内容
					success:()=>{//复制成功的回调函数
						uni.showToast({//提示
							title:'复制成功'
						});
					}
				});
			},
			checkAmount() {
				if (!/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/.test(this.form.amount) || Number(this.form.amount) === 0) {
					utils.toast("请输入正确的金额！");
					this.form.amount = "";
					return false;
				} else if (Number(this.form.amount) > this.distributeInfo.useableAmout) {
					utils.toast("超过可提现金额！");
					this.form.amount = this.distributeInfo.useableAmout;
					return false;
				}
				return true;
			},
			openModalRecharge() {
				this.$refs.modalRecharge.open();
			},
			closeModalRecharge() {
				this.$refs.modalRecharge.close();
			},
			toRecharge() {
				utils.gotoUrl(defaultConfig.routePath.recharge, true);
			},
			toFans() {
				utils.gotoUrl(defaultConfig.routePath.fans, true);
			}
		}
    }
</script>

<style lang="scss">

</style>

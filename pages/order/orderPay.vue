<template>
	<view class="body-padding order-pay">
        <view class="re-flex-row-between form-item">
            <view class="">
                <text class="form-title">专家</text>
                <text>{{ expertObject.proficName }}</text>
            </view>
            <view class="">
                <text class="form-title">价格</text>
                <text>{{ expertObject.price }}</text>
                <text>元</text>
            </view>
        </view>
		<view class="form-item">
            <text class="form-title">问题</text>
            <input type="text" placeholder="请输入20个文字以内" placeholder-class="_input-placeholder" maxlength="20" v-model="form.questionTitle" @input="setQuestionTitle" />
        </view>
		<view class="form-item">
            <text class="form-title">问题描述</text>
            <textarea placeholder="请输入详细描述内容" placeholder-class="_input-placeholder" v-model="form.questionDesc" @input="setQuestionDesc"></textarea>
        </view>
	</view>
	<BtnPay @pay="toOrderPayResult" @cancel="toBack"></BtnPay>
</template>

<script>
	import BtnPay from "../components/order/BtnPay.vue";
	import { ref } from "vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { expertDetail } from "@/common/api/expert.js";
	import { orderUser } from "@/common/api/order.js";
	
	export default {
		components: {
			BtnPay,
		},
		data() {
			return {
				expertObject: {},
                form: {
                    questionTitle: "",
                    questionDesc: "",
                }
			};
		},
		setup() {
			const id = ref("");
			onLoad((option) => {
				id.value = option.id;
			});
			return { id };
		},
		onLoad() {
			this.getExpertDetail();
		},
		methods: {
            setQuestionTitle()  {
                // console.log(this.form.questionTitle);
            },
            setQuestionDesc()  {
                // console.log(this.form.questionDesc);
            },
			getExpertDetail() {
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
				expertDetail({ proficNo: this.id }).then((res) => {
					this.expertObject = res.data;
				});
			},
			addOrder() {
				if (!this.form.questionTitle && !this.form.questionDesc) utils.toast("请填写标题或描述");
                orderUser({
					fuserNo: uni.getStorageSync(defaultConfig.tokenKey),
					proNo: this.expertObject.proficNo,
					title: this.form.questionTitle,
					text: this.form.questionDesc,
				}).then((res) => {
					utils.href(defaultConfig.routePath.orderPayResult, true);
				});
			},
			toOrderPayResult() {
				this.addOrder();
			},
			toBack() {
				utils.hrefTabbar(defaultConfig.routePath.tabbarHome, false);
			},
		}
	}
</script>

<style lang="scss">

</style>

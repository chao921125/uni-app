<template>
	<view class="body-padding order-pay form-box">
        <view class="re-flex-row-between form-item">
            <view class="">
                <text class="form-title">专家</text>
                <text>XX</text>
            </view>
            <view class="">
                <text class="form-title">价格</text>
                <text>999</text>
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
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	
	export default {
		components: {
			BtnPay,
		},
		data() {
			return {
                form: {
                    questionTitle: "",
                    questionDesc: "",
                }
			};
		},
		setup() {
			// const props = defineProps({ id: { type: String }, });
			// onLoad 接受 A 页面传递的参数
			onLoad((option) => {
			  console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
			});
			onShow(() => {
			  console.log("B 页面 onShow");
			});
		},
		methods: {
            setQuestionTitle()  {
                console.log(this.form.questionTitle);
            },
            setQuestionDesc()  {
                console.log(this.form.questionDesc);
            },
			toOrderPayResult() {
				utils.href(defaultConfig.routePath.orderPayResult, true);
			},
			toBack() {
				utils.hrefTabbar(defaultConfig.routePath.tabbarHome, false);
			},
		}
	}
</script>

<style lang="scss">

</style>

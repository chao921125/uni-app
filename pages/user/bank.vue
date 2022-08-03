<template>
	<view class="body-contains">
		<uni-forms ref="refForm" :modelValue="formData" :rules="rules" validate-trigger="bind" label-width="90" :border="true">
			<uni-forms-item label="银行卡号" required name="bankCode">
				<uni-easyinput v-model="formData.bankCode" maxlength="22" placeholder="请输入银行卡号" />
			</uni-forms-item>
			<uni-forms-item label="持卡人" required name="bankCardName">
				<uni-easyinput v-model="formData.bankCardName" maxlength="20" placeholder="请输入持卡人姓名" />
			</uni-forms-item>
			<uni-forms-item label="银行全称" required name="bankName">
				<uni-easyinput v-model="formData.bankName" maxlength="50" placeholder="请输入银行名称" />
			</uni-forms-item>
			<uni-forms-item label="手机号" required name="bankCardTel">
				<uni-easyinput v-model="formData.bankCardTel" maxlength="11" placeholder="请输入持卡人手机号" />
			</uni-forms-item>
		</uni-forms>
		<button v-if="formData.id" type="primary" class="re-margin-top-50" @click="editBank()">修改</button>
		<button v-if="formData.id" class="btn-success re-margin-top-50" @click="removeBank()">删除</button>
		<button v-else type="primary" class="re-margin-top-50" @click="addBank()">新增</button>
	</view>
</template>
<script>
	import { ref } from "vue";
	import utils from "@/common/plugins/uni-methods.js";
	import defaultConfig from "@/common/config/index.js";
	import validate from "@/common/utils/validate.js";
	
	export default {
		data() {
			return {
				defaultClick: false,
				formData: {
					// id: "",
					bankName: "",
					bankCode: "",
					bankCardTel: "",
					bankCardName: "",
				},
				rules: {
					bankName: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^[\u4e00-\u9fa5\w]+$/ig.test(value))) {
									callback("允许汉字、字母、数字、下划线");
									return false;
								} else if (value.length < 1 || value.length > 50) {
									callback("长度在1-50之间");
									return false;
								} else{
									return true;
								}
							}
						}]
					},
					bankCode: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (validate.isNumber(value)) {
									return true;
								} else {
									callback("卡号错误");
									return false;
								}
							}
						}]
					},
					bankCardTel: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/ig.test(value))) {
									callback("手机号格式错误");
									return false;
								} else {
									return true;
								}
							}
						}]
					},
					bankCardName: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^[\u4e00-\u9fa5\w]+$/ig.test(value))) {
									callback("允许汉字、字母、数字、下划线");
									return false;
								} else if (value.length < 1 || value.length > 50) {
									callback("长度在1-50之间");
									return false;
								} else{
									return true;
								}
							}
						}]
					},
				},
			}
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				selectUserInfo({}).then((res) => {
					if (res.data.artBankcard.id) {
						this.formData.id = res.data.artBankcard.id;
						this.formData.bankName = res.data.artBankcard.bankName;
						this.formData.bankCode = res.data.artBankcard.bankCode;
						this.formData.bankCardTel = res.data.artBankcard.bankCardTel;
						this.formData.bankCardName = res.data.artBankcard.bankCardName;
					}
				});
			},
			addBank() {
				this.$refs.refForm.validate().then(() => {
					createBank(this.formData).then((res) => {
						if (!res.code) {
							this.toUser();
						}
					});
				}).catch((err) => {
					console.log(err);
				});
			},
			editBank() {
				this.$refs.refForm.validate().then(() => {
					updateBank(this.formData).then((res) => {
						if (!res.code) {
							this.toUser();
						}
					});
				}).catch((err) => {
					console.log(err);
				});
			},
			removeBank() {
				deleteBank({ id: Number(this.formData.id) }).then((res) => {
					if (!res.code) {
						this.toUser();
					}
				});
			},
			toUser() {
				utils.gotoTab(defaultConfig.routePath.tabbarUser, false);
			}
		},
	}
</script>

<style lang="scss" scoped="">
	.send-code {
		width: 220rpx;
	}
	.text-goto {
		font-size: 36rpx;
	}
</style>

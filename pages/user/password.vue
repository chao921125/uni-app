<template>
	<view class="body-contains">
		<view class="re-margin-top-30">向手机号 {{ formData.tel }} 发送验证码</view>
		<uni-forms ref="refForm" :modelValue="formData" :rules="rules" validate-trigger="bind" label-width="90" :border="true">
			<uni-forms-item label="验证码" required name="validationCode">
				<view class="re-flex-row-between">
					<uni-easyinput v-model="formData.validationCode" maxlength="6" placeholder="请输入验证码" />
					<view class="text-success send-code"><SendPhone :defaultClick="defaultClick" @click="getCode()"></SendPhone></view>
				</view>
			</uni-forms-item>
			<uni-forms-item label="新密码" required name="upassword">
				<uni-easyinput type="password" v-model="formData.upassword" maxlength="50" placeholder="请输入新密码" />
			</uni-forms-item>
			<uni-forms-item label="确认新密码" required name="rePassword">
				<uni-easyinput type="password" v-model="formData.rePassword" maxlength="50" placeholder="请再次输入新密码" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" class="btn-register" @click="submit()">确认</button>
	</view>
</template>
<script>
	import { ref } from "vue";
	import SendPhone from "@/components/re-countdown/SendPhone.vue";
	import utils from "@/common/plugins/uniUtils.js";
	import defaultConfig from "@/common/config/index.js";
	import { updatePwd, getPhoneCode, selectUserInfo } from "@/common/api/user.js";
	import md5 from "@/common/utils/encrypt-md5.js";
	
	export default {
		components: {
			SendPhone
		},
		data() {
			return {
				defaultClick: false,
				formData: {
					type: "2",
					tel: "",
					validationCode: "",
					upassword: "",
					rePassword: "",
				},
				rules: {
					validationCode: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^[a-zA-Z\d]+$/ig.test(value))) {
									callback("允许字母、数字");
									return false;
								} else {
									return true;
								}
							
							}
						}]
					},
					upassword: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^[a-zA-Z\w]+$/ig.test(value))) {
									callback("允许字母、数字、下划线");
									return false;
								} else if (value.length < 1 || value.length > 50) {
									callback("长度在1-50之间");
									return false;
								} else {
									return true;
								}
							}
						}]
					},
					rePassword: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (value !== this.formData.upassword) {
									callback("密码不一致");
									return false;
								} else {
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
				this.defaultClick = true;
					this.formData.tel = res.data.artUser.tel;
				});
			},
			submit() {
				this.$refs.refForm.validate().then(() => {
					this.formData.upassword = md5.hex_md5(this.formData.upassword);
					updatePwd(this.formData).then((res) => {
						if (!res.code) {
							utils.gotoUrlCloseAll(defaultConfig.routePath.login, false);
						}
					});
				}).catch((err) => {
					console.log(err);
				});
			},
			getCode(value) {
				getPhoneCode({tel: this.formData.tel, codeType: "2"}).then((res) => {
				this.defaultClick = false;
					utils.toast(res.msg);
				});
			},
		},
	}
</script>

<style lang="scss" scoped="">
	.btn-register {
		margin-top: 50rpx;
	}
	.send-code {
		width: 220rpx;
	}
	.text-goto {
		font-size: 36rpx;
		margin-top: 20rpx;
	}
</style>

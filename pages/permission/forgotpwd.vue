<template>
	<view class="body-contains">
		<uni-forms ref="refForm" :modelValue="formData" :rules="rules" validate-trigger="bind" label-width="90" :border="true">
			<uni-forms-item label="手机号" required name="tel">
				<uni-easyinput v-model="formData.tel" maxlength="11" placeholder="请输入手机号" @blur="setForm()" />
			</uni-forms-item>
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
		<button class="btn-error re-margin-top-50" @click="submit()">确认</button>
		<view class="re-flex-row-center text-goto re-margin-top-20">已有用户名？点击<text class="text-link" @click="toLogin()">立即登录</text></view>
	</view>
</template>
<script>
	import { ref } from "vue";
	import SendPhone from "@/components/re-countdown/SendPhone.vue";
	import utils from "@/common/plugins/uniUtils.js";
	import defaultConfig from "@/common/config/index.js";
	import { updatePwd, getPhoneCode } from "@/common/api/user.js";
	import md5 from "@/common/plugins/encrypt-md5.js";
	
	export default {
		components: {
			SendPhone
		},
		data() {
			return {
				defaultClick: false,
				formData: {
					type: "1",
					tel: "",
					validationCode: "",
					upassword: "",
					rePassword: "",
				},
				rules: {
					tel: {
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
		onReady() {
			// 需要在onReady中设置规则
			// this.$refs.refForm.setRules(this.rules);
		},
		methods: {
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
			setForm() {
				this.$refs.refForm.validateField(["tel"]).then(() => {
					this.defaultClick = true;
				}).catch((err) => {
					console.log(err);
				});
			},
			getCode(value) {
				this.$refs.refForm.validateField(["tel"]).then(() => {
					getPhoneCode({tel: this.formData.tel, codeType: "2"}).then((res) => {
						this.defaultClick = false;
						utils.toast(res.msg);
					});
				}).catch((err) => {
					this.defaultClick = false;
					console.log(err);
				});
			},
			toLogin() {
				utils.gotoUrlCloseAll(defaultConfig.routePath.login, false);
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

<template>
	<view class="re-flex-row-center re-margin-top-30">
		<cover-image class="avatar-circle-big" v-if="imgPath.UserAvatar" :src="imgPath.UserAvatar"></cover-image>
	</view>
	<view class="body-contains">
		<uni-forms ref="refForm" :modelValue="formData" :rules="rules" validate-trigger="bind" label-width="90" :border="true">
			<uni-forms-item label="用户名" name="uname">
				<uni-easyinput v-model="formData.uname" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" name="upassword">
				<uni-easyinput type="password" v-model="formData.upassword" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item label="艺术馆号" name="deptIdStr">
				<uni-easyinput v-model="formData.deptIdStr" placeholder="请输入艺术馆号" />
			</uni-forms-item>
		</uni-forms>
		<button class="btn-error re-margin-top-50" @click="submit()">登陆</button>
		<view class="re-flex-row-center text-goto re-margin-top-20">已有用户名，点击<text class="text-link" @click="toForgot()">找回密码</text></view>
		<view class="re-flex-row-center text-goto re-margin-top-20">没有账号？点击<text class="text-link" @click="toRegister()">立即注册</text></view>
	</view>
</template>
<script>
	import { ref, reactive } from "vue";
	import utils from "@/common/plugins/uniUtils.js";
	import { login } from "@/common/api/user.js";
	import defaultConfig from "@/common/config/index.js";
	import md5 from "@/common/utils/encrypt-md5.js";

	export default {
		data() {
			return {
				imgPath: defaultConfig.imgPath,
				formData: {
					uname: "",
					upassword: "",
					deptIdStr: "",
				},
				rules: {
					uname: {
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
					deptIdStr: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^[\u4e00-\u9fa5\w]+$/ig.test(value))) {
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
				},
			}
		},
		methods: {
			submit() {
				this.$refs.refForm.validate().then(() => {
					this.formData.upassword = md5.hex_md5(this.formData.upassword);
					login(this.formData).then((res) => {
						if (!res.code) {
							utils.setUserInfo(res.data, res.data.token);
							utils.gotoTab(defaultConfig.routePath.tabbarHome, true);
						} 
					});
				}).catch(err =>{
					console.log(err);
				});
			},
			toHome() {
				utils.gotoTab(defaultConfig.routePath.tabbarUser, true);
			},
			toRegister() {
				utils.gotoUrl(defaultConfig.routePath.register, false);
			},
			toForgot() {
				utils.gotoUrl(defaultConfig.routePath.forgotpwd, false);
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.text-goto {
		font-size: 36rpx;
	}
</style>

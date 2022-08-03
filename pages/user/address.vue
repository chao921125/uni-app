<template>
	<view class="body-contains">
		<uni-forms ref="refForm" :modelValue="formData" :rules="rules" validate-trigger="bind" label-width="90" :border="true">
			<uni-forms-item label="联系人" required name="receiveName">
				<uni-easyinput v-model="formData.receiveName" maxlength="50" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="联系方式" required name="receiveTel">
				<uni-easyinput v-model="formData.receiveTel" maxlength="11" placeholder="请输入联系方式" />
			</uni-forms-item>
			<uni-forms-item label="省市区" required name="recieveAreaCode">
				<AreaOne :areaDefaultSelect="areaDefaultSelect" @change="getArea"></AreaOne>
			</uni-forms-item>
			<uni-forms-item label="详细地址" required name="receiveDetail">
				<uni-easyinput v-model="formData.receiveDetail" maxlength="50" placeholder="请输入详细地址" />
			</uni-forms-item>
		</uni-forms>
		<button v-if="formData.id" type="primary" class="re-margin-top-50" @click="editAddress()">修改</button>
		<button v-if="formData.id" class="btn-success re-margin-top-50" @click="removeAddress()">删除</button>
		<button v-else type="primary" class="re-margin-top-50" @click="addAddress()">新增</button>
	</view>
</template>
<script>
	import { ref } from "vue";
	import AreaOne from "@/components/re-area/AreaOne.vue";
	import utils from "@/common/plugins/uni-methods.js";
	import defaultConfig from "@/common/config/index.js";
	import validate from "@/common/utils/validate.js";
	
	export default {
		components: {
			AreaOne,
		},
		data() {
			return {
				areaDefaultSelect: 0,
				formData: {
					// id: "",
					receiveName: "",
					receiveTel: "",
					receiveProviceCode: "",
					receiveProviceName: "",
					receiveCityCode: "",
					receiveCityName: "",
					recieveAreaCode: "",
					recieveAreaName: "",
					receiveDetail: "",
				},
				rules: {
					receiveName: {
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
					receiveTel: {
						rules: [
							{ validateFunction: (rule, value, data, callback) => {
								if (!value) {
									return true;
								} else if (!(/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/ig.test(value))) {
									callback("手机号格式错误");
									return false;
								} else {
									return true;
								}
							}
						}]
					},
					receiveProviceCode: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
						]
					},
					receiveProviceName: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
						]
					},
					receiveCityCode: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
						]
					},
					receiveProviceName: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
						]
					},
					recieveAreaCode: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
						]
					},
					receiveProviceName: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
						]
					},
					receiveDetail: {
						rules: [
							{ required: true, errorMessage: '必填，不能为空', },
							{ validateFunction: (rule, value, data, callback) => {
								if (!(/^[\u4e00-\u9fa5\w\s-]+$/ig.test(value))) {
									callback("允许汉字、字母、数字、下划线、空格");
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
				let _this = this;
				selectUserInfo({}).then((res) => {
					if (res.data.userAddress.id) {
						this.formData.id = res.data.userAddress.id;
						this.formData.receiveName = res.data.userAddress.receiveName;
						this.formData.receiveTel = res.data.userAddress.receiveTel;
						this.formData.receiveProviceCode = res.data.userAddress.receiveProviceCode;
						this.formData.receiveProviceName = res.data.userAddress.receiveProviceName;
						this.formData.receiveCityCode = res.data.userAddress.receiveCityCode;
						this.formData.receiveCityName = res.data.userAddress.receiveCityName;
						this.formData.recieveAreaCode = res.data.userAddress.recieveAreaCode;
						this.formData.recieveAreaName = res.data.userAddress.recieveAreaName;
						this.formData.receiveDetail = res.data.userAddress.receiveDetail;
						
						this.areaDefaultSelect = Number(res.data.userAddress.recieveAreaCode) || Number(res.data.userAddress.receiveCityCode) || Number(res.data.userAddress.receiveProviceCode) || 0;
					}
				});
			},
			getArea(value) {
				if (value.area && value.city && value.province) {
					this.formData.receiveProviceCode = value.province;
					this.formData.receiveProviceName = value.provinceName;
					this.formData.receiveCityCode = value.city;
					this.formData.receiveCityName = value.cityName;
					this.formData.recieveAreaCode = value.area;
					this.formData.recieveAreaName = value.areaName;
				}
			},
			addAddress() {
				this.$refs.refForm.validate().then(() => {
					createAddress(this.formData).then((res) => {
						if (!res.code) {
							this.toUser();
						}
					});
				}).catch((err) => {
					console.log(err);
				});
			},
			editAddress() {
				this.$refs.refForm.validate().then(() => {
					updateAddress(this.formData).then((res) => {
						if (!res.code) {
							this.toUser();
						}
					});
				}).catch((err) => {
					console.log(err);
				});
			},
			removeAddress() {
				deleteAddress({ id: Number(this.formData.id) }).then((res) => {
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

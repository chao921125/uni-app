<template>
	<view class="body-padding user-edit">
		<view class="form-item">
			<text class="form-title">用户名</text>
			<input type="text" placeholder="请输入20个字以内" placeholder-class="_input-placeholder" maxlength="20" v-model="form.userName" />
		</view>
		<view class="form-item">
			<text class="form-title">手机号</text>
			<input type="text" placeholder="请输入11位手机号" placeholder-class="_input-placeholder" maxlength="11" v-model="form.userTel" />
		</view>
		<view class="form-item">
			<text class="form-title">性别</text>
			<radio-group class="re-flex" @change="radioChange">
				<label class="re-flex re-margin-right-20" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="item.value === form.userSex" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<view class="form-item">
			<text class="form-title">简介</text>
			<textarea placeholder="请输入简介最长50个字" placeholder-class="_input-placeholder" maxlength="50" v-model="form.remark"></textarea>
		</view>
		<view class="form-item">
			<button type="primary" @click="editUser">保存</button>
		</view>
	</view>
</template>

<script>
	import utils from "@/common/plugins/utils.js";
    import defaultConfig from "@/common/config/index.js";
	import { userInfo, userEdit } from "@/common/api/user.js";
	
	export default {
		data() {
			return {
				userInfo: {},
				items: [
					{
						name: "男",
						value: "0",
					}, {
						name: "女",
						value: "1",
					}, {
						name: "保密",
						value: "",
					},
				],
				form: {
					userName: "",
					userTel: "",
					userSex: "",
					remark: ""
				},
			};
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
				userInfo({ userNo: uni.getStorageSync(defaultConfig.tokenKey) }).then((res) => {
					this.userInfo =  res.data;
					this.form.userName = res.data.userName;
					this.form.userTel = res.data.userTel;
					this.form.userSex = res.data.userSex;
					this.form.remark = res.data.remark;
				});
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.detail.value) {
						this.form.userSex = this.items[i].value;
						break;
					}
				}
			},
			editUser() {
				if (!this.form.userName) {
					utils.toast("用户名不能为空");
					return false;
				}
				if (!/^1[0-9]{10,10}$/.test(this.form.userTel)) {
					utils.toast("手机号不正确");
					return false;
				}
				userEdit({
					userNo: uni.getStorageSync(defaultConfig.tokenKey),
					userName: this.form.userName,
					userTel: this.form.userTel,
					userSex: this.form.userSex,
					remark: this.form.remark,
				}).then((res) => {
					utils.toast("修改成功");
					// utils.hrefTabbar(defaultConfig.routePath.tabbarUser, false);
				})
			}
		}
	}
</script>

<style lang="scss">
.user-edit {
	padding-top: 20rpx;
}
</style>

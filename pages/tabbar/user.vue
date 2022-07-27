<template>
	<view class="user-info bg-color-default re-padding-top-40 re-padding-bottom-40" v-if="userInfo.artUser">
		<view class="re-flex-row-center user-avatar">
				<cover-image class="avatar-circle" v-if="imgPath.UserAvatar" :src="imgPath.UserAvatar"></cover-image>
			<!-- <view class="re-flex-row">
				<cover-image class="avatar-circle" v-if="imgPath.UserAvatar" :src="imgPath.UserAvatar"></cover-image>
				<text>edit</text>
			</view> -->
		</view>
		<view class="re-flex-row-center re-margin-top-30">{{  userInfo.artUser.uname || "" }}</view>
	</view>
	<view class="body-contains re-margin-top-30" v-if="userInfo.artUser">
		<uni-list>
			<uni-list-item title="登录画室" :rightText="userInfo.artUser.deptName || ''" />
			<uni-list-item showArrow clickable title="银行卡信息" @click="toUserBankEdit()" :rightText="userInfo.artBankcard.id ? '已填写' : '未填写'" />
			<uni-list-item showArrow clickable title="地址管理" @click="toUserAddressEdit()" :rightText="userInfo.userAddress.id ? '已填写' : '未填写'" />
			<!-- <uni-list-item showArrow clickable title="修改信息" @click="toUserEdit()" rightText="19900001111" /> -->
			<uni-list-item showArrow clickable title="修改密码" @click="toUserPwdEdit()" rightText="******" />
		</uni-list>
		<button class="btn-success re-margin-top-50" @click="logoutUser()">退出登录</button>
	</view>
</template>

<script>
	import utils from "@/common/plugins/uniUtils.js";
    import defaultConfig from "@/common/config/index.js";
	import { selectUserInfo, logout } from "@/common/api/user.js";

    export default {
        data() {
            return {
                imgPath: defaultConfig.imgPath,
				userInfo: {},
            };
        },
		onShow() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				selectUserInfo({}).then((res) => {
					this.userInfo = res.data;
				});
			},
			logoutUser() {
				logout({}).then((res) => {
					utils.removeUserInfo();
					utils.gotoUrlCloseAll(defaultConfig.routePath.login, false);
				});
			},
			toUserBankEdit() {
				utils.gotoUrl(defaultConfig.routePath.userBank, true);
			},
			toUserAddressEdit() {
				utils.gotoUrl(defaultConfig.routePath.userAddress, true);
			},
			toUserPwdEdit() {
				utils.gotoUrl(defaultConfig.routePath.userPassword, true);
			},
			toUserEdit() {
				utils.gotoUrl(defaultConfig.routePath.userEdit, true);
			}
		}
    }
</script>

<style lang="scss">

</style>

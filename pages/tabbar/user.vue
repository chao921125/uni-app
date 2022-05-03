<template>
    <view class="re-flex-row-center-start body-padding">
        <view class="user-avatar re-flex">
			<cover-image class="avatar-img" v-if="imgPath" :src="userInfo.imgUrl || imgPath.UserAvatar"></cover-image>
			<uni-icons class="icon-edit" type="compose" size="20" @click="toUserEdit"></uni-icons>
		</view>
        <view class="user-name">{{ userInfo.userName }}</view>
    </view>
	<uni-section title="设置" type="line">
		<uni-list>
			<uni-list-item title="签名" :rightText="userInfo.remark" />
			<uni-list-item title="手机号" :rightText="userInfo.userTel" />
			<uni-list-item title="性别" :rightText="userInfo.userSex === '0' ? '男' : userInfo.userSex === '1' ? '女' : '保密'" />
		</uni-list>
	</uni-section>
</template>

<script>
	import utils from "@/common/plugins/utils.js";
    import defaultConfig from "@/common/config/index.js";
	import { userInfo } from "@/common/api/user.js";
    
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
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
				userInfo({ userNo: uni.getStorageSync(defaultConfig.tokenKey) }).then((res) => {
					this.userInfo =  res.data;
				});
			},
			toUserEdit() {
				utils.href(defaultConfig.routePath.userEdit, false);
			}
		}
    }
</script>

<style lang="scss">
	.user-avatar {
		align-items: flex-end;
		padding-top: 50rpx;
		.icon-edit {
			margin-left: 20rpx;
		}
	}
	.user-name {
		padding-top: 50rpx;
		margin-left: 20rpx;
	}
</style>

<template>
    <view class="re-flex-row-center-start body-padding">
        <view class="user-avatar"><cover-image class="avatar-img" v-if="imgPath" :src="userInfo.avatarUrl || imgPath.UserAvatar"></cover-image></view>
        <view class="user-name">{{ userInfo.nickName }}</view>
    </view>
	<uni-section title="设置" type="line">
		<uni-list>
			<uni-list-item title="性别" :rightText="userInfo.gender === 0 ? '男' : '女'" />
		</uni-list>
	</uni-section>
</template>

<script>
    import defaultConfig from "@/common/config/index.js";
    
    export default {
        data() {
            return {
                imgPath: defaultConfig.imgPath,
				userInfo: {},
            };
        },
		onLoad() {
			this.userInfo = uni.getStorageSync(defaultConfig.userKey)
		}
    }
</script>

<style lang="scss">
	.user-avatar {
		padding-top: 50rpx;
	}
	.user-name {
		padding-top: 50rpx;
		margin-left: 20rpx;
	}
</style>

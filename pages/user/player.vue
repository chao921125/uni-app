<template>
	<view v-if="playerInfo.name" class="re-flex-row-center re-margin-top-30">{{playerInfo.name}} 简介</view>
	<uni-card v-if="playerInfo.detail">
		<cover-image v-if="playerInfo.avatar" class="re-margin-top-30" :src="playerInfo.avatar"></cover-image>
		<view class="re-margin-top-30"><text>{{playerInfo.detail}}</text></view>
		<view v-if="playerInfo.images">
			<cover-image class="re-margin-top-30" v-for="(item, index) in playerInfo.images" :key="index" :src="item"></cover-image>
		</view>
	</uni-card>
</template>

<script>
	export default {
		data() {
			return {
				playerInfo: {}
			};
		},
		onShow() {
			this.playerInfo = uni.getStorageSync("player_info");
		}
	}
</script>

<style lang="scss" scoped>
	.player-info {
		width: 100%;
	}
</style>

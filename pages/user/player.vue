<template>
	<view v-if="playerInfo.name" class="re-flex-row-center re-margin-top-30">{{playerInfo.name}} 简介</view>
	<uni-card v-if="playerInfo.desc">
		<cover-image v-if="playerInfo.imgOne" class="re-margin-top-30" :src="playerInfo.imgOne"></cover-image>
		<view class="re-margin-top-30"><text>{{playerInfo.desc}}</text></view>
		<view v-if="playerInfo.imgTwo">
			<template v-if="typeof playerInfo.imgTwo === 'string'">
				<cover-image :src="playerInfo.imgTwo"></cover-image>
			</template>
			<template v-else>
				<cover-image class="re-margin-top-30" v-for="(item, index) in playerInfo.imgTwo" :key="index" :src="item"></cover-image>
			</template>
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

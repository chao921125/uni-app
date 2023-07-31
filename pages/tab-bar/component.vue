<template>
	<view class="container">
		<button @click="toContact">跳转获取联系人</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: this.$t(""),
			};
		},

		methods: {
            toContact() {
                uni.navigateTo({
                    url: "/pages/contact/contact",
                })
            }
        },
	};
</script>

<style lang="scss"></style>

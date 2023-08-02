<template>
	<view class="container">
        <view class="title">{{ $t("index.demo") }}</view>
		
		<!-- <view class="description">{{ t("index.demo-description") }}</view>
		<view class="detail-link">
			{{ t("index.detail") }}:
			<text class="link">https://uniapp.dcloud.net.cn/collocation/i18n</text>
		</view>
		<view class="locale-setting">{{ t("index.language-info") }}</view>
		<view class="list-item">
			<text class="k">{{ t("index.system-language") }}:</text>
			<text class="v">{{ systemLocale }}</text>
		</view>
		<view class="list-item">
			<text class="k">{{ t("index.application-language") }}:</text>
			<text class="v">{{ applicationLocale }}</text>
		</view>
		<view class="locale-setting">{{ t("index.language") }}</view>
		<view class="locale-list">
			<view v-for="(item, index) in locales" :key="index" class="locale-item" @click="onLocaleChange(item)">
				<text class="text">{{ item.text }}</text>
				<text v-if="item.code == applicationLocale" class="icon-check"></text>
			</view>
		</view> -->
	</view>
</template>

<script setup>
    import { computed, ref } from "vue";
    
    const locales = computed(() => {
        return [
        	{
        		text: t("locale.auto"),
        		code: "auto",
        	},
        	{
        		text: t("locale.en"),
        		code: "en",
        	},
        	{
        		text: t("locale.zh-hans"),
        		code: "zh-Hans",
        	},
        	{
        		text: t("locale.zh-hant"),
        		code: "zh-Hant",
        	},
        	{
        		text: t("locale.ja"),
        		code: "ja",
        	},
        ];
    });
    
    const systemLocale = ref("");
    const applicationLocale = ref("");
    const isAndroid = ref(false);
    
    onload(() => {
        const systemInfo = uni.getSystemInfoSync();
        systemLocale.value = systemInfo.language;
        applicationLocale.value = uni.getLocale();
        isAndroid.value = systemInfo.platform.toLowerCase() === "android";
        uni.onLocaleChange((e) => {
            applicationLocale.value = e.locale;
        });
    });
    
    const onLocaleChange = (e) => {
        if (isAndroid) {
            uni.showModal({
                content: t("index.language-change-confirm"),
                success: (res) => {
                    if (res.confirm) {
                        uni.setLocale(e.code);
                    }
                },
            });
        } else {
            uni.setLocale(e.code);
            locale.value = e.code;
        }
    }
</script>

<style lang="scss"></style>

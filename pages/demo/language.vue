<template>
    <view class="container">
        <view class="title">{{ $t('index.demo') }}</view>
        <view class="description">{{ $t('index.demo-description') }}</view>
        <view class="detail-link">
            {{ $t('index.detail') }}:
            <text class="link">https://uniapp.dcloud.net.cn/collocation/i18n</text>
        </view>
        <view class="locale-setting">{{ $t('index.language-info') }}</view>
        <view class="list-item">
            <text class="k">{{ $t('index.system-language') }}:</text>
            <text class="v">{{ systemLocale }}</text>
        </view>
        <view class="list-item">
            <text class="k">{{ $t('index.application-language') }}:</text>
            <text class="v">{{ applicationLocale }}</text>
        </view>
        <view class="locale-setting">{{ $t('index.language') }}</view>
        <view class="locale-list">
            <view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
                <text class="text">{{ item.text }}</text>
                <text class="icon-check" v-if="item.code == applicationLocale"></text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { getCurrentInstance, computed } from 'vue';

let systemInfo = uni.getSystemInfoSync();
let systemLocale = systemInfo.language;
let applicationLocale = uni.getLocale();
let isAndroid = systemInfo.platform.toLowerCase() === 'android';
uni.onLocaleChange((e) => {
    applicationLocale = e.locale;
});
const { proxy } = getCurrentInstance();

// locale改变方法
const onLocaleChange = (e) => {
    if (isAndroid) {
        uni.showModal({
            content: proxy.$t('index.language-change-confirm'),
            success: (res) => {
                if (res.confirm) {
                    uni.setLocale(e.code);
                }
            }
        });
    } else {
        uni.setLocale(e.code);
        proxy.$i18n.locale = e.code;
    }
};
let locales = computed(() => {
    return [
        {
            text: proxy.$t('locale.auto'),
            code: 'auto'
        },
        {
            text: proxy.$t('locale.en'),
            code: 'en'
        },
        {
            text: proxy.$t('locale.zh-hans'),
            code: 'zh-Hans'
        },
        {
            text: proxy.$t('locale.zh-hant'),
            code: 'zh-Hant'
        },
        {
            text: proxy.$t('locale.ja'),
            code: 'ja'
        }
    ];
});
</script>

<style lang="scss">
.title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
}

.description {
    font-size: 14px;
    opacity: 0.6;
    margin-bottom: 15px;
}

.detail-link {
    font-size: 14px;
    word-break: break-all;
}

.link {
    color: #007aff;
    margin-left: 10px;
}

.locale-setting {
    font-size: 16px;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #f0f0f0;
}

.list-item {
    font-size: 14px;
    padding: 10px 0;
}

.list-item .v {
    margin-left: 5px;
}

.locale-item {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
}

.locale-item .text {
    flex: 1;
}

.icon-check {
    margin-right: 5px;
    border: 2px solid #007aff;
    border-left: 0;
    border-top: 0;
    height: 12px;
    width: 6px;
    transform-origin: center;
    /* #ifndef APP-NVUE */
    transition: all 0.3s;
    /* #endif */
    transform: rotate(45deg);
}
</style>

<template>
    <view class="layout-content">
        <view v-show="!isLoading">
            <text v-show="isInput" class="uni-title">请输入抽奖的内容（请用逗号或者空格分割）</text>
            <textarea v-show="isInput" class="lottery-text cc-mt-10" placeholder="请输入抽奖的内容" auto-focus="true" :maxlength="-1" v-model="data.lottery.text"></textarea>
            <view class="uni-title">您输入的内容是</view>
            <view>{{ data.lottery.array }}</view>
            <view class="cc-mt-20">
                <button
                    v-show="isInput"
                    @click="
                        isInput = false;
                        textToArray();
                    "
                >
                    完成输入
                </button>
            </view>
            <view class="cc-mt-20"><button v-show="!isInput" @click="isInput = true">重新输入</button></view>
        </view>
        <view v-show="!isInput">
            <view v-show="isLoading" class="uni-title">抽奖中......</view>
            <view v-show="isLoading" class="uni-title cc-mt-10">{{ data.result.progress }}</view>
            <view v-show="isShowResult" class="uni-title lottery-result">抽奖结果 {{data.result.startDateTime}}</view>
            <view v-show="isShowResult" class="uni-title cc-mt-10 lottery-result">{{ data.result.text }}</view>
            <view class="cc-mt-20">
                <button v-show="!isLoading" @click="startDraw">手动抽奖</button>
                <button v-show="isLoading && !data.result.auto" @click="stopDraw">点击停止抽奖</button>
                <button v-show="!isLoading" @click="startDrawAuto">自动抽奖</button>
                <button v-show="isLoading && data.result.auto" disabled="disabled">{{ data.result.auto }}s</button>
            </view>
        </view>
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
// 地球,火星,太阳,木星,金星,水星,火星,土星
const data = reactive({
    lottery: {
        text: '',
        array: []
    },
    result: {
        startDateTime: "",
        index: 0,
        auto: 0,
        progress: '',
        text: ''
    }
});

const isLoading = ref(false);
const isInput = ref(true);
const isShowResult = ref(false);
// 定时器请勿使用，其他方式声明，直接在执行体外部即可，否则会失效
let intervalObj = null;
let intervalObjAuto = null;

const textToArray = () => {
    isShowResult.value = false;
    if (!data.lottery.text) data.lottery.array = [];
    const text = data.lottery.text.trim().replace(/[,，\s]+/gi, ',');
    data.lottery.array = text.split(',');
};

const startDraw = () => {
    data.result.startDateTime = new Date().toLocaleString();
    isShowResult.value = false;
    if (!data.lottery.array.length) {
        isLoading.value = false;
        return false;
    }
    isLoading.value = true;
    drawLottery();
};
// 自动停止
const startDrawAuto = () => {
    data.result.startDateTime = new Date().toLocaleString();
    isShowResult.value = false;
    if (!data.lottery.array.length) {
        isLoading.value = false;
        return false;
    }
    isLoading.value = true;
    drawLottery();
    data.result.auto = 10;
    intervalObjAuto = setInterval(() => {
        data.result.auto = --data.result.auto;
        if (data.result.auto <= 0) {
            stopDraw();
			data.result.auto = 0;
            clearInterval(intervalObjAuto);
            intervalObjAuto = null;
        }
    }, 1000);
};
const stopDraw = () => {
    isLoading.value = false;
    isShowResult.value = true;

    data.result.index = Math.floor(Math.random() * data.lottery.array.length);
    data.result.text = data.lottery.array[data.result.index];

    data.result.auto = 0;
    clearInterval(intervalObj);
    intervalObj = null;
};

const drawLottery = () => {
    intervalObj = setInterval(() => {
        data.result.progress = data.lottery.array[Math.floor(Math.random() * data.lottery.array.length)];
    }, 100);
};
</script>

<style lang="scss">
    .lottery-result {
        color: #FF4040;
        font-size: 30rpx;
        font-weight: bold;
    }
</style>

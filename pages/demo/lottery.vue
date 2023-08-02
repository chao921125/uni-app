<template>
	<view class="layout-content">
        <text v-show="!isShowResult" class="uni-title">请输入抽奖的内容，英文（半角）逗号 "," 分割</text>
        <textarea class="lottery-text cc-mt-10" placeholder="请输入抽奖的内容: a,b,c" auto-focus="true" v-model="data.lottery.text" @blur="textToArray" @confirm="textToArray"></textarea>
        
        <view v-show="!isShowResult" class="uni-title">您输入的内容是</view>
        <view>{{ data.lottery.array }}</view>
        <view class="cc-mt-20"><button>完成输入</button></view>
        <view v-show="isLoading" class="uni-title">抽奖中......</view>
        <view v-show="isLoading" class="uni-title cc-mt-10">{{ data.result.progress }}</view>
        <view v-show="isShowResult" class="uni-title">抽奖结果</view>
        <view v-show="isShowResult" class="uni-title cc-mt-10">{{ data.result.text }}</view>
        <view class="cc-mt-20">
            <button v-show="!isLoading" @click="startDraw">点击开始抽奖</button>
            <button v-show="isLoading" @click="stopDraw">点击停止抽奖</button>
        </view>
    </view>
</template>

<script setup>
    import { reactive, ref } from "vue";
    // 地球,火星,太阳,木星,金星,水星,火星,土星
    const data = reactive({
        lottery: {
            text: "",
            array: [],
        },
        result: {
            index: 0,
            progress: "",
            text: "",
        }
    });
    
    const isLoading = ref(false);
    const isShowResult = ref(false);
    const intervalObj = ref(null);
    
    const textToArray = () => {
        isShowResult.value = false;
        if (!data.lottery.text) data.lottery.array = [];
        data.lottery.array = data.lottery.text.split(",");
    }
    
    const startDraw = () => {
        isShowResult.value = false;
        if (!data.lottery.array.length) {
            isLoading.value = false;
            return false;
        }
        isLoading.value = true;
        drawLottery();
    }
    const stopDraw = () => {
        isLoading.value = false;
        isShowResult.value = true;
        
        data.result.index = Math.floor(Math.random() * data.lottery.array.length);
        data.result.text = data.lottery.array[data.result.index];
        
        clearInterval(intervalObj.value);
        intervalObj.value = null;
    }
    
    const drawLottery = () => {
        intervalObj.value = setInterval(() => {
            data.result.progress = data.lottery.array[Math.floor(Math.random() * data.lottery.array.length)];
        }, 100);
    }
</script>

<style lang="scss"></style>

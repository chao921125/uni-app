<template>
	<view class="bound" :style="{ height: `${data.bH}px`, marginTop: '10px' }">{{ data.bH }}</view>
</template>

<script setup>
import { reactive } from "vue";
import { useHeightStore } from "@/store/height.js";

const data = reactive({
	sH: useHeightStore().heightStatus,
	nH: useHeightStore().heightNav,
	bH: useHeightStore().heightBound,
});
</script>

<style></style>

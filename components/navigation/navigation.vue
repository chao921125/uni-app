<template>
	<view>
		<view class="status" :style="{ height: `${data.sH}px` }">{{ data.sH }}</view>
		<view class="bound" :style="{ height: `${data.bH}px`, marginTop: '10px' }">{{ data.bH }}</view>
	</view>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useHeightStore } from "@/store/height.js";

const data = reactive({
	sH: useHeightStore().heightStatus,
	bH: useHeightStore().heightBound,
});
</script>

<style></style>

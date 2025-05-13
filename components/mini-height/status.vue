<template>
	<view class="status" :style="{ height: `${data.sH}px` }">{{ data.sH }}</view>
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

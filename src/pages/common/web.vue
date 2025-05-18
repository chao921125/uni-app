<script setup name="">
	import { onLoad } from "@dcloudio/uni-app";
	import { ref } from "vue";

	const urlParams = ref();
	const url = ref("");
	onLoad((option) => {
		urlParams.value = option || "";
		if (option.url) {
			url.value = decodeURIComponent(option.url);
		}
	});
</script>

<template>
	<web-view :src="url"></web-view>
</template>

<style scoped lang="scss"></style>

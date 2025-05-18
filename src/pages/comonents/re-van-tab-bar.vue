<script setup>
	import { onMounted, ref } from "vue";
	import constants from "@/plugins/utils/constants";

	const props = defineProps({
		index: {
			required: false,
			type: Number,
			default: 0,
		},
	});
	const emits = defineEmits(["change"]);

	const active = ref(0);
	const changePage = (event) => {
		active.value = event.detail;
		emits("change", event.detail);
	};

	onMounted(() => {
		active.value = props.index;
	});
</script>

<template>
	<view>
		<van-tabbar
			:active="active"
			@change="changePage"
			:placeholder="true"
			active-color="#1989fa">
			<van-tabbar-item
				v-for="item in constants.TabBar"
				:icon="item.icon"
				:key="item.path"
				>{{ item.name }}</van-tabbar-item
			>
		</van-tabbar>
	</view>
</template>

<style lang="scss"></style>

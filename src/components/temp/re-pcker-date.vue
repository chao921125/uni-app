<template>
	<picker
		mode="date"
		:value="dateObj.date"
		:start="startDate"
		:end="endDate"
		@change="changeClick">
		<slot>
			<uni-easyinput
				v-model="dateObj.date"
				class="re-w-fill input"
				placeholder=""
				:trim="true"
				:inputBorder="false"
				type="text" />
		</slot>
	</picker>
</template>

<script setup name="">
	import { reactive, computed } from "vue";
	import util from "@/common/utils/index.js";

	const props = defineProps({
		defaultDate: {
			required: false,
			type: String,
			default: "",
		},
	});
	const emits = defineEmits(["change"]);

	const dateObj = reactive({
		date: props.defaultDate || util.formatDate(new Date(), "yyyy-MM-dd"),
	});
	// 日期选择
	const startDate = computed(() => {
		return getDate("start");
	});
	const endDate = computed(() => {
		return getDate("end");
	});
	const getDate = (type) => {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === "start") {
			year = year - 60;
		} else if (type === "end") {
			year = year + 60;
		}
		month = month > 9 ? month : "0" + month;
		day = day > 9 ? day : "0" + day;
		return `${year}-${month}-${day}`;
	};

	const changeClick = (e) => {
		dateObj.date = e.detail.value;
		emits("change", e.detail.value);
	};
	defineExpose({
		changeClick,
	});
</script>

<style scoped lang="scss"></style>

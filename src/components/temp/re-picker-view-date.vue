<template>
	<picker-view
		v-if="props.visible"
		:indicator-style="dateObj.indicatorStyle"
		:value="dateObj.value"
		@change="changeClick"
		class="picker-view">
		<picker-view-column>
			<view
				class="item"
				v-for="(item, index) in dateObj.years"
				:key="index"
				>{{ item }}Year</view
			>
		</picker-view-column>
		<picker-view-column>
			<view
				class="item"
				v-for="(item, index) in dateObj.months"
				:key="index"
				>{{ item }}Month</view
			>
		</picker-view-column>
		<picker-view-column>
			<view
				class="item"
				v-for="(item, index) in dateObj.days"
				:key="index"
				>{{ item }}Day</view
			>
		</picker-view-column>
	</picker-view>
</template>

<script setup name="">
	import { onMounted, reactive, ref } from "vue";
	const props = defineProps({
		visible: {
			required: true,
			type: Boolean,
			default: false,
		},
	});
	const emits = defineEmits(["change"]);

	const dateObj = reactive({
		visible: props.visible,
		indicatorStyle: `height: 50px;`,
		date: new Date(),
		years: [],
		year: 1990,
		months: [],
		month: 1,
		days: [],
		day: 0,
		value: [],
	});

	const initData = () => {
		dateObj.year = dateObj.date.getFullYear();
		dateObj.month = dateObj.date.getMonth() + 1;
		dateObj.day = dateObj.date.getDate();
		dateObj.value = [9999, dateObj.month - 1, dateObj.day - 1];
		for (let i = 1990; i <= dateObj.date.getFullYear(); i++) {
			dateObj.years.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			dateObj.months.push(i);
		}
		for (let i = 1; i <= 31; i++) {
			dateObj.days.push(i);
		}
	};

	const changeClick = (e) => {
		const val = e.detail.value;
		dateObj.year = dateObj.years[val][0];
		dateObj.month = dateObj.months[val][1];
		dateObj.day = dateObj.days[val][2];

		dateObj.visible = !dateObj.visible;
		emits("change", dateObj.visible);
	};

	onMounted(() => {
		initData();
	});

	defineExpose({
		changeClick,
	});
</script>

<style scoped lang="scss"></style>

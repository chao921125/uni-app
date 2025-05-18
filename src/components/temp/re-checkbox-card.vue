<template>
	<view class="re-w-fill">
		<view class="re-flex re-w-fill checkbox-list">
			<view
				class="re-mr-10 re-mb-10 checkbox-item"
				v-for="(item, index) in props.list"
				:key="index"
				@tap="onSelect(item.value)"
				:class="selected.includes(item.value) ? 'checkbox-active' : ''">
				<text>{{ item.name || item.label }}</text>
				<image
					class="checkbox-icon"
					:src="CheckboxSelected"></image>
			</view>
			<view
				v-if="props.isShowMore"
				class="re-mr-10 re-mb-10 checkbox-item"
				@tap="onSelect(0)"
				:class="selected.includes(0) ? 'checkbox-active' : ''">
				<text>Others</text>
				<image
					class="checkbox-icon"
					:src="CheckboxSelected"></image>
			</view>
			<!-- <view
                v-if="props.isShowMore"
                class="checkbox-other"
                @tap="onSelect(0)"
                :class="selected.includes(0) ? 'checkbox-active' : ''"
            >
                <image class="other-img" src="/static/images/icons/add-black.png"></image>
            </view> -->
		</view>
		<view
			v-if="props.isShowMoreInput && selected.includes(0)"
			class="re-mt-20 re-w-fill">
			<uni-easyinput
				v-model="otherText"
				class="input"
				placeholder=""
				:trim="true"
				:inputBorder="false"
				type="textarea"></uni-easyinput>
		</view>
	</view>
</template>

<script setup name="">
	import CheckboxSelected from "@/static/images/icons/checkbox-selected.png";
	import { ref } from "vue";

	const props = defineProps({
		list: {
			require: true,
			type: Array,
			default: () => {
				return [];
			},
		},
		selectList: {
			require: true,
			type: Array,
			default: () => {
				return [];
			},
		},
		isMultiple: {
			required: false,
			type: Boolean,
			default: false,
		},
		isShowMore: {
			required: false,
			type: Boolean,
			default: true,
		},
		isShowMoreInput: {
			required: false,
			type: Boolean,
			default: true,
		},
	});
	const emits = defineEmits(["change"]);

	const selected = ref(props.selectList);
	const otherText = ref("");
	const onSelect = (e) => {
		if (!selected.value.length) {
			selected.value.push(e);
		} else if (selected.value.includes(e)) {
			selected.value.splice(selected.value.indexOf(e), 1);
		} else {
			if (props.isMultiple) {
				selected.value.push(e);
			} else {
				selected.value.splice(0, 1);
				selected.value.push(e);
			}
		}
		if (props.isMultiple) {
			emits("change", selected.value);
		} else {
			emits("change", selected.value[0]);
		}
	};
	defineExpose({
		onSelect,
	});
</script>

<style scoped lang="scss">
	.checkbox-list {
		flex-wrap: wrap;
	}
	.checkbox-item {
		padding: 15rpx 42rpx;
		font-size: 26rpx;
		font-family: SFPro-Black, SFPro;
		font-weight: 900;
		color: #8d8d8d;
		line-height: 31rpx;
		background: #ffffff;
		border-radius: 10rpx;
		border: 2rpx solid #8d8d8d;
		position: relative;
		z-index: 1;
		.checkbox-icon {
			display: none;
		}
	}
	.checkbox-other {
		.other-img {
			width: 62rpx;
			height: 62rpx;
		}
	}
	.checkbox-active {
		color: #000000 !important;
		border: 2rpx solid #000000 !important;
		.checkbox-icon {
			display: block !important;
			width: 32rpx;
			height: 25rpx;
			position: absolute;
			z-index: 9;
			top: 0;
			right: 0;
		}
	}
</style>

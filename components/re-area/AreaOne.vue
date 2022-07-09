<template>
	<uni-data-picker :localdata="dataArray" v-model="areaSelect" popup-title="请选择地域" @change="onchange" @nodeclick="onnodeclick"></uni-data-picker>
</template>

<script>
    import area from "@/common/libs/area.js";
	import { ref, reactive, watchEffect, toRefs } from "vue";

	
	export default {
		props: {
			areaDefaultSelect: {
				type: Number,
				default: 0
			},
		},
		setup(props, context) {
			const dataArray = reactive(area.area);
			const areaObject = reactive({
				province: 0,
				provinceName: "",
				city: 0,
				cityName: "",
				area: 0,
				areaName: "",
			});
			const areaSelect = ref(props.areaDefaultSelect);
			
			watchEffect(() => {
				areaSelect.value = props.areaDefaultSelect || 0;
			});
			
			function onchange(e) {
				let returnObj = {};
				Object.assign(returnObj, {
					province: e.detail.value[0].value,
					provinceName: e.detail.value[0].text,
					city: e.detail.value[1].value,
					cityName: e.detail.value[1].text,
					area: e.detail.value[2].value,
					areaName: e.detail.value[2].text,
				});
				context.emit("change", returnObj);
			}
			function onnodeclick(node) {
				// switch(node.level) {
				// 	case 1: this.areaObject.province = node.value; this.areaObject.provinceName = node.text; break;
				// 	case 2: this.areaObject.city = node.value; this.areaObject.cityName = node.text; break;
				// 	case 3: this.areaObject.area = node.value; this.areaObject.areaName = node.text; break;
				// }
			}
			return {
				dataArray,
				areaObject,
				areaSelect,
				onchange,
				onnodeclick
			}
		},
	}
</script>

<style>
</style>
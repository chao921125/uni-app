<template>
    <view>
        <uni-grid :column="3" :showBorder="false"  :square="false">
            <uni-grid-item><uni-card @click="toExpert(1)">医疗</uni-card></uni-grid-item>
            <uni-grid-item><uni-card @click="toExpert(2)">教育</uni-card></uni-grid-item>
            <uni-grid-item><uni-card @click="toExpert(3)">咨询</uni-card></uni-grid-item>
            <uni-grid-item><uni-card @click="toExpert(4)">其他</uni-card></uni-grid-item>
        </uni-grid>
    </view>
</template>

<script>
	import http from "@/common/plugins/http.js";
	import router from "@/common/config/router.js";
	
    export default {
        data() {
            return {
                
            };
        },
		created() {
			
		},
		methods: {
			toExpert() {
				http.href(router.orderExpert, false);
			}
		}
    }
</script>

<style lang="scss">

</style>

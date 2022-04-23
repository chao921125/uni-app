<template>
    <view>
        <uni-grid :column="5" :showBorder="false"  :square="false" @change="toExpert">
			<view v-if="!subjectList || subjectList.length === 0">No Data</view>
			<uni-grid-item v-else v-for="(item, index) in subjectList" :key="index" :index="index">
				<view class="re-flex re-flex-row-center"><icon class="iconfont icon-zhuanjia"></icon></view>
				<view class="re-flex re-flex-row-center">{{item.name}}</view>
			</uni-grid-item>
        </uni-grid>
    </view>
</template>

<script>
	import utils from "@/common/plugins/common.utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { subjectList } from "@/common/api/subject.js";
	
    export default {
        data() {
            return {
                subjectList: [],
            };
        },
		created() {
			this.getSubjectList();
		},
		methods: {
			getSubjectList() {
				subjectList().then((res) => {
					this.subjectList = res.data;
				});
			},
			toExpert(e) {
				utils.href(defaultConfig.routePath.orderExpert + `?id=${this.subjectList[e.detail.index].value}`, false);
			}
		}
    }
</script>

<style lang="scss">

</style>

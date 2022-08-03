<template>
	<view v-if="tableData.length <= 0">
		<NoData></NoData>
	</view>
	<view v-else>
		<uni-table ref="table" border stripe>
			<uni-tr>
				<uni-th width="120">提现时间</uni-th>
				<uni-th width="100">提现金额</uni-th>
				<uni-th width="100">状态</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td width="120">{{item.createDate}}</uni-td>
				<uni-td width="100">{{item.amount}}</uni-td>
				<uni-td width="100">
					<text v-if="item.status.toString()==='1'" class="text-high">提现申请</text>
					<text v-if="item.status.toString()==='2'" class="text-high">审核成功</text>
					<text v-if="item.status.toString()==='3'" class="text-high">审核失败</text>
				</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	import NoData from "@/components/re-no-data/NoData.vue";
	
	export default {
		components: {
			NoData
		},
		data() {
			return {
				loading: false,
				pageOption: {
					pageSize: 10,
					pageCurrent: 1,
					total: 0,
				},
                loadMoreOption: {
					isShow: true,
                    status: "more",
                    contentText: {
                        contentdown: "上拉加载更多",
                        contentrefresh: "正在加载...",
                        contentnomore: "没有数据了",
                    }
                },
				tableData: [],
			};
		},
		onShow() {
			this.tableData = [];
			this.pageOption.pageCurrent = 1;
			this.init();
		},
		onPullDownRefresh() {
			this.tableData = [];
            this.pageOption.pageCurrent = 1;
			this.init();
		},
        onReachBottom(e) {
			this.getMoreList();
        },
		methods: {
			init() {
				console.log(this.pageOption.pageCurrent)
				selectRecharge({
					currentPage: this.pageOption.pageCurrent,
					pageSize: this.pageOption.pageSize,
				}).then((res) => {
					this.loadMoreOption.isShow = this.tableData.length >= this.pageOption.pageSize;
					if (this.tableData.length > 0 && res.data && res.data.length > 0) {
						this.tableData = this.tableData.concat(res.data);
					} else if (this.tableData.length === 0) {
						this.tableData = res.data;
					} else {
						this.loadMoreOption.status = "no-more";
					}
				});
				
			},
            getMoreList() {
                this.pageOption.pageCurrent++;
                this.loadMoreOption.status = "loading";
				this.init();
            },
		}
	}
</script>

<style lang="scss">

</style>

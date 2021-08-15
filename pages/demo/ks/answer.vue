<template>
	<view>
		<view class="header" id="header">
			<span>第{{currentIndex+1}}题</span>
			<span class="header-button" @click='handleSubmit' v-if='!isReviewed'>交卷</span>
		</view>
		<view id="subHeader">
			<view class="sub-header" v-if='questtionList.length>0'>
				<span class='sub-header-type' v-if='questtionList[currentIndex].type==1'>判断题</span>
				<span class='sub-header-type' v-if='questtionList[currentIndex].type==2'>选择题</span>
				<span class='sub-header-type' v-if='questtionList[currentIndex].type==3'>多选题</span>
				<span class='sub-header-number'>{{currentIndex+1}}/{{questtionList.length}} 题</span>
			</view>
		</view>
			<swiper class="content" :duration='duration' :current=currentIndex @change='handleSwiperChanged' v-if='questtionList.length>0' :style="{'height':swiperHeight}">
				<template v-for='item in questtionList'>
					<swiper-item class="content-item">
						<scroll-view scroll-y :style="{'height':swiperHeight}">
							<view class="content-title">
								{{item.title}}
							</view>
							<view class="content-solutions" v-if='item.type == 1'>
								<template v-for='subItem in item.optionList'>
									<view :class="isReviewed && item.answer.indexOf(subItem.id)>-1 ? 'right': ''" class="content-solutions-item">
										<view :class="[item.userAnswer == subItem.id? 'content-solutions-item-select' : '']" class="content-solutions-item-check-content" @click='chooseSolution(item,subItem)'>{{subItem.content}}</view>
									</view>
								</template>
							</view>
							<view class="content-solutions" v-if='item.type == 2'>
								<template v-for='subItem in item.optionList'>
									<view :class="isReviewed && item.answer.indexOf(subItem.id)>-1 ? 'right': ''" class="content-solutions-item" @click='chooseSolution(item,subItem)'>
										<view class="content-solutions-item-single">{{subItem.id}}</view>
										<view :class="item.userAnswer == subItem.id? 'content-solutions-item-select' : ''" class="content-solutions-item-content">{{subItem.content}}</view>
									</view>
								</template>
							</view>
							<view class="content-solutions" v-if='item.type == 3'>
								<template v-for='subItem in item.optionList'>
									<view :class="isReviewed && item.answer.indexOf(subItem.id)>-1 ? 'right': ''" class="content-solutions-item" @click='chooseMutiSolution(item,subItem)'>
										<view class="content-solutions-item-single">{{subItem.id}}</view>
										<view :class="item.userAnswer.indexOf(subItem.id)> -1? 'content-solutions-item-select' : ''" class="content-solutions-item-content">{{subItem.content}}</view>
									</view>
								</template>
							</view>
							<view class="content-item-explain" v-if='isReviewed'>
								<view class="content-item-explain-result">正确答案是<span>{{item | rightAnswerFilter}}</span> </view>
								<view>解析:</view>
								<view class="content-item-explain-content">{{item.explainContent}}</view>
							</view>
						</scroll-view>
					</swiper-item>
				</template>
			</swiper>
	
		
		<view class="footer" id="footer">
			<view class="footer-back" @click='handleChangeCurrentSwiper(-1)'>上一题</view>
			<view class="footer-card" @click="showQuestion = !showQuestion">答题卡</view>
			<view class="footer-right" @click='handleChangeCurrentSwiper(1)'>下一题</view>
		</view>
		
		<modal v-model="showQuestion">
			<view class='question-modal' :style="{'height': modalHeight}">
				<view class="question-modal-header" id="questionHeader">
					答题卡
				</view>
				<scroll-view scroll-y class="question-modal-body" :style="{'height': modalContentHeight}">
					<template v-for="(item, index) in questtionList">
						<view v-if='item.userAnswer && item.answer==item.userAnswer && isReviewed' class="question-modal-body-item question-modal-body-item-right" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else-if='item.userAnswer && isReviewed' class="question-modal-body-item question-modal-body-item-failed" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else-if='item.userAnswer' class="question-modal-body-item question-modal-body-item-select" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
						<view v-else class="question-modal-body-item" @click="handleJumpSwiper(index)">{{index + 1 }}</view>
					</template>
				</scroll-view>
			</view>
		</modal>
	</view>
</template>

<script>
	import Modal from './modal.vue'
	export default {
		data() {
			return {
				currentIndex: 0,
				swiperHeight: 0,
				modalHeight: '',
				modalContentHeight: '',
				showQuestion: false,
			}
		},
		filters:{
			rightAnswerFilter(item){
				if(item.type == 1){
					switch(item.answer){
						case 'A': return '对';
						case 'B': return '错';
					}
				}else {
					return item.answer
				}
			}
		},
		watch:{
			currentSwiperItem(val){
				this.currentIndex = val
			}
		},
		props:{
			isReviewed: {
				type: Boolean,
				default: false
			},
			currentSwiperItem: {
				type: [String, Number],
				default: 0
			},
			duration: {
				type: [String, Number],
				default: 300
			},
			
			questtionList: {
				type: Array,
				default: ()=> {
					return [
					{
						"id":652,
						"title":"黄金持续上涨，因此2020年鼠年金币的发行价格相对去年上涨30%是合理的",
						"answer":"B",
						"type":1,
						"difficulty":"中",
						"explainContent":"目前金价格较年初上涨30%左右，而实际鼠年金币的发行价并未达到金价的涨幅，生肖金银币发行价格维稳，是金币总公司涵养市场的表现。",
						"optionList":[
							{
								"optionId":2469,
								"id":"A",
								"questionId":652,
								"content":"对",
								"type":1,
							},
							{
								"optionId":2470,
								"id":"B",
								"questionId":652,
								"content":"错",
								"type":1,
							}
						],
						"userAnswer":""
					},
					{
						"id":541,
						"title":"1931年在中华苏维埃第一次全国代表大会上，（）受命在江西瑞金筹建了第一家共和国国家银行——中华苏维埃共和国国家银行，并任行长。",
						"answer":"B",
						"type":2,
						"difficulty":"中",
						"explainContent":"暂无解析",
						"optionList":[
							{
								"optionId":2045,
								"id":"A",
								"questionId":541,
								"content":"习仲勋",
								"type":2,
							},
							{
								"optionId":2046,
								"id":"B",
								"questionId":541,
								"content":"毛泽民",
								"type":2,
							},
							{
								"optionId":2047,
								"id":"C",
								"questionId":541,
								"content":"刘志丹",
								"type":2,
							},
							{
								"optionId":2048,
								"id":"D",
								"questionId":541,
								"content":"毛泽东",
								"type":2,
							}
						],
						"userAnswer":""
					},
					{
						"id":685,
						"title":"铜质熊猫纪念币的发行年份分别是哪几年？（）",
						"answer":"ABC",
						"type":3,
						"difficulty":"中",
						"explainContent":"铜质熊猫纪念币的发行年份分别是1983年、1984年、1985年。",
						"optionList":[
							{
								"optionId":2543,
								"id":"A",
								"questionId":685,
								"content":"1983年",
								"type":3,
							},
							{
								"optionId":2544,
								"id":"B",
								"questionId":685,
								"content":"1984年",
								"type":3,
							},
							{
								"optionId":2545,
								"id":"C",
								"questionId":685,
								"content":"1985年",
								"type":3,
							},
							{
								"optionId":2546,
								"id":"D",
								"questionId":685,
								"content":"1986年",
								"type":3,
							}
						],
						"userAnswer":""
					},
				]
				}
			}
		},
		mounted(){
			this.setAnswerHeight()
		},
		components:{
			Modal
		},
		methods: {
			/*设置题目的高度
			 */
			setAnswerHeight(){
				let that = this
				let tempHeight = 0
				uni.getSystemInfo({
					//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
					success: function(res) {               
						tempHeight = res.windowHeight;
						that.modalHeight = res.windowHeight - uni.upx2px(200) + 'px';
						that.modalContentHeight = res.windowHeight - uni.upx2px(380) + 'px';
						uni.createSelectorQuery().select("#header").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							uni.createSelectorQuery().select("#subHeader").fields({
								size: true,
								scrollOffset: true
							}, (data) => {
								tempHeight -= data.height;
								uni.createSelectorQuery().select("#footer").fields({
									size: true,
									scrollOffset: true
								}, (data) => {
									tempHeight -= data.height;
									that.swiperHeight = tempHeight + 'px';
								}).exec();
							}).exec();
						}).exec();
					}
				});
			},
			/*跳转指定题目
			* */
			handleJumpSwiper(index){
				this.currentIndex = index
				this.showQuestion = false
			},
			/* 滑动题目
			 */
			handleSwiperChanged(event){
				this.currentIndex = event.detail.current
			},
			/* 调用上一页，下一页
			 */
			handleChangeCurrentSwiper(operation){
				let max = this.questtionList.length -1
				let min = 0
				if((this.currentIndex>min && operation<0) || (this.currentIndex<max&&operation>0) ){
					this.currentIndex += operation
					console.log(this.currentIndex)
				}
			},
			/* 选择答案（单选，判断）
			 */
			chooseSolution(item, subItem){
				if(!this.isReviewed){
					item.userAnswer = subItem.id
					setTimeout(()=> {
						this.currentIndex +=1
					},300)
					this.onAnswerChange(item)
				}
				
			},
			/* 选择答案（多选）
			 */
			chooseMutiSolution(item, subItem){
				if(!this.isReviewed){
					let newAnswer = JSON.parse(JSON.stringify(item.userAnswer))
					if(newAnswer.indexOf(subItem.id) > -1){
						newAnswer = newAnswer.replace(subItem.id, '')
					} else{
						newAnswer +=subItem.id
					}
					let splitArray = newAnswer.split('')
					let noFormString = splitArray.sort().toString().replace(/,/g, '')
					item.userAnswer = noFormString
					this.onAnswerChange(item)
				}
				
				
			},
			/* 题目答案变化
			 */
			onAnswerChange(item){
				let result = JSON.parse(JSON.stringify(item))
				this.$emit('onChange', item)
			},
			/* 提交答案
			 */
			handleSubmit(){
				this.$emit('submit', this.questtionList)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
#header, #subHeader{
	height: 100rpx;
}
.header{
	position: relative;
	text-align: center;
	line-height: 100rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #ADC0F1;
	letter-spacing: 10rpx;
	&-button{
		width: 80rpx;
		height: 40rpx;
		line-height: 40rpx;
		position: absolute;
		top: 20rpx;
		right: 40rpx;
		padding: 10rpx 20rpx;
		border-radius: 15rpx;
		letter-spacing: 2rpx;
		font-weight: 500;
		color: #FFFFFF;
		background-color: #ADC0F1;
	}
}
.sub-header{
	padding: 30rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ADC0F1;
}
.content{
	letter-spacing: 3rpx;
	&-item-explain{
		padding-bottom: 20rpx;
		font-size: 30rpx;
		color: #8799a3;
		letter-spacing: 5rpx;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		&-result{
			padding: 20rpx 0;
			span{
				padding-left: 20rpx;
				color: #39b54a;
			}
		}
		&-content{
			padding: 20rpx 0;
		}
	}
	&-item{
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	&-title{
		margin-bottom: 30rpx;
		font-size: 32rpx;
		line-height: 55rpx;
		color: #4c8af3
	}
	&-solutions{
		width: 100%;
		padding-bottom: 20rpx;
		&-item{
			margin: 60rpx 0;
			border: 5rpx solid #ADC0F1;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			background-color: #ADC0F1;
			&-check-content{
				padding: 35rpx 20rpx;
				width: 100%;
				border-radius: 15rpx;
				color: #4c8af3;
				background-color: #FFFFFF;
			}
			&-single{
				width: 80rpx;
				text-align: center;
				color: #FFFFFF;
			}
			
			&-content{
				padding: 35rpx 20rpx;
				width: 630rpx;
				border-top-right-radius: 15rpx;
				border-bottom-right-radius: 15rpx;
				color: #3F8FFF;
				background-color: #FFFFFF;
			}
			&-select{
				color: #FFFFFF;
				background-color: #ADC0F1;
			}
		}
	}
}
.footer{
	width: 750rpx;
	height: 100rpx;
	padding: 30rpx 20rpx;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	bottom: 0;
	font-size: 30rpx;
	box-sizing: border-box;
	color: #4c8af3;
	box-shadow: 0 -5rpx 5rpx #ADC0F1;
	&-card{
		padding: 10rpx 20rpx;
		border: 1px solid #ADC0F1;
		border-radius: 15rpx;
		color: #FFFFFF;
		background-color: #ADC0F1;
	}
}
.question-modal{
	width: 700rpx;
	padding: 40rpx;
	background-color: #FFFFFF;
	&-header{
		height: 100rpx;
		text-align: center;
		font-size: 35rpx;
		line-height: 100rpx;
		color: #333333;
		border-bottom: 1rpx solid #F0F0F0;
	}
	&-body{
		&-item{
			width: 80rpx;
			margin: 10rpx 22rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 35rpx;
			display: inline-block;
			text-align: center;
			border-radius: 50%;
			color: #8799a3;
		}
		&-item-failed{
			color: #FFFFFF;
			background-color: #982121;
		}
		&-item-right{
			color: #FFFFFF;
			background-color: #39b54a;
		}
		&-item-select{
			color: #FFFFFF;
			background-color: #ADC0F1;
		}
	}
}
.right{
	border: 5rpx solid #39b54a;
}

</style>

<template>
	<view>{{ list }}
		<view class="spinner" :style="{width: width + 'rpx'}" @tap="tapShow()">
			<input class="spinner-label" placeholder-class="spinner-label place" :placeholder="byHint()" disabled
				:style="{width: (width-240) + 'rpx'}" type="text" v-model="label" />
			<image class="spinner-arrow" mode="aspectFit" :src="byImage()" />
		</view>
		<scroll-view class="list" :style="{width: width + 'rpx',height: byHeight()}" v-if="drop" scroll-y>
			<view :class="drop ? 'list-show' : 'list-hide'" @tap="tapHide()" />
			<view class="list-ul" :style="'--i:' + list.length" :class="drop ? 'list-height' : ''">
				<view class="list-li" v-for="(it, idx) in list" :key="idx" @tap="tapClick(it)">{{it.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * 仿Spinner组件
	 * @property {Number} width 组件的宽度，单人rpx，默认686 
	 * @property {String} title 标题
	 * @property {String} hint 提示
	 * @property {Array} list 列表 
	 * @property {String} type 组件类型，drop-下拉，jump-跳转
	 * @event {Function()} jump 跳转
	 * @event {Function()} drop 下拉
	 * @event {Function()} error 下拉时，拦截list的长度为0
	 */
	export default {
		name: 'yinrh-spinner',
		props: {
			width: {
				type: Number,
				default: 686
			},
			title: {
				type: String,
				default: ''
			},
			hint: {
				type: String,
				default: '请选择'
			},
			list: {
				type: Array,
				default: (data) => {
					return [];
				}
			},
			type: {
				type: String,
				default: 'drop'
			}
		},
		data() {
			return {
				label: '', // 显示的内容
				drop: false,
				arrow: {
					drop: '/uni_modules/yinrh-spinner/static/arrow_drop.png',
					jump: '/uni_modules/yinrh-spinner/static/arrow_jump.png'
				}
			};
		},
		methods: {
			byHint() {
				return 'jump' === this.type ? '请连接' : this.hint;
			},
			/**
			 * 获取数据：label的颜色
			 */
			byColor() {
				return this.label ? '#48A5EB' : '#DF0000';
			},
			/**
			 * 外部方法：更新label值
			 * @param {String} label 
			 */
			tapLabel(label) {
				this.label = label;
			},
			/**
			 * 单击事件：显示Spinner列表
			 */
			tapShow() {
				if ('jump' === this.type) {
					this.$emit('jump');
					return;
				}
				if (0 != this.list.length) {
					this.drop = true;
				} else {
					this.$emit('error');
				}
			},
			/**
			 * 单击事件：隐藏Spinner列表
			 */
			tapHide() {
				this.drop = false;
			},
			/**
			 * 获取数据：Spinner的高度
			 */
			byHeight() {
				let number = this.list.length;
				if (0 == number) number = 4;
				if (4 <= number) number = 4;
				return (number * 90 + 4) + 'rpx';
			},
			/**
			 * 单击事件：选择数据
			 * @param {Object} item
			 */
			tapClick(item) {
				this.label = item.name;
				this.drop = false;
				this.$emit('drop', item);
			},
			/**
			 * 获取数据：获取ICON值
			 */
			byImage() {
				return this.arrow[this.type];
			}
		}
	};
</script>

<style scoped lang="scss">
	.spinner {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-around;
		height: 90rpx;
		padding: 2rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		border: 2rpx solid #C0C0C0;
	}

	.spinner-label {
		width: auto;
		height: 82rpx;
		text-align: left;
		line-height: 82rpx;
		padding-left: 20rpx;
		color: #48A5EB;
		font-size: 34rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.spinner-label.place {
		color: #DF0000;
		padding-left: 0rpx;
	}

	.spinner-arrow {
		width: 60rpx;
		height: 82rpx;
	}

	.list {
		border: 2rpx solid #C0C0C0;
		z-index: 100;
		height: auto;
		position: absolute;
		border-radius: 10rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.list-show {
			top: 0;
			left: 0;
			position: fixed;
			width: 100vw;
			height: 100vh;
			z-index: 100;
			pointer-events: auto;
		}

		.list-hide {
			pointer-events: none;
		}

		.list-ul {
			position: relative;
			z-index: 101;
			width: auto;
			height: 0;
			transition: all 0.2s;
			overflow: hidden;
			list-style: none;
			padding-left: 0;
			border-radius: 10rpx;

			.list-li {
				box-sizing: border-box;
				height: 90rpx;
				color: #333333;
				font-size: 34rpx;
				line-height: 90rpx; //与下面的高度保持一致
				padding-left: 32rpx;
				border-bottom: 2rpx solid #F4F4F4;
			}

			.list-li:first-child {
				border-top-left-radius: 10rpx;
				border-top-right-radius: 10rpx;
			}

			.list-li:last-child {
				border-bottom: none;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
		}

		.list-height {
			height: calc(var(--i) * 90rpx); //与上面的高度保持一致
		}
	}
</style>

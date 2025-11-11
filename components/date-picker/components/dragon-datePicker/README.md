#时间戳格式化，换算为多久之前
#### 参数文档

| 参数 | 说明 | 类型 | 默认值 | 其他 |
| :---- | :---- | :---- | :---- | :---- |
| show | 显示选择器 | Boolean | false | - |
| value | 默认日期 | String | - | 不传则默认今天 |
| yearStart | 起始年份 | Number | 90年前 | - |
| yearEnd | 结束年份 | Number | 2050 | - |
| showLabel | 显示年月日 | Boolean | true | - |
| nowStatus | 日期显示范围 | String | future | past 过去 future 未来 |

#### case
```vue
<template>
	<view style="padding: 30rpx;">
		<view style="margin-top: 30rpx" @click="show=true">
			日期选择器1：默认选中日期
		</view>
		<view style="margin-top: 30rpx" @click="show1=true">
			日期选择器2：显示年月日 
		</view>
		<view style="margin-top: 30rpx">
			所选日期 {{ date }}
		</view>
		<DatePicker :showLabel="false" :show="show" value="2025-05-06" @confirm="dateChange" @cancel="show=false" />
		<DatePicker :showLabel="true" :show="show1" :value="defaultDate" @confirm="dateChange" @cancel="show1=false" />
	</view>
</template>

<script>
	import DatePicker from '@/components/dragon-datePicker/dragon-datePicker.vue'
	export default {
		components: {DatePicker},
		data() {
			return {
				defaultDate: '',
				date: '',
				show: false,
				show1: false,
			}
		},
		methods: {
			dateChange(v) {
				this.show = false
				this.show1 = false
				this.date = v
			}
		}
	}
</script>

```

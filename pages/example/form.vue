<template>
	<view>
		<uni-forms ref="refsForm" :modelValue="formData" :rules="formRules" label-width="100" label-align="right" :border="true">
			<uni-forms-item label="姓名" required name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submit()">check</button>
	</view>
</template>

<script>
	import { ref } from "vue";
	export default {
		setup() {
			const refsForm = ref(null);
			const formData = ref({
				name: "1"
			});
			const formRules = ref({
				name: {
					rules: [
						{required: true, errorMessage: "请填写姓名", validateTrigger: "bind"},
						{minLength: 1, maxLength: 10, errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符", validateTrigger: "bind"},
						// {minimum: 1, maximum: 10, errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符",},
						// {pattern: /^\d$/, errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符",},
						// string/number/boolean/array/object/url/email
						// {format: "string", errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符",},
						// {validateFunction: (rule,value,data,callback) => {callback('请至少勾选两个兴趣爱好')},},
					],
					label: "姓名",
					validateTrigger: "bind", // bind/submit
				}
			});
			const submit = () => {
				refsForm.value.validate().then(res=>{
					console.log('表单数据信息：', res);
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			}
			return {
				refsForm,
				formData,
				submit
			};
		},
		// 动态设置规则
		// onReady() {
		// 	// 需要在onReady中设置规则
		// 	this.$refs.refsForm.setRules(this.formRules);
		// },
	}
</script>

<style lang="scss">

</style>

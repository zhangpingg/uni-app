<template>
	<view>
		<uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
			<uni-forms-item label="输入框" name="aa" required>
				<uni-easyinput type="text" v-model="formData.aa" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="单选框" name="bb">
				<uni-data-checkbox v-model="formData.bb" :localdata="options" />
			</uni-forms-item>
			<uni-forms-item label="复选框" name="cc">
				<uni-data-checkbox multiple v-model="formData.cc" :localdata="options" />
			</uni-forms-item>
			<uni-forms-item label="下拉框" name="dd" required>
				<uni-data-select v-model="formData.dd" :localdata="options"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="文本域" name="ee">
				<uni-easyinput type="textarea" v-model="formData.ee" placeholder="请输入" />
			</uni-forms-item>
			<uni-forms-item label="日期时间" name="ff">
				<uni-datetime-picker type="datetime" v-model="formData.ff" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submitForm">提交</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const options = ref([
	{ text: '男', value: 0 },
	{ text: '女', value: 1 },
	{ text: '保密', value: 2 },
]);

const formRef = ref();
const formData = ref({
	aa: null,
	bb: null,
	cc: [],
	dd: null,
	ee: null,
	ff: null,
});
const formRules = ref({
	aa: {
		rules: [
			{
				required: true,
				errorMessage: '请输入aa',
			},
			{
				validateFunction: function (rule, value, data, callback) {
					if (value.length < 5) {
						callback('请输入至少5个字');
					}
					return true;
				},
			},
		],
	},
});

// 提交
const submitForm = () => {
	formRef.value
		.validate()
		.then((res) => {
			console.log('数据', res);
			uni.showToast({
				title: '校验通过',
			});
		})
		.catch((err) => {
			console.log('err', err);
		});
};
</script>

<style lang="scss" scoped></style>

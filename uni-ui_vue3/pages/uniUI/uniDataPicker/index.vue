<template>
	<view>
		<text>正常使用</text>
		<uni-data-picker
			placeholder="请选择班级"
			popup-title="请选择"
			:localdata="classDataTree"
			v-model="classValue1"
			@change="onchange"
			@nodeclick="onnodeclick"
		></uni-data-picker>

		<view class="mt-40">自定义插槽</view>
		<uni-data-picker
			v-slot:default="{ data, error, options }"
			title="请选择"
			:localdata="classDataTree"
			v-model="classValue2"
			@change="onchange"
			@nodeclick="onnodeclick"
		>
			<view class="input-border">
				<view v-if="error" class="error">
					<text>{{ error }}</text>
				</view>
				<view v-else-if="data.length" class="input-selected">
					<text v-for="(item, index) in data" :key="index"> {{ item.text }} &nbsp; </text>
				</view>
				<view v-else><text>占位符-请选择</text></view>
			</view>
		</uni-data-picker>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const classDataTree = ref([
	{
		text: '一年级',
		value: '1',
		children: [
			{
				text: '1.1班',
				value: '1-1',
			},
			{
				text: '1.2班',
				value: '1-2',
			},
		],
	},
	{
		text: '二年级',
		value: '2',
		children: [
			{
				text: '2.1班',
				value: '1-1',
			},
			{
				text: '2.2班',
				value: '2-2',
			},
		],
	},
	{
		text: '三年级',
		value: '3-0',
		disable: true,
	},
]);
const classValue1 = ref();
const classValue2 = ref();
const valueList = ref();

// change-级联
const onchange = (e) => {
	valueList.value = e.detail.value;
	console.log('数据', valueList.value);
};
// 点击-节点
const onnodeclick = (e) => {
	// console.log('节点', e);
};
</script>

<style lang="scss" scoped></style>

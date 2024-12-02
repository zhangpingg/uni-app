<template>
	<view class="box bg-fff pl-20 pr-20">
		<up-form labelPosition="left" :model="formData" labelWidth="100">
			<up-form-item label="输入框" borderBottom>
				<!-- 文本，数字，身份证，带小数点的数字，密码 -->
				<up-input v-model="formData.aa" border="none"></up-input>
			</up-form-item>
			<up-form-item label="单选框" borderBottom>
				<up-radio-group v-model="formData.bb">
					<up-radio
						v-for="item in radioOptions"
						:key="item.value"
						:label="item.label"
						:name="item.value"
						:disabled="item.disabled"
						activeColor="#f00"
					>
					</up-radio>
				</up-radio-group>
			</up-form-item>
			<up-form-item label="复选框" borderBottom>
				<up-checkbox-group v-model="formData.cc">
					<up-checkbox
						v-for="item in radioOptions"
						:key="item.value"
						:label="item.label"
						:name="item.value"
						:disabled="item.disabled"
					>
					</up-checkbox>
				</up-checkbox-group>
			</up-form-item>
			<view class="box-textareaWrap">
				<up-form-item label="文本域" borderBottom>
					<up-textarea v-model="formData.dd" placeholder="请输入内容" count></up-textarea>
				</up-form-item>
			</view>
			<up-form-item label="sheet选择" borderBottom>
				<view @click="isShowSexSheet = true">
					<up-input
						v-model="formData.eeLabel"
						disabled
						disabledColor="#ffffff"
						placeholder="请选择选择"
						border="none"
					></up-input>
				</view>
			</up-form-item>
			<up-form-item label="picker选择器" borderBottom @click="isShowPicker = true">
				{{ formData.ffLabel }}
			</up-form-item>
			<up-form-item label="日期时间" borderBottom>
				<!-- <up-datetime-picker hasInput :show="isShowDate" v-model="formData.gg" mode="datetime" /> -->
			</up-form-item>
			<view class="box-agree mt-20">
				<up-checkbox
					label="同意用户协议与隐私条款,内容很多很多内容很多很多内容很多很多内容很多很多内容很多很多"
					name="agree"
					usedAlone
					:checked="formData.zz"
					@change="changeAgree"
				>
				</up-checkbox>
			</view>
		</up-form>
		<view class="mt-50">
			<button size="mini" type="primary" @click="echoFormData">数据回显</button>
			<button size="mini" type="primary" @click="submit">提交</button>
		</view>
		
		<up-tooltip text="复制的内容" overlay></up-tooltip>
		<up-tooltip text="下方显示" direction="bottom"></up-tooltip>
		<up-tooltip text="扩展按钮11" :buttons="['扩展']" @click="fn1"></up-tooltip>
		
		
		<up-action-sheet
			:show="isShowSexSheet"
			:actions="sheetOptions"
			title="请选择"
			description="一些标题描述"
			:safeAreaInsetBottom="true"
			@close="isShowSexSheet = false"
			@select="okSexSheet"
		/>
		<up-picker
			:show="isShowPicker"
			:columns="pickerOptions"
			title="请选择哈"
			:defaultIndex="[formData.ffIndex]"
			keyName="label"
			@confirm="okPicker"
			@cancel="isShowPicker = false"
		/>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { radioOptions, sheetOptions, pickerOptions } from './const';
import { getLabelByValue, getIndexByValue } from '/dicts';

const formData = ref({
	aa: null,
	bb: null,
	cc: null,
	dd: '',
	eeLabel: null,
	ee: null,
	ffLabel: null,
	ffIndex: 1,
	ff: null,
	gg: Date.now(),
	zz: false,
});
const isShowSexSheet = ref(false);
const isShowPicker = ref(false);

// ok-性别sheet
const okSexSheet = (e) => {
	formData.value.eeLabel = e.name;
	formData.value.ee = e.value;
	isShowSexSheet.value = false;
};
// ok-picker
const okPicker = (e) => {
	formData.value.ffLabel = e.value[0].label;
	formData.value.ff = e.value[0].value;
	isShowPicker.value = false;
};
// change-同意协议
const changeAgree = () => {
	formData.value.zz = !formData.value.zz;
};
// 长按提示
const fn1 = (e) => {
	console.log(11, e);
};
// 回显
const echoFormData = () => {
	let data = {
		aa: '张三',
		bb: 1,
		cc: [3],
		dd: '一些描述详情的内容',
		ee: 2,
		ff: 2,
		zz: true,
	};
	data.eeLabel = getLabelByValue(sheetOptions, data.ee, 'name');
	data.ffLabel = getLabelByValue(pickerOptions[0], data.ff);
	data.ffIndex = getIndexByValue(pickerOptions[0], data.ff);
	formData.value = data;
};
// 提交
const submit = () => {
	let data = formData.value;
	console.log('数据', data);
};
</script>

<style lang="scss" scoped>
.box {
	.box-textareaWrap {
		:deep(.u-form-item__body__left__content) {
			top: -52rpx;
			left: 0;
		}
	}
	.box-agree {
		:deep(.u-checkbox__icon-wrap) {
			position: relative;
			top: -18rpx;
		}
	}
}
</style>

<template>
    <view>
        <picker mode="multiSelector" :range="list" range-key="text" :value="indexList" @columnchange="changeColumn">
            <view>
                {{ list?.[0]?.[indexList[0]]?.text }} {{ list[1]?.[indexList[1]]?.text }}
                {{ list?.[2]?.[indexList[2]]?.text }}
            </view>
        </picker>
    </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { data } from './const.js';

const list = ref([]);
const indexList = ref([0, 0, 0]);
const provinceId = ref('340000');
const cityId = ref('341000');
const areaId = ref('341003');

// 获取省市区索引
const getProvinceCityAreaIndex = (indexList = []) => {
	let _index = 0;
	let list = data;
	let id = provinceId.value;
	if(indexList.length == 1){
		list = data[indexList[0]].children;
		id = cityId.value;
	}else if(indexList.length == 2){
		list = data[indexList[0]].children[indexList[1]].children;
		id = areaId.value;
	}
	list.map((item, index) => {
	    if (id == item.value) {
	        _index = index;
	        return;
	    }
	});
	return _index;
};
// 获取初始化省市区列表
const getInitAreaList = async () => {
    if (provinceId.value) {
		// 回显数据
		const provinceIndex = getProvinceCityAreaIndex();	// 省索引
		const cityIndex = getProvinceCityAreaIndex([provinceIndex]);	// 市索引
		const areaIndex = getProvinceCityAreaIndex([provinceIndex, cityIndex]);	// 区索引
		list.value[0] = data.map(({ text, value }) => ({ text, value })); // 省列表
		list.value[1] = data[provinceIndex].children; // 市列表
		list.value[2] = data[provinceIndex].children[cityIndex].children;	// 区列表
		indexList.value = [provinceIndex, cityIndex, areaIndex];	// 设置索引
    } else {
		// 初始状态
        list.value[0] = data.map(({ text, value }) => ({ text, value })); // 省列表
        list.value[1] = data[0].children; // 第一个省下面的市列表
        list.value[2] = data[0].children[0].children; // 第一个省下面的第一个市下面的区列表
    }
};

// change-某列
const changeColumn = (e) => {
    const { column, value } = e.detail; // column-列索引 value-选中的列表索引
    indexList.value[column] = value;
    switch (column) {
        // 拖动第1列
        case 0:
            // 根据第1列选中的值,分别给第2列,第3列赋数据
            list.value[1] = data[value].children;
            list.value[2] = data[value].children[0].children;
            // 第2列,第3列 默认回到第一个
            indexList.value[1] = 0;
            indexList.value[2] = 0;
            break;
        // 拖动第2列
        case 1:
            // 第2列选中的值
            // 根据第2列选中的值，给第三列赋数据
            list.value[2] = data[indexList.value[0]].children[value].children;
            // 第三列 默认回到第一个
            indexList.value[2] = 0;
            break;
    }
};

onMounted(() => {
    getInitAreaList();
});
</script>

<style></style>

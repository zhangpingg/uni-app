<template>
    <view>
        <up-button @click="show = true">打开</up-button>
        <view>
            <text v-for="(item, index) in selectList" :kye="index">{{ item.text }} &nbsp;</text>
        </view>
        <up-picker
            ref="uPickerRef"
            :show="show"
            :columns="list"
            :defaultIndex="indexList"
            keyName="text"
            @change="changeColumn"
            @confirm="confirm"
            @cancel="cancel"
        ></up-picker>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { data } from './const.js';

const show = ref(false);
const uPickerRef = ref(null);
const list = ref([]);
const indexList = ref([0, 0, 0]);
const selectList = ref([]);
const provinceId = ref('340000');
const cityId = ref('341000');
const areaId = ref('341003');

// 获取省市区索引
const getProvinceCityAreaIndex = (indexList = []) => {
    let _index = 0;
    let _item = {};
    let list = data;
    let id = provinceId.value;
    if (indexList.length == 1) {
        list = data[indexList[0]]?.children;
        id = cityId.value;
    } else if (indexList.length == 2) {
        list = data[indexList[0]]?.children[indexList[1]]?.children;
        id = areaId.value;
    }
    list.map((item, index) => {
        if (id == item.value) {
            _index = index;
            _item = item;
            return;
        }
    });
    return { index: _index, item: _item };
};
// 获取初始化省市区列表
const getInitAreaList = async () => {
    if (provinceId.value) {
        // 回显数据
        const provinceIndexItem = getProvinceCityAreaIndex(); // 省 index, item
        const cityIndexItem = getProvinceCityAreaIndex([provinceIndexItem.index]); // 市 index, item
        const areaIndexItem = getProvinceCityAreaIndex([provinceIndexItem.index, cityIndexItem.index]); // 区 index, item
        const provinceIndex = provinceIndexItem.index; // 省索引
        const cityIndex = cityIndexItem.index; // 市索引
        const areaIndex = areaIndexItem.index; // 区索引
        list.value[0] = data.map(({ text, value }) => ({ text, value })); // 省列表
        list.value[1] = data[provinceIndex].children; // 市列表
        list.value[2] = data[provinceIndex].children[cityIndex].children; // 区列表
        indexList.value = [provinceIndex, cityIndex, areaIndex]; // 设置索引
        selectList.value.push(provinceIndexItem.item, cityIndexItem.item, areaIndexItem.item);
    } else {
        // 初始状态
        list.value[0] = data.map(({ text, value }) => ({ text, value })); // 省列表
        list.value[1] = data[0]?.children; // 第一个省下面的市列表
        list.value[2] = data[0]?.children[0]?.children; // 第一个省下面的第一个市下面的区列表
    }
};
// change-某列
const changeColumn = (e) => {
    const { columnIndex, index } = e; // column-列索引 value-选中的列表索引
    indexList.value[columnIndex] = index;
    switch (columnIndex) {
        // 拖动第1列
        case 0:
            // 根据第1列选中的值,分别给第2列,第3列赋数据
            uPickerRef.value.setColumnValues(1, data[index]?.children);
            uPickerRef.value.setColumnValues(2, data[index]?.children[0]?.children);
            // 第2列,第3列 默认回到第一个
            indexList.value[1] = 0;
            indexList.value[2] = 0;
            break;
        // 拖动第2列
        case 1:
            // 第2列选中的值
            // 根据第2列选中的值，给第三列赋数据
            uPickerRef.value.setColumnValues(2, data[indexList.value[0]]?.children[index]?.children);
            // 第三列 默认回到第一个
            indexList.value[2] = 0;
            break;
    }
};
// 确定
const confirm = (e) => {
    console.log('confirm', e);
    selectList.value = e.value;
    show.value = false;
};
// 取消
const cancel = () => {
    show.value = false;
};

onMounted(() => {
    getInitAreaList();
});
</script>

<template>
    <view class="pl-20">
        <button class="db mt-10" size="mini" @click="getData1">get请求</button>
        <view v-for="item in menuList">
            <view>{{ item.title }}</view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
import { apiAuditList } from '/request/api/qualitySystem.js';

const menuList = ref([]);

// get 请求
const getData1 = async () => {
    let params = {
        current: 1,
        sise: 10,
        status: 1,
    };
    const res = await apiAuditList(params);
    menuList.value = res.list;
};
</script>

<style lang="scss" scoped></style>

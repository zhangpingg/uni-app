<template>
    <view> 页面 </view>
</template>

<script setup>
import { onAddToFavorites } from '@dcloudio/uni-app';

onAddToFavorites(() => {
    return {
        title: '收藏的标题',
        query: 'id=1',
        imageUrl: 'https://img1.baidu.com/it/u=3883615986,1027212215&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=912',
    };
});
</script>

<style lang="scss" scoped></style>

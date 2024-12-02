<template>
    <view>
		<view class="zc-primary-btn">正常按钮</view>
		<view class="zc-primary-btn zc-btn-disabled">置灰按钮</view>
		<view class=" zc-text-btn">文字按钮</view>
        <view :class="['zc-bottom-placed', systemStore.isIpFooterBar ? 'safe-area' : '']">
            <view class="zc-primary-btn">底部按钮</view>
        </view>
    </view>
</template>

<script setup>
import { useSystemStore } from '/store/index';

const systemStore = useSystemStore();
</script>

<style lang="scss" scoped></style>

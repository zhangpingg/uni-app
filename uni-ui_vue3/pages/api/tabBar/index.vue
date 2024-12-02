<template>
	<view class="tb pl-20 mt-20">
		<text class="tb-btn" @click="setTabbarContent">设置tabbar内容</text>
		<text class="tb-btn" @click="setTabbarStyle">设置tabbar样式</text>
		<text class="tb-btn" @click="hideTabbar">隐藏tabbar</text>
		<text class="tb-btn" @click="showTabbar">显示tabbar</text>
		<text class="tb-btn" @click="addBadge">添加标记</text>
		<text class="tb-btn" @click="removeBadge">移除标记</text>
		<text class="tb-btn" @click="addRedDot">添加红点</text>
		<text class="tb-btn" @click="removeRedDot">移除红点</text>
	</view>
</template>

<script setup>
// 设置-tabbar的内容
const setTabbarContent = () => {
	uni.setTabBarItem({
		index: 2,
		text: '新文案',
	});
};
// 设置-tabbar的样式
const setTabbarStyle = () => {
	uni.setTabBarStyle({
		selectedColor: '#0f0',
	});
};
// 隐藏-tabbar
const hideTabbar = () => {
	uni.hideTabBar();
};
// 显示-tabbar
const showTabbar = () => {
	uni.showTabBar();
};
// 添加-标记
const addBadge = () => {
	uni.setTabBarBadge({
		index: 2,
		text: '6',
	});
};
// 移除-标记
const removeBadge = () => {
	uni.removeTabBarBadge({
		index: 2,
	});
};
// 添加-红点
const addRedDot = () => {
	uni.showTabBarRedDot({
		index: 2,
	});
};
// 移除-红点
const removeRedDot = () => {
	uni.hideTabBarRedDot({
		index: 2,
	});
};
</script>

<style lang="scss" scoped>
.tb {
	.tb-btn {
		display: block;
		margin-top: 10rpx;
	}
}
</style>

<template>
	<view class="i">
		<image class="i-logo" src="/static/logo.png"></image> <br>
		<text @click="jumpGeneral('/pages/test/test')">测试</text> <br>
		<text @click="jumpTab('/pages/scrollList/index')">无线滚动列表</text> <br>
		<text @click="jumpTab('/pages/tabBar/index')">tabBar Api</text> <br>
		<text @click="jumpGeneral('/pages/implantH5/index')">小程序嵌入H5页面</text><br>
		<text @click="jumpGeneral('/pages/dataApi/index')">调用接口</text><br>
		<text @click="jumpGeneral('/pages/navigationBar/index')">导航条相关设置</text><br>
	</view>
</template>

<script setup>
	const jumpGeneral = (url) => {
		uni.navigateTo({
			url,
		})
	}
	const jumpTab = (url) => {
		uni.switchTab({
			url,
		})
	}
	
	onLoad(() => {
		const app = getApp()
		console.log('全局数据:', app.globalData)
	})
</script>

<style scoped lang='less'>
	.i {
		.i-logo {
			height: 200rpx;
			width: 200rpx;
		}
	}
</style>
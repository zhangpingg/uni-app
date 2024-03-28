<template>
	<view>
		<text @click='setNavigationBarTitle'>设置标题</text> <br>
	</view>
</template>

<script setup>
	const setNavigationBarTitle = () => {
		uni.setNavigationBarTitle({
			title: '标题-新名称',
		});
	}
</script>

<style scoped lang="less"></style>
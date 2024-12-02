<template>
	<view class="box">
		<button size="mini" @click="fn1">按钮</button><br />
		<div>pinia数据: {{ userStore.count }}</div>
	</view>
</template>

<script setup>
	import { useUserStore } from '/store/index.js';

	const userStore = useUserStore();

	const fn1 = () => {
		userStore.increment();
	};
</script>

<style lang="scss" scoped></style>
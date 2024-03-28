<template>
	<view>
		<text @click='getData1'>get请求</text> <br>
		<text @click='getData2'>post请求</text> <br>
	</view>
</template>

<script setup>
	import {
		GetTireMenu,
		GetTireList
	} from '/api/user.js'

	// get 请求
	const getData1 = async () => {
		const res = await GetTireMenu();
		console.log(11, res)
	}
	// post 请求
	const getData2 = async () => {
		const params = { current: 1, size: 20, selectedTireList: [] }
		const res = await GetTireList(params);
		console.log(12, res)
	}
</script>

<style scoped lang="less"></style>
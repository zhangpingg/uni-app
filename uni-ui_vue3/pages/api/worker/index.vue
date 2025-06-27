<template>
	<view> wx：worker 多线程</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { onBeforeUnmount } from 'vue';

let worker = null;

onLoad(() => {
	if(worker){
		worker.terminate();
	}
	worker = wx.createWorker('static/workers/demoOne.js');
	worker.postMessage('数据1: 主线程=>worker线程'); 		// 发送数据
	worker.onMessage(function (res) {					// 接收数据
		console.log(res); // 数据: worker线程=>主线程
	});
});
onBeforeUnmount(() => {
	if(worker){
		worker.terminate();
	}
});
</script>

<style></style>

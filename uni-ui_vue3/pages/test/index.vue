<template>
    <view>
        <view>test</view>
        <button @click="fn1">返回APP</button>
    </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';

// 向宿主App发送事件
const fn1 = () => {
    uni.sendNativeEvent('unimp-event', {
    	msg: 'unimp message!!!'
    }, (ret) => {
    	console.log('宿主App回传的数据：' + ret);
    });
};

onLoad((option) => {
	// 方式1：接口地址栏数据
    console.log('option', option);
	// 方式2：接收一些大数据，异步数据等
	uni.onNativeEventReceive((event, data)=>{
		console.log('接收到宿主App消息：' + event + data);
	});
});
</script>

<style lang="scss" scoped></style>

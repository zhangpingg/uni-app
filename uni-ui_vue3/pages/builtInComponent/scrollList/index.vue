<template>
	<view class="sl">
		<view class="ml-10 mt-20 mb-20">下拉刷新、上拉加载更多</view>
		<view class="sl-main">
			<view v-for="(item, index) in list" :key="index" class="sl-main-item"> list-{{ index }} </view>
			<uni-load-more :status="status" />
		</view>
	</view>
</template>

<script setup>
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { ref } from 'vue';

const list = ref([]);
const status = ref('more');

// 初始化列表数据
const initData = () => {
	setTimeout(() => {
		let _list = [];
		for (var i = 0; i < 20; i++) {
			_list.push(i);
		}
		list.value = _list;
		status.value = 'more';
		uni.stopPullDownRefresh();
	}, 100);
};

onLoad(() => {
	initData();
});
// 监听-用户下拉动作，下拉刷新
onPullDownRefresh(() => {
	initData();
});
// 监听-页面滚动到底部的事件,加载下一页数据
onReachBottom(() => {
	if (list.value.length > 50) {
		status.value = 'no-more';
		return;
	}
	status.value = 'loading';
	let _list = [];
	for (var i = 0; i < 20; i++) {
		_list.push(i);
	}
	setTimeout(() => {
		list.value = [...list.value, ..._list];
		status.value = 'more';
	}, 2000);
});
</script>

<style lang="scss" scoped>
.sl {
	background-color: #f1f1f1;

	.sl-main {
		padding: 0 10px;

		.sl-main-item {
			margin: 16rpx 0;
			width: 100%;
			background-color: #fff;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			color: #555;
			border-radius: 8rpx;
		}

		.sl-main-loadmore {
			height: 100rpx;
			text-align: center;
		}
	}
}
</style>

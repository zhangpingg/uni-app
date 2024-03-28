<template>
	<view class="box">
		<text>下拉刷新、上拉加载更多</text>
		<view class="uni-padding-wrap uni-common-mt">
			<view v-for="(item, index) in list" :key="index" class="box-item">
				list-{{index}}
			</view>
			<view class="box-loadmore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script setup>
	const initList = [{
			title: '原数据'
		},
		{
			title: '原数据'
		},
		{
			title: '原数据'
		},
		{
			title: '原数据'
		},
		{
			title: '原数据'
		},
		{
			title: '原数据'
		},
	]
	const list = ref(initList)
	const loadMoreText = ref('加载中...')

	// 初始化列表数据
	const initData = () => {
		setTimeout(() => {
			let _list = [];
			for (var i = 0; i < 20; i++) {
				_list.push(i)
			}
			list.value = _list;
			loadMoreText.value = "加载中..."
			uni.stopPullDownRefresh();
		}, 100);
	}

	onLoad(() => {
		initData();
	})
	// 监听-用户下拉动作，下拉刷新
	onPullDownRefresh(() => {
		initData();
	})
	// 监听-页面滚动到底部的事件,加载下一页数据
	onReachBottom(() => {
		if (list.value.length > 50) {
			loadMoreText.value = "没有更多数据了!"
			return;
		}
		let _list = [];
		for (var i = 0; i < 20; i++) {
			_list.push(i)
		}
		setTimeout(() => {
			list.value = [...list.value, ..._list];
		}, 300);
	})
</script>

<style scoped lang="less">
	.box {
		border: 1px solid #000;
		.box-item {
			margin: 16rpx 0;
			width:100%;
			background-color: #f1f1f1;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			color: #555;
			border-radius: 8rpx;
		}
		.box-loadmore{
			height: 100rpx;
			text-align: center;
		}
	}
</style>
<template>
	<view class="box">
		<text>下拉刷新、上拉加载更多</text>
		<view>
			<view v-for="(item, index) in list" :key="index" class="item">
				{{`${item.title} ${index}`}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
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
			}
		},
		// 监听-用户下拉动作，下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
				console.log('下拉刷新')
			}, 2000)
		},
		// 监听-页面滚动到底部的事件,加载下一页数据
		onReachBottom() {
			console.log('上拉加载更多');
			let _list = [{
					title: '追加的新数据'
				},
				{
					title: '追加的新数据'
				},
				{
					title: '追加的新数据'
				},
				{
					title: '追加的新数据'
				},
				{
					title: '追加的新数据'
				},
			]
			this.list = [...this.list, ..._list];
		},
		// 监听-页面滚动（可以实时取到滚动距离）
		onPageScroll(e) {
			console.log('onPageScroll: ', e); // {scrollTop: 66}
		},
	}
</script>

<style lang="less">
	.box {
		border: 1rpx solid #f00;
		width: 750rpx;
		box-sizing: border-box;

		.item {
			height: 300rpx;
		}
	}
</style>
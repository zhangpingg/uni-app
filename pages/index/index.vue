<template>
	<view class="box">
		<text @click="jumpTabbarPage('/pages/list/list')">【下拉刷新、上拉加载更多】</text> <br>
		<text @click="jumpTabbarPage('/pages/tabBar/tabBar')">【底部 tabbar API】</text> <br>
		<text @click="jumpGeneralPage('/pages/pageLifeCycle/pageLifeCycle?id=1')">
			【(页面)生命周期】
		</text> <br>
		<text @click="jumpGeneralPage('/pages/containerComponent/view')">【view 组件】</text> <br>
		<text @click="jumpGeneralPage('/pages/test/test')">【test】</text> <br>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {
			const app = getApp()
			console.log('index-app: ', app)
			console.log('index-app.globalData: ', app.globalData); // 全局数据
		},
		methods: {
			// 跳转-tabbar页面
			jumpTabbarPage(url) {
				uni.switchTab({
					url: url
				})
			},
			// 跳转-普通的页面
			jumpGeneralPage(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style lang="less">

</style>
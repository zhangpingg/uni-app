<template>
	<view>
		(页面)生命周期 + (组件)生命周期(没写) <br>
		详见：控制台
		<!-- <text @click="jumpIndex">【跳转-首页】</text>
		<text @click="jumpTest">【跳转-测试】</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		// 监听-页面加载
		// 1) 响应式数据、计算属性、方法、侦听器、props、slots 已设置完成
		// 2) 其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
		// 3) 页面dom不存在，但可以修改data
		// 4) 作用：接受上页的参数，调接口-联网取数据，更新data
		onLoad(props){
			console.log('onLoad: ', props); // {id:1}
		},
		// 监听-页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用
		onReady(){
			console.log('onReady');
		},
		// 监听-页面显示
		onShow(){
			console.log('onShow: 页面显示');
		},
		// 监听-页面隐藏（跳转到非tabbar页面触发）
		onHide(){
			console.log('onHide: 页面隐藏');
		},
		// 监听-页面卸载（跳转到tabbar页面触发）
		onUnload(){
			console.log('onUnload: 页面卸载');
		},
		// 监听-窗口尺寸变化（没启作用）
		onResize(){
			console.log('onResize: 窗口尺寸变化');
		},
		// 监听-用户下拉动作，下拉刷新（详见list页面）
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
				console.log('下拉刷新')
			}, 2000)
		},
		// 监听-页面滚动到底部的事件,加载下一页数据（详见list页面）
		onReachBottom() {
			console.log('上拉加载更多');
			let _list = []
			this.list = [...this.list, ..._list];
		},
		// 监听-点击tab时触发
		onTabItemTap(e){
			console.log('onTabItemTap: ', e); // {"index":0, "text":"首页", "pagePath":"pages/index/index"}
		},
		// 监听-用户点击右上角分享（待定）
		onShareAppMessage(){
			console.log(11)
		},
		// 监听-原生标题栏按钮点击事件（待定）
		onNavigationBarButtonTap(e){
			console.log('onNavigationBarButtonTap', e);
		},
		// 监听-本页面返回上一页，返回 event={from:backbutton | navigateBack},
		// backbutton: 左上角返回按钮,android返回键， navigateBack: uni.navigateBack
		onBackPress(e){
			console.log('返回类型', e); // {from: 'backbutton' | 'navigateBack'} 
		},
		// 监听-原生标题栏搜索输入框输入内容变化事件（待定）
		onNavigationBarSearchInputChanged(){},
		// 监听-原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发（待定）
		onNavigationBarSearchInputConfirmed(){},
		// 监听-原生标题栏搜索输入框点击事件（pages.json 中的 searchInput 配置 disabled 为 true 时才会触发）（待定）
		onNavigationBarSearchInputClicked(){},
		// 监听-用户点击右上角转发到朋友圈（待定）
		onShareTimeline(){},
		// 监听-用户点击右上角收藏（待定）
		onAddToFavorites(){
			console.log(11)
		},
		methods: {
			// 跳转-首页
			jumpIndex(){
				uni.switchTab({url:'/pages/index/index'})
			},
			// 跳转-测试
			jumpTest(){
				uni.navigateTo({
					url: '/pages/test/test'
				})
			},
		}
	}
</script>

<style lang="less">
	
</style>

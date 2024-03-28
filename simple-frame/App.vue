<!-- 
应用入口文件
作用：监听"应用生命周期"、配置全局样式、配置全局的存储globalData 
-->

<script>
	export default {
		globalData: {
			aa: '全局数据-aa',
		},
		// 初始化完成时触发（全局只触发一次），参数为应用启动参数
		onLaunch(props) {
			console.log('App-onLaunch-应用启动参数:', props);
			console.log('App-onLaunch-应用启动参数: ', uni.getLaunchOptionsSync())
		},
		// 当 uni-app 启动，或从后台进入前台显示，参数为应用启动参数
		onShow(props) {
			console.log('App-onShow-应用启动参数:', props)
		},
		onHide() {
			console.log('App-onHide: 从前台进入后台')
		},
		// 当 uni-app 报错时触发
		onError() {
			console.log('App-onError: 报错了')
		},
		// 页面不存在监听函数
		onPageNotFound() {
			console.log('App-onPageNotFound: 页面不存在')
		},
		// 监听-系统主题变化
		onThemeChange() {},
		// 最后一个页面按下Android back键，常用于自定义退出
		onLastPageBackPress() {},
		// 监听-应用退出
		onExit() {},
	}
</script>

<style>
	/*每个页面公共css */
</style>
<template>
	<view>
		test
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			const page = getCurrentPages()
			console.log(11, page)
			// console.log(22, page.$getAppWebview)
			console.log(33, page.route)
			// app.doSomething() // 调用 App.vue methods 中的 doSomething 方法
		},
		methods: {

		}
	}
</script>

<style>

</style>
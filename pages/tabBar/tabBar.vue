<template>
	<view>
		<text @click="setTabbarContent">设置tabbar内容</text> <br>
		<text @click="setTabbarStyle">设置tabbar样式</text> <br>
		<text @click="hideTabbar">隐藏tabbar</text> <br>
		<text @click="showTabbar">隐藏tabbar</text> <br>
		<text @click="addBadge">添加标记</text> <br>
		<text @click="removeBadge">移除标记</text> <br>
		<text @click="addRedDot">添加红点</text> <br>
		<text @click="removeRedDot">移除红点</text> <br>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 设置-tabbar的内容
			setTabbarContent(){
				uni.setTabBarItem({
					index: 2,
					text: '新文案'
				})
			},
			// 设置-tabbar的样式
			setTabbarStyle(){
				uni.setTabBarStyle({
					selectedColor: '#0f0'
				})
			},
			// 隐藏-tabbar
			hideTabbar(){
				uni.hideTabBar();
			},
			// 显示-tabbar
			showTabbar(){
				uni.showTabBar();
			},
			// 添加-标记
			addBadge(){
				uni.setTabBarBadge({index:2, text:'6'});
			},
			// 移除-标记
			removeBadge(){
				uni.removeTabBarBadge({index:2});
			},
			// 添加-红点
			addRedDot(){
				uni.showTabBarRedDot({index:2});
			},
			// 移除-红点
			removeRedDot(){
				uni.hideTabBarRedDot({index:2});
			}
		}
	}
</script>

<style>

</style>

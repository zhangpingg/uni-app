<!-- 
应用入口文件
作用：监听"应用生命周期"、配置全局样式、配置全局的存储globalData 
-->

<script setup>
import {
    onLaunch,
    onShow,
    onHide,
    onError,
    onPageNotFound,
    onThemeChange,
    // onLastPageBackPress,
    onExit,
} from '@dcloudio/uni-app';
import { useSystemStore } from '/store/index';

const systemStore = useSystemStore();

// 初始化完成时触发（全局只触发一次），参数为应用启动参数
onLaunch((props) => {
    console.log('App-onLaunch-应用启动参数:', props);
    console.log('App-onLaunch-应用启动参数: ', uni.getLaunchOptionsSync());
	systemStore.getSystemInfo();
});
// 当 uni-app 启动，或从后台进入前台显示，参数为应用启动参数
onShow((props) => {
    console.log('App-onShow-应用启动参数:', props);
});
onHide(() => {
    console.log('App-onHide: 从前台进入后台');
});
// 当 uni-app 报错时触发
onError((err) => {
    console.log('App-onError: 报错了',err);
});
// 页面不存在监听函数
onPageNotFound(() => {
    console.log('App-onPageNotFound: 页面不存在');
});
// 监听-系统主题变化
onThemeChange(() => {});
// 最后一个页面按下Android back键，常用于自定义退出
// onLastPageBackPress(() => {});
// 监听-应用退出
onExit(() => {});
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
@import '@/uni_modules/uview-plus/index.scss';
@import '/styles/index.scss';
// 设置整个项目的背景色
page {
    background-color: #f5f5f5;
}
/* #endif */
</style>

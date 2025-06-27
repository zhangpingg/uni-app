<template>
    <view class="h">
        <view class="tac">
            <image class="h-logo mb-20 mt-20" src="/static/logo.png"></image>
        </view>
        <view class="pl-20">
            <text class="h-link" @click="jumpGeneral('/pages/test/index')">test</text>

            <text class="h-link" @click="jumpGeneral('/pages/builtInComponent/scrollList/index')">
                内置组件-无线滚动列表
            </text>
            <text class="h-link" @click="jumpGeneral('/pages/builtInComponent/implantH5/index')">
                内置组件-小程序内嵌H5页面
            </text>
            <text class="h-link" @click="jumpGeneral('/pages/builtInComponent/phoneLogin/index')">
                内置组件-手机号登录
            </text>
			<text class="h-link" @click="jumpGeneral('/pages/builtInComponent/picker/index')">
			    内置组件-picker
			</text>
            <text class="h-link" @click="jumpGeneral('/pages/uniUI/uniForms/index')">uni ui — 表单</text>
            <text class="h-link" @click="jumpGeneral('/pages/uniUI/uniDataPicker/index')"> uni ui — 级联选择器 </text>
            <text class="h-link" @click="jumpGeneral('/pages/uniUI/uploadImg/index')"> uni ui — 上传图片 </text>
            <text class="h-link" @click="jumpTab('/pages/api/tabBar/index')">Api-tabBar 设置</text>
            <text class="h-link" @click="jumpGeneral('/pages/api/uploadImg/index')">Api-上传图片</text>
            <text class="h-link" @click="jumpGeneral('/pages/api/worker/index')">Api-worker多线程</text>
            <text class="h-link" @click="jumpGeneral('/pages/uviewPlus/upPicker/index')">uview-plus up-picker（级联）</text>
            <text class="h-link" @click="jumpGeneral('/pages/uviewPlus/upForm/index')">uview-plus up-form（表单）</text>
            <text class="h-link" @click="jumpGeneral('/packageA/test1/index')">分包A-页面1</text>
            <text class="h-link" @click="jumpGeneral('/packageA/test2/index')">分包A-页面2</text>
            <text class="h-link" @click="jumpGeneral('/pages/dataApi/index')">接口调用</text>
            <text class="h-link" @click="jumpGeneral('/pages/pinia/index')">pinia（持久化）</text>
            <text class="h-link" @click="jumpGeneral('/pages/btn/index')">业务-按钮</text>
        </view>
    </view>
</template>

<script setup>
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';

// 跳转普通页面
const jumpGeneral = (url) => {
    uni.navigateTo({
        url,
    });
};
// 跳转tab页面
const jumpTab = (url) => {
    uni.switchTab({
        url,
    });
};

onLoad(() => {
	
});
// 监听-用户下拉动作，下拉刷新
onPullDownRefresh(() => {
    setTimeout(() => {
        uni.stopPullDownRefresh();
    }, 2000);
});

</script>

<style lang="scss" scoped>
.h {
    .h-logo {
        height: 200rpx;
        width: 200rpx;
    }

    .h-link {
        display: block;
        margin-top: 10rpx;
    }
}
</style>

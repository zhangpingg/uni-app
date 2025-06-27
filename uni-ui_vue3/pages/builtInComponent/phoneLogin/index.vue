<template>
    <view class="pl">
        <view class="pl-login por mb-20" @click="bindNow">
            按钮-立即绑定(手机号登录)
            <PhoneLoginButton @onSuccess="loginSuccess" />
        </view>
        <view @click="getUserInfo">按钮-获取用户信息</view>
        <view class="mt-50">
            用户信息：
            <view>
                <view>phone:{{ userStore.userInfo?.accountInfo?.phone }}</view>
                <view>authorizationToken:{{ userInfo.authorizationToken }}</view>
            </view>
        </view>
    </view>
</template>

<script setup>
// import { onShow } from '@dcloudio/uni-app';
import { toRefs } from 'vue';
import { useUserStore } from '/store/index';
import { apiAccountInfo } from '/request/api/account';
import PhoneLoginButton from '/components/phoneLoginButton';

const userStore = useUserStore();
const { userInfo } = toRefs(userStore);

// 立即绑定
const bindNow = async () => {
    if (userInfo.value?.authorizationToken) {
        try {
			console.log('调接口');
            // const res = await apiBindGiftCard({ secretKey: secretKey.value });
            // uni.navigateTo({ url: '/packageA/bindGiftCard/bindSuccess' });
        } catch (e) {
			console.log('调接口失败了');
            // uni.navigateTo({ url: '/packageA/bindGiftCard/bindFail' });
        }
    }
};
// 手机号登录成功
const loginSuccess = () => {
    console.log('手机号登录成功');
    bindNow();
};
// 获取用户信息
const getUserInfo = async () => {
    const res = await apiAccountInfo({ id: 1 });
    console.log('用户信息：', res);
};
</script>

<style lang="scss" scoped></style>

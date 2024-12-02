<template>
    <button class="plbBtn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber"></button>
</template>

<script setup>
import { dispatchPhoneLogin } from '/libs/util.request';
import { useUserStore } from '/store/index';

defineOptions({
    options: { virtualHost: true },
});
const userStore = useUserStore();
const emit = defineEmits(['@onSuccess']);

const onGetPhoneNumber = async (e) => {
    if (e.detail) {
        const { code, errMsg } = e.detail;
        if (errMsg === 'getPhoneNumber:ok') {
            const res = await dispatchPhoneLogin({ phoneCode: code });
            userStore.setUserInfo(res);
            uni.showToast({
                title: '登录成功',
                icon: 'success',
            });
            emit('@onSuccess');
        } else {
            uni.showToast({
                title: '登录失败，请重试',
                icon: 'none',
            });
        }
    } else {
        uni.showToast({
            title: '获取手机号失败，请重试',
            icon: 'none',
        });
    }
};
</script>

<style lang="scss" scoped>
.plbBtn {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: 0;
}
</style>

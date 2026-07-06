<template>
    <view>
        <!-- 获取头像 -->
        <view class="mb-50">
            微信头像：
            <image :src="avatarUrl" class="head"></image>
            <button type="primary" size="mini" open-type="chooseAvatar" @chooseavatar="getAvatarUrl">
                手动-获取头像
            </button>
        </view>

        <!-- 获取昵称 -->
        <view class="mb-50">
            微信昵称：
            <input type="nickname" v-model="nickName" placeholder="请输入昵称" style="display: inline-block" />
        </view>

        <button size="mini" @click="save">保存</button>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const avatarUrl = ref('');
const nickName = ref('');

// 获取头像
const getAvatarUrl = (e) => {
    const url = e.detail.avatarUrl;
    if (typeof url === 'string' && url) {
        avatarUrl.value = url;
    }
};
// 保存
const save = () => {
    console.log('头像:', avatarUrl.value);
    console.log('昵称:', nickName.value);
    // 在这里调接口提交头像和昵称
};
</script>

<style lang="scss" scoped>
.head {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}
</style>

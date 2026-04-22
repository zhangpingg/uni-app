<template>
    <view>
        <button size="mini" @click="getLocationAuthorize">获取地理位置</button>
    </view>
</template>

<script setup>

// 获取位置权限
const getLocationAuthorize = () => {
    uni.getSetting({
        success(res) {
            const authStatus = res.authSetting['scope.userLocation'];
            console.log('当前定位权限状态:', authStatus);
            if (authStatus === true) {
                // 情况1：已授权 -> 直接获取位置
                getLocationData();
            } else if (authStatus === false) {
                // 情况2：已拒绝 -> 引导去设置页
                uni.showModal({
                    title: '提示',
                    content: '您已拒绝位置权限，需要去设置中重新开启才能使用此功能',
                    success: (modalRes) => {
                        if (modalRes.confirm) {
                            uni.openSetting({
                                success: (settingRes) => {
                                    if (settingRes.authSetting['scope.userLocation']) {
                                        // 用户在设置页开启了权限
                                        getLocationData();
                                    } else {
                                        uni.showToast({ title: '未开启权限', icon: 'none' });
                                    }
                                },
                            });
                        }
                    },
                });
            } else {
                // 情况3：undefined (从未询问，第一次) -> 直接调用或发起授权
                // 方式1 (推荐)：直接调用业务接口，微信会自动弹窗询问，用户体验更好
				getLocationData();
                // 方式2：如果非要先 authorize 也可以，但要注意 authorize 在部分新版基础库中可能受限
                // uni.authorize({
                //     scope: 'scope.userLocation',
                //     success: () => {
                //         getLocationData();
                //     },
                //     fail: () => {
                //         // 用户点击了“不允许”
                //         uni.showToast({ title: '授权取消', icon: 'none' });
                //     },
                // });
            }
        },
        fail: (err) => {
            console.error('获取设置失败', err);
        },
    });
};
// 获取位置数据
const getLocationData = () => {
    uni.getLocation({
        type: 'gcj02',
        success: function (res) {
            console.log('地理位置数据', res);
        },
        fail: function (err) {
            console.log('获取位置失败', err);
        },
    });
};


</script>

<style lang="scss" scoped></style>

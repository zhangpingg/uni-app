import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUser = defineStore(
    'system',
    () => {
        const isIpX = ref(false); // ios是否有底部小横条
		// android：Android 平台
		// ios：iOS 平台
		// devtools：开发者工具
		// alipay：支付宝小程序
		// baidu：百度小程序
		// qq： QQ 小程序
		// toutiao：字节跳动小程序（如抖音小程序）
		// weixin：微信小程序
		// swan：百度智能小程序
		// quickapp：快应用
		// web： H5 页面
		// win： Windows 平台
		// mac： macOS 平台
        const phonePlatform = ref('ios'); // 当前运行的平台类型
		

        const getSystem = () => {
            const { safeArea, screenHeight, platform } = uni.getSystemInfoSync();
            isIpX.value = !(safeArea?.bottom === screenHeight);
            phonePlatform.value = platform;
        };

        return { isIpX, phonePlatform, getSystem };
    },
    {
        persist: {
            storage: {
                setItem: (key, value) => uni.setStorageSync(key, value),
                getItem: (key) => uni.getStorageSync(key),
            },
        },
    }
);

export default useUser;

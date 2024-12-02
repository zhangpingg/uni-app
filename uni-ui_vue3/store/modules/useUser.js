import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUser = defineStore(
    'user',
    () => {
        const count = ref(0);
        const userInfo = ref({});

        // 增加数字
        const increment = () => {
            count.value++;
        };
        // 设置用户信息
        const setUserInfo = (data) => {
            userInfo.value = data;
        };

        return { count, increment, userInfo, setUserInfo };
    },
    {
        persist: {
            storage: {
                getItem: (key) => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: (key) => uni.removeStorageSync(key),
            },
        },
    }
);

export default useUser;

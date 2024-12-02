import { apiAccountLogin } from '/request/api/account';

// 手机号登录并保存用户信息
const dispatchPhoneLogin = async (data) => {
    const loginData = await uni.login();
    const userData = await apiAccountLogin({ ...data, jsCode: loginData.code });
    return userData;
};

export { dispatchPhoneLogin };

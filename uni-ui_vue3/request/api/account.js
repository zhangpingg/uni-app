import service from '../service';

// 手机号登录
export const apiAccountLogin = (data) => {
    return service.request({
        url: '/api/kunpeng/gift/account/login/code',
        method: 'post',
        data,
    });
};

// 获取当前用户信息
export const apiAccountInfo = (data) => {
    return service.request({
        url: '/api/kunpeng/gift/account/info',
        method: 'get',
		data,
    });
};

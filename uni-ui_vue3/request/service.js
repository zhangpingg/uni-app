import { domain } from './domain';
import { useUserStore } from '/store/index';

const userStore = useUserStore();

const showToast = (msg, cb) => {
    uni.showToast({
        icon: 'none',
        title: msg,
        duration: 1500,
        success: (res) => {
            setTimeout(() => {
                cb && cb(res);
            }, 1500);
        },
    });
};

// 错误码
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '请求错误。',
    401: '用户没有权限（用户名或密码错误）。',
    403: '拒绝访问。',
    404: '请求地址出错。',
    406: '请求的格式不可得。',
    408: '请求超时。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器内部错误。',
    502: '网关错误。',
    503: '服务不可用。',
    504: '网关超时。',
    505: 'HTTP版本不受支持。',
};

const service = {
    // 请求接口
    request: (params) => {
        const { isLoading = true, loadingText, header, url, redirectPage, ...rest } = params;
        // 是否需要loading（默认有）
        if (isLoading) {
            uni.showLoading({
                title: loadingText || '加载中...',
                mask: true,
            });
        }
        return new Promise((resolve, reject) => {
            uni.request({
                url: domain[domain.env].api + url,
                // uni.request 请求头中 content-type默认application/json
                // application/json 会进行 JSON 序列化 body传参
                // application/x-www-form-urlencoded 会将数据转换为 query string
                header: {
                    'content-type': 'application/json',
                    Authorization: uni.getStorageSync('token'), // 质管：dataApi 调试【2-2】
                    // Authorization: userStore?.userInfo?.authorizationToken,	// 实际项目
                    ...header,
                },
                ...rest,
                success: (res) => {
                    isLoading && uni.hideLoading();
                    const { data, statusCode } = res;
                    if (statusCode !== 200) {
                        const statusMsg = codeMessage[statusCode] || data.message || '请稍后重试~';
                        showToast(statusMsg, () => {
                            reject(data);
                        });
                    }
                    switch (data.code) {
                        case 200:
                            resolve(data.data);
                            break;
                        case 1000:
                            // token失效清空userInfo，返回首页
                            userStore.setUserInfo({});
                            if (redirectPage) {
                                uni.reLaunch({ url: `/pages/${redirectPage || 'home'}/index` });
                            }
                            reject(data);
                            break;
                        default:
                            showToast(data.message, () => {
                                reject(data);
                            });
                            break;
                    }
                },
                fail: (err) => {
                    isLoading && uni.hideLoading();
                    let errMsg = err.message;
                    if (err && err.response) {
                        errMsg = codeMessage[err.response.status];
                    }
                    // 因为有的接口：请求失败了，需要自动刷新页面
                    showToast(errMsg || '请稍后重试~', () => {
                        reject(errMsg || new Error('请稍后重试~'));
                    });
                },
            });
        });
    },
};

export default service;

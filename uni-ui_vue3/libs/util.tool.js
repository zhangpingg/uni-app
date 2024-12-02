import _ from 'lodash';

/**
 * @description 判断-是否是有效的数据
 * @param {any} val 传入的值
 * @returns {boolean} 返回boolean
 */
const isValidVal = (val) => {
    if ([null, undefined, ''].includes(val)) {
        return false;
    }
    return true;
};

/**
 * @description 判断-是否是有效的非空数组
 * @param {any} list 传入的值
 * @returns {boolean} 返回boolean
 */
const isValidArr = (list) => {
    if (_.isArray(list) && !_.isEmpty(list)) {
        return true;
    }
    return false;
};
/**
 * @description 删除对象中value为 null, undefined，'', 空数组的 key
 * @param {Object} data 传入的对象
 * @param {Boolean} isCLearEmptyArray 是否删除空数组
 * @returns {Object} 返回value有值的key对象
 */
// 清空无效的key
const clearInvalidKey = (data, isCLearEmptyArray = true) => {
    let _data = { ...data };
    for (let key in _data) {
        if (
            _data[key] === '' ||
            _data[key] === null ||
            _data[key] === 'null' ||
            _data[key] === undefined ||
            _data[key] === 'undefined'
        ) {
            delete _data[key];
        }
        if (isCLearEmptyArray && _.isArray(data[key]) && _.isEmpty(data[key])) {
            delete _data[key];
        }
    }
    return _data;
};

/**
 * @description 拼接url参数
 * @param {object} params 参数对象
 * @param {boolean} isEncode 是否编码
 * @returns {object} 编码后的参数对象
 */
const jointUrlParams = (params, isEncode) => {
    return Object.keys(params)
        .map((key) => `${key}=${isEncode ? encodeURIComponent(JSON.stringify(params[key])) : params[key]}`)
        .join('&');
};

/**
 * @description 解析url参数
 * @param {object} params 编码后的参数对象
 * @param {boolean} isDecode 是否解码
 * @returns {object} 解码后的参数对象
 */
const analysisUrlParams = (params, isDecode) => {
    let _params = { ...params };
    Object.keys(_params).map((item) => {
        _params[item] = isDecode ? JSON.parse(decodeURIComponent(_params[item])) : _params[item];
    });
    return _params;
};

/**
 * @description 获取url的域名
 * @param {string} url 地址
 * @returns {string} 返回域名
 */
const getUrlDomain = (url) => {
    const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
};

/**
 * 获取url的query参数
 * @param {string} url 地址
 * @returns {object} url的参数对象
 */
const getUrlQuery = (url) => {
    if (url.indexOf('?') < 0) {
        return;
    }
    return formatData(joinParam(url));

    function joinParam(url) {
        const _obj = {};
        url.split('?')[1]
            .split('&')
            .forEach((item) => {
                let _key = item.split('=')[0];
                let _val = item.split('=')[1];
                if (_obj[_key]) {
                    _obj[_key].push(decodeURI(_val));
                } else {
                    _obj[_key] = [decodeURI(_val)];
                }
            });
        return _obj;
    }
    function formatData(obj) {
        for (let key in obj) {
            if (obj[key].length === 1) {
                obj[key] = obj[key][0];
            }
        }
        return obj;
    }
};

/**
 * @description 手机号脱敏
 * @param {String} phone 手机号
 */
const desensitizePhone = (phone) => {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

export {
    isValidVal,
    isValidArr,
    clearInvalidKey,
    jointUrlParams,
    analysisUrlParams,
    getUrlDomain,
    getUrlQuery,
    desensitizePhone,
};

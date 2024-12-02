const domain = {
    dev: {
        // api: 'http://10.1.13.23',		// 质管：dataApi 调试【2-1】
        api: 'http://dtapi.zhilun-k8s.com',
    },
    uat: {
        api: 'https://dtapi-t.zcrubber.com',
    },
    prod: {
        api: 'https://dtapi.zcrubber.com',
    },
    env: 'dev',
};

export { domain };

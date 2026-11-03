const fs = require('fs');
const path = require('path');
const ci = require('miniprogram-ci');

const projectPath = path.resolve(__dirname, '../unpackage/dist/dev/mp-weixin');

async function main() {
    const { WX_APPID: appid, WX_PRIVATE_KEY_PATH: privateKeyPath, WX_VERSION: version } = process.env;

    if (!fs.existsSync(privateKeyPath)) {
        throw new Error(`找不到上传密钥文件：${privateKeyPath}`);
    }
    if (!fs.existsSync(path.join(projectPath, 'app.json'))) {
        throw new Error(`找不到小程序编译产物，请先编译：${projectPath}`);
    }

    if (process.env.WX_CI_PROXY) {
        ci.proxy(process.env.WX_CI_PROXY);
    }

    const project = new ci.Project({ appid, projectPath, privateKeyPath, type: 'miniProgram' });
    const result = await ci.upload({
        project,
        version,
        desc: process.env.WX_DESC || '体验版上传',
        setting: { useProjectConfig: true },
        useCOS: true,
        onProgressUpdate: console.log,
    });

    console.log('上传成功', result);
}

main().catch((error) => {
    console.error('上传失败', error);
    process.exitCode = 1;
});


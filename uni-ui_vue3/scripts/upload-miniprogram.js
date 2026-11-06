// 上传的命令：（全部一次性粘贴进 PowerShell 终端）
// $env:WX_APPID="wx01f12efcea0404dd"    // 个人小程序：张小帅呆
// // 设置上传密钥路径(不能提交到git)
// $env:WX_PRIVATE_KEY_PATH="E:\zhangxiaoshuai\private.wx01f12efcea0404dd.key"
// $env:WX_VERSION="1.0.1"
// $env:WX_DESC="首页开发"
// $env:WX_CI_PROXY = "http://127.0.0.1:7897"  // 7897：是Clash Verge的代理端口
// node scripts/upload-miniprogram.js

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


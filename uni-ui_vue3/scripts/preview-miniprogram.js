// 预览小程序的命令（全部一次性粘贴进 PowerShell 终端）
// $env:WX_APPID="wx01f12efcea0404dd"
// $env:WX_PRIVATE_KEY_PATH="E:\zhangxiaoshuai\private.wx01f12efcea0404dd.key"
// $env:WX_DESC="首页预览"
// npm run preview:mp

const fs = require('fs');
const path = require('path');
const ci = require('miniprogram-ci');

const projectPath = path.resolve(__dirname, '../unpackage/dist/dev/mp-weixin');
const defaultQrcodePath = path.resolve(__dirname, '../preview-qrcode.png');

async function main() {
    const { WX_APPID: appid, WX_PRIVATE_KEY_PATH: privateKeyPath } = process.env;
    const qrcodeOutputDest = path.resolve(process.env.WX_QRCODE_PATH || defaultQrcodePath);

    if (!fs.existsSync(privateKeyPath)) {
        throw new Error(`Preview private key not found: ${privateKeyPath}`);
    }
    if (!fs.existsSync(path.join(projectPath, 'app.json'))) {
        throw new Error(`Mini-program build output not found. Build first: ${projectPath}`);
    }

    if (process.env.WX_CI_PROXY) {
        ci.proxy(process.env.WX_CI_PROXY);
    }

    const project = new ci.Project({ appid, projectPath, privateKeyPath, type: 'miniProgram' });
    const result = await ci.preview({
        project,
        desc: process.env.WX_DESC || 'Local preview',
        setting: { useProjectConfig: true },
        qrcodeFormat: 'image',
        qrcodeOutputDest,
        pagePath: process.env.WX_PREVIEW_PAGE,
        searchQuery: process.env.WX_PREVIEW_QUERY,
        useCOS: true,
        onProgressUpdate: console.log,
    });

    console.log(`Preview QR code generated: ${qrcodeOutputDest}`);
    console.log('Preview succeeded', result);
}

main().catch((error) => {
    console.error('Preview failed', error);
    process.exitCode = 1;
});


import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { domain } from './request/domain';

export default defineConfig({
    plugins: [uni()],
    define: {
        // 自定义配置环境变量
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false,
            },
        },
    },
    server: {
        port: '3000', // 端口
        // open: true,	// 运行时自动打开浏览器
        hmr: true, // 热更新
        // 代理配置（小程序是不走代理的）
        proxy: {
            '/api': {
                target: domain[domain.env].api,
                changeOrigin: true,
            },
        },
    },
});

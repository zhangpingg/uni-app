import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
	plugins: [
		uni(),
		AutoImport({
			imports: [
				'uni-app', // 局部引用：import { onLoad , onShow} from '@dcloudio/uni-app';
				'vue',
				// 'vue-router',
				// 'vuex',
				// 'pinia',
			], // 自动导入vue相关函数
		}),
	],
	define: {
		// 自定义配置环境变量
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	server: {
		// 端口
		port: '3000',
		// 运行时自动打开浏览器
		// open: true,
		// 代理配置
		hmr: true, // 热更新
	},
});
import path from 'node:path';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePluginSvgSpritemap('./public/icons/*.svg'),
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
	build: {
		cssMinify: 'lightningcss',
		outDir: 'dist',
		assetsDir: 'assets',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

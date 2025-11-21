import path from 'node:path';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
		VitePluginSvgSpritemap('./public/icons/*.svg'),
		compression({
			filter: /\.(html|css|js|mjs|json|xml|txt|svg|csv|md|yaml|yml|map)$/i,
			algorithm: 'gzip',
			ext: '.gz',
			threshold: 1024, // сжимать файлы больше 1 KB
		}),
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
	build: {
		cssMinify: 'lightningcss',
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

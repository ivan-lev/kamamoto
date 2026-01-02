import path from 'node:path';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
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
		sourcemap: true,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/js/[name]-[hash].js',
				chunkFileNames: 'assets/js/[name]-[hash].js',
				assetFileNames: ({ name }) => {
					if (name && name.endsWith('.css')) {
						return 'assets/css/[name]-[hash][extname]';
					}

					if (/\.(?:png|jpe?g|svg|gif|tiff|bmp|webp)$/i.test(name ?? '')) {
						return 'assets/img/[name]-[hash][extname]';
					}

					if (/\.(?:woff2?|ttf|otf|eot)$/i.test(name ?? '')) {
						return 'assets/fonts/[name]-[hash][extname]';
					}

					return 'assets/[name]-[hash][extname]';
				},
				manualChunks(id) {
					if (id.includes('/components/admin/')) {
						return 'admin';
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

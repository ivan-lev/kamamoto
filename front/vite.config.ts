import path from 'node:path';
import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // or "modern"
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});

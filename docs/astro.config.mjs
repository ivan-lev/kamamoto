// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Дока Камамото',
			defaultLocale: 'root',
			locales: {
				root: {
				label: 'Русский',
				lang: 'ru',
				},
			},
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'laptop', label: 'Site', href: 'https://kamamoto.ru' },
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/ChawanShop' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ivan-lev/kamamoto' }
			],
			sidebar: [
				{
					label: 'Общая информация',
					autogenerate: { directory: 'common' },
				},
				{
					label: 'Фронтенд',
					autogenerate: { directory: 'frontend' },
				},
				{
					label: 'Бэкенд',
					autogenerate: { directory: 'backend' },
				},
				{
					label: 'Контент',
					autogenerate: { directory: 'content' },
				},
				{
					label: 'Версии приложения',
					autogenerate: { directory: 'versions' },
				},
				{
					label: 'Остальное',
					autogenerate: { directory: 'other' },
				},
			],
		}),
	],
});

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Kamamoto Docs',
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
					label: 'Frontend',
					autogenerate: { directory: 'frontend' },
				},
				{
					label: 'Backend',
					autogenerate: { directory: 'backend' },
				},
				{
					label: 'Версии приложения',
					autogenerate: { directory: 'versions' },
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});

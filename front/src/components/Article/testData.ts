import type { IArticleBlock } from '@/components/Article/Article.types';

export const testArticle: IArticleBlock[] = [
	{
		content: '<p>Параграф статьи 2</p>',
		slides: [
			{ url: '/images/homepage-slider/01.webp' },
			{ url: '/images/homepage-slider/01.webp' },
			{ url: '/images/homepage-slider/01.webp' },
		],
	},
	{
		content: '<p>Параграф статьи 2</p>',
		slides: [
			{ url: '/images/homepage-slider/01.webp', source: 'https://sitelink1' },
			{ url: '/images/homepage-slider/01.webp', source: 'https://sitelink2' },
			{ url: '/images/homepage-slider/01.webp', source: 'https://sitelink3' },
		],
	},
];

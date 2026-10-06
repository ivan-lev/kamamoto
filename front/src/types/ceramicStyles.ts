import type { ArticleSection } from '@/components/visitor/Article/Article.types';

export interface CeramicStyle {
	name: string;
	title: string;
	description: string;
	showArticle: boolean;
	thumbnail?: string;
	mapImage: string;
	article: ArticleSection[];
}

// карточка статьи в списке /ceramic-styles (GET /ceramic-styles/articles), thumbnail — URL
export interface CeramicStylePreview {
	name: string;
	title: string;
	thumbnail: string;
}

export const defaultCeramicStyle: CeramicStyle = {
	name: '',
	title: '',
	description: '',
	showArticle: false,
	thumbnail: '',
	mapImage: '',
	article: [],
};

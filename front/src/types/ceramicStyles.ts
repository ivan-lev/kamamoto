import type { ArticleSection } from '@/components/visitor/Article/Article.types';

export interface CeramicStyle {
	name: string;
	title: string;
	brief?: string;
	description?: string;
	showArticle?: boolean;
	thumbnail?: string;
	images?: string[];
	additionalImages?: string[];
	mapImage: string;
	article: ArticleSection[];
}

export const defaultCeramicStyle: CeramicStyle = {
	name: '',
	title: '',
	brief: '',
	description: '',
	showArticle: false,
	thumbnail: '',
	images: [],
	additionalImages: [],
	mapImage: '',
	article: [],
};

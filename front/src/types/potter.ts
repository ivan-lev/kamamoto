import type { ArticleSection } from '@/components/visitor/Article/Article.types';

export interface Potter {
	id: string;
	name: string;
	japaneseName: string;
	lifeDates: string;
	photo: string;
	info: string;
	isLNT: boolean;
	article: ArticleSection[];
	showArticle: boolean;
}

export const defaultPotter: Potter = { id: '', name: '', japaneseName: '', lifeDates: '', photo: '', info: '', isLNT: false, article: [], showArticle: false };

import type { Types } from 'mongoose';
import type { ArticleSection } from './article';

export interface Potter {
	_id: Types.ObjectId;
	id: string;
	name: string;
	japaneseName?: string;
	lifeDates?: string;
	photo?: string;
	info?: string;
	isLNT: boolean;
	article: ArticleSection[];
	showArticle: boolean;
};

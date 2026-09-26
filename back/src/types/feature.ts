import type { Types } from 'mongoose';
import type { ArticleSection } from './article';

export interface Feature {
	_id: Types.ObjectId;
	name: string;
	title: string;
	description: string;
	showArticle: boolean;
	thumbnail: string;
	article: ArticleSection[];
}

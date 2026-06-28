import type { Types } from 'mongoose';
import type { ArticleSection } from './article';

export interface Style {
	_id: Types.ObjectId;
	name: string;
	title: string;
	description: string;
	showArticle: boolean;
	thumbnail: string;
	mapImage: string;
	article: ArticleSection[];
}

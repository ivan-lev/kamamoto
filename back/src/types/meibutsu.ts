import type { Types } from 'mongoose';
import type { ArticleSection } from './article';

// «Вещь с именем» (мэйбуцу, 名物) — знаменитый предмет чайной утвари со своей историей
export interface Meibutsu {
	_id: Types.ObjectId;
	id: string;
	name: string;
	japaneseName?: string;
	photo?: string;
	info?: string;
	article: ArticleSection[];
	showArticle: boolean;
};

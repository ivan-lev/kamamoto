import type { ArticleSection } from '@/components/visitor/Article/Article.types';

// «Вещь с именем» (мэйбуцу, 名物) — знаменитый предмет чайной утвари
export interface Meibutsu {
	id: string;
	name: string;
	japaneseName: string;
	photo: string;
	info: string;
	article: ArticleSection[];
	showArticle: boolean;
}

// карточка в списке /meibutsu/ (GET /meibutsu/articles), photo — URL
export interface MeibutsuPreview {
	id: string;
	name: string;
	photo: string;
}

export const defaultMeibutsu: Meibutsu = {
	id: '',
	name: '',
	japaneseName: '',
	photo: '',
	info: '',
	article: [],
	showArticle: false,
};

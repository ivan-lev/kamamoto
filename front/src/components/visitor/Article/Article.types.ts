export interface ArticleSlide {
	filename: string;
	source?: string;
	caption?: string;
};

export interface ArticleSection {
	content: string;
	slides?: ArticleSlide[];
}

export interface Article {
	name: string;
	title: string;
	article: ArticleSection[];
}

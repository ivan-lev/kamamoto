interface ArticleSlide {
	filename: string;
	source?: string;
	caption?: string;
};

export interface ArticleSection {
	content: string;
	slides?: ArticleSlide[];
}

export interface ArticlePayload {
	name: string;
	title: string;
	article: ArticleSection[];
	showArticle: boolean;
}

export interface ArticlesListPayload {
	name: string;
	title: string;
	thumbnail: string;
}

interface ArticleSlide {
	filename: string;
	source?: string;
	caption?: string;
};

interface ArticleSection {
	content: string;
	slides?: ArticleSlide[];
}

export interface Style {
	_id: string;
	name: string;
	title: string;
	description: string;
	showArticle: boolean;
	thumbnail: string;
	mapImage: string;
	article: ArticleSection[];
}

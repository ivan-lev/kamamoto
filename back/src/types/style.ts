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
	brief: string;
	description: string;
	showArticle: boolean;
	thumbnail: string;
	images: string[];
	additionalImages: string[];
	mapImage: string;
	article: ArticleSection[];
}

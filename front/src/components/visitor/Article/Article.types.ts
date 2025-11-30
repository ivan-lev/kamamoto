export interface IArticleSlide {
	url: string;
	source?: string;
	caption?: string;
};

export interface IArticleBlock {
	content: string;
	slides?: IArticleSlide[];
}

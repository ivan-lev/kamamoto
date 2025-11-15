export interface IArticleSlide {
	url: string;
	source?: string;
};

export interface IArticleBlock {
	content?: string;
	slides?: IArticleSlide[];
}

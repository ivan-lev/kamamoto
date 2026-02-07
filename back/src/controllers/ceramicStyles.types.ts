export interface DeleteCeramicStyleParams {
	name: string;
}

export interface UpdateCeramicStyleParams {
	name: string;
}

export interface CeramicStyleArticlePayload {
	name: string;
	title: string;
	article: { content: string; slides: { filename: string; source: string; caption: string	}[] }[];
	showArticle: boolean;
}

export interface CeramicStylesListPayload {
	name: string;
	title: string;
	thumbnail: string;
}

export interface CeramicStyle {
	_id: string;
	name: string;
	title: string;
	brief: string;
	description: string;
	showArticle: boolean;
	thumbnail: string;
	images: string[];
	additionalImages: string[];
}

export const defaultCeramicStyle: CeramicStyle = {
	_id: '',
	name: '',
	title: '',
	brief: '',
	description: '',
	showArticle: false,
	thumbnail: '',
	images: [],
	additionalImages: [],
};

export interface CeramicStyle {
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
	name: '',
	title: '',
	brief: '',
	description: '',
	showArticle: false,
	thumbnail: '',
	images: [],
	additionalImages: [],
};

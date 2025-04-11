export interface CeramicStyle {
	_id: string;
	name?: string;
	title: string;
	brief?: string;
	description?: string;
	showArticle?: boolean;
	thumbnail?: string;
	images?: string[];
	additionalImages?: string[];
}

export const defaultCeramicStyle: CeramicStyle = {
	_id: '67f8082ad7087fa1cababada',
	name: '',
	title: '',
	brief: '',
	description: '',
	showArticle: false,
	thumbnail: '',
	images: [],
	additionalImages: [],
};

export interface Category {
	_id: string;
	category: string;
	title: string;
	thumbnail: string;
}

export const defaultCategory: Category = {
	_id: '',
	category: '',
	title: '',
	thumbnail: '',
};

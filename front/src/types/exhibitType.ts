import type { Potter } from '@/types/potter';
import { defaultPotter } from '@/types/potter';

export type Seasons = 'весна' | 'лето' | 'осень' | 'зима';

export interface ExhibitVisitorStyle {
	name: string;
	title: string;
	description: string;
	mapImage: string;
	showArticle: boolean;
}

export interface ExhibitVisitor {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	category: { name: string, title: string };
	style: ExhibitVisitorStyle;
	images: string[];
	description?: string;

	potter: Potter;

	additionalImages: string[];
	additionalDescription?: string;

	price?: number | '';
	height?: number | '';
	length?: number | '';
	width?: number | '';
	diameter?: number | '';
	footDiameter?: number | '';
	weight?: number | '';
	volume?: number | '';
	weightOfSet?: number | '';

	complectation: string[];
	preservation?: string;
	season?: Seasons;

	isActive: boolean;
}

export interface ExhibitAdmin {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	category: { name: string, title: string };
	style?: { name: string, title: string };
	images: string[];
	description?: string;

	potter: string;

	additionalImages: string[];
	additionalDescription?: string;

	price?: number | '';
	height?: number | '';
	length?: number | '';
	width?: number | '';
	diameter?: number | '';
	footDiameter?: number | '';
	weight?: number | '';
	volume?: number | '';
	weightOfSet?: number | '';

	complectation: string[];
	preservation?: string;
	season?: Seasons;

	isActive: boolean;
}

export const defaultExhibit: ExhibitVisitor = {
	id: 0,
	name: '',
	thumbnail: '',
	age: '',
	category: { name: 'other', title: '' },
	style: { name: 'unknown', title: '', description: '', mapImage: '', showArticle: false },
	images: [],
	description: '',

	potter: Object.assign(defaultPotter),

	additionalImages: [],
	additionalDescription: '',

	price: 0,

	length: 0,
	width: 0,
	height: 0,
	weight: '',
	weightOfSet: 0,

	complectation: [],
	preservation: '',

	isActive: false,

};

export const defaultExhibitAdmin: ExhibitAdmin = {
	id: 0,
	name: '',
	thumbnail: '',
	age: '',
	category: { name: 'other', title: '' },
	style: { name: 'unknown', title: '' },
	images: [],
	description: '',

	potter: '690201704cdb3b65432973f2',

	additionalImages: [],
	additionalDescription: '',

	price: 0,

	length: 0,
	width: 0,
	height: 0,
	weight: '',
	weightOfSet: 0,

	complectation: [],
	preservation: '',

	isActive: false,

};

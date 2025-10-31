import type { CeramicStyle } from '@/types/ceramicStyles';
import type { Potter } from '@/types/potter';
import { defaultPotter } from '@/types/potter';

export type Seasons = 'весна' | 'лето' | 'осень' | 'зима';

export interface ExhibitExtended {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	category: { name: string, title: string };
	style?: CeramicStyle;
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

export interface ExhibitShort {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	category: { name: string, title: string };
	style?: CeramicStyle;
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

export const defaultExhibit: ExhibitExtended = {
	id: 0,
	name: '',
	thumbnail: '',
	age: '',
	category: { name: 'other', title: '' },
	style: { name: 'unknown', title: '', mapImage: '' },
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

export const defaultExhibitShort: ExhibitShort = {
	id: 0,
	name: '',
	thumbnail: '',
	age: '',
	category: { name: 'other', title: '' },
	style: { name: 'unknown', title: '', mapImage: '' },
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

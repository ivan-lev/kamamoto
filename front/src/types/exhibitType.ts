import type { CeramicStyle } from '@/types/ceramicStyles';
import type { ExhibitComplectation } from '@/types/exhibitComplectationType';

export interface Exhibit {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	potterName?: string;
	potterJapaneseName?: string;
	potterLifeDates?: string;
	category: { name: string; title: string };
	style?: CeramicStyle;
	images: string[];
	description?: string;

	potterPhoto?: string;
	potterInfo?: string;

	additionalImages?: string[];
	additionalDescription?: string;

	price?: number;
	height?: number;
	length?: number;
	width?: number;
	diameter?: number;
	footDiameter?: number;
	weight?: number;
	volume?: number;
	weightOfSet?: number;
	complectation?: ExhibitComplectation[];
	preservation?: string;

	isActive: boolean;
}

export type Exhibits = Exhibit[];

export const defaultExhibit: Exhibit = {
	id: 0,
	name: '',
	thumbnail: '',
	age: '',
	potterName: '',
	potterJapaneseName: '',
	potterLifeDates: '',
	category: { name: 'other', title: '' },
	style: { name: 'unknown', title: '' },
	images: [],
	description: '',

	potterPhoto: '',
	potterInfo: '',

	additionalImages: [],
	additionalDescription: '',

	price: 0,

	length: 0,
	width: 0,
	height: 0,
	weight: 0,
	weightOfSet: 0,

	complectation: [],
	preservation: '',

	isActive: false,

};

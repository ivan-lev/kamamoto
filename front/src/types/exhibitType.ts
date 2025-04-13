import type { CeramicStyle } from '@/types/ceramicStyles';
import type { ExhibitComplectation } from '@/types/exhibitComplectationType';

export interface Exhibit {
	id?: number;
	name?: string;
	age?: string;
	potterName?: string;
	potterJapaneseName?: string;
	potterLifeDates?: string;
	category: { _id: string; title: string };
	style?: CeramicStyle;
	images?: string[];
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
	weigth?: number;
	volume?: number;
	weightOfSet?: number;
	complectation?: ExhibitComplectation[];
	preservation?: string;
}

export type Exhibits = Exhibit[];

export const defaultExhibit: Exhibit = {
	id: 0,
	name: '',
	age: '',
	potterName: '',
	potterJapaneseName: '',
	potterLifeDates: '',
	category: { _id: '', title: '' },
	style: { name: 'unknown', title: '' },
	images: [],
	description: '',

	potterPhoto: '',
	potterInfo: '',

	additionalImages: [],
	additionalDescription: '',

	price: 0,

	complectation: [],
	preservation: '',
};

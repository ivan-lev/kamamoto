import type { CeramicStyleType } from './ceramicStyleType';
import type { ExhibitCategory } from './exhibitCategory';
import type { ExhibitComplectation } from './exhibitComplectationType';

export interface Exhibit {
	id?: number;
	name?: string;
	age?: string;
	potterName?: string;
	potterJapaneseName?: string;
	potterLifeDates?: string;
	category?: keyof typeof ExhibitCategory;
	style?: keyof typeof CeramicStyleType;
	images?: string[];
	description?: string;

	potterPhoto?: string;
	potterInfo?: string;

	additionalImages?: string[];
	additionalDescription?: string;
	additionalPhotos?: boolean;
	additionalPhotosCount?: number;

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
	id: undefined,
	name: undefined,
	age: undefined,
	potterName: undefined,
	potterJapaneseName: undefined,
	potterLifeDates: undefined,
	category: undefined,
	style: undefined,
	images: undefined,
	description: undefined,

	potterPhoto: undefined,
	potterInfo: undefined,

	additionalImages: undefined,
	additionalDescription: undefined,
	additionalPhotos: undefined,
	additionalPhotosCount: undefined,

	price: undefined,

	complectation: undefined,
	preservation: undefined,
};

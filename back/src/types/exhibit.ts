import type { Types } from 'mongoose';

export interface Exhibit {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	potterName?: string;
	potterJapaneseName?: string;
	potterLifeDates?: string;
	category: Types.ObjectId;
	style: Types.ObjectId;
	images: string[];
	description: string;

	potterPhoto?: string;
	potterInfo?: string;

	additionalImages: string[];
	additionalDescription?: string;

	price: number;
	height?: number;
	length?: number;
	width?: number;
	diameter?: number;
	footDiameter?: number;
	weight?: number;
	volume?: number;
	weightOfSet?: number;

	complectation: string[];
	preservation?: string;
	season: 'весна' | 'лето' | 'осень' | 'зима';

	isActive: boolean;
};

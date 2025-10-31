import type { Types } from 'mongoose';

export interface Exhibit {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	category: Types.ObjectId;
	style: Types.ObjectId;
	images: string[];
	description: string;

	potter: Types.ObjectId;

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

export interface ExhibitPayload {
	id: number;
	name: string;
	thumbnail: string;
	age?: string;
	category: Types.ObjectId;
	style: Types.ObjectId;
	images: string[];
	description: string;

	potter: { photo: string; info: string };

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

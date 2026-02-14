import { Features } from '@/variables/features';
import { manufacturers } from '@/variables/manufacturers/_index';
import { origin } from '@/variables/origin';

interface Series {
	slug: string;
	title: string;
	originalTitle?: string;
	description: string;
}

export interface Manufacturer {
	title: string;
	originalTitle: string;
	slug: string;
	description: string;
	series?: { [key: string]: Series };
}

export interface Incense {
	slug: string;
	title: string;
	originalTitle: string;
	description: string;
	photos: string[];
	origin: string;
	manufacturer: Manufacturer;
	series?: Series;
	ingredients: string[];
	features: Features[];
	burnTime: number;
	lenght: number;
	price: number;
	pricePerStick: number;
	isActive: boolean;
	inStock: boolean;
	quantity?: number;
}

export const defaultIncence: Incense = {
	slug: '',
	title: '',
	originalTitle: '',
	description: '',
	photos: [],
	origin: origin.unknown,
	manufacturer: manufacturers.unknown,
	series: undefined,
	ingredients: [],
	features: [Features.none],
	burnTime: 0,
	lenght: 0,
	price: 0,
	pricePerStick: 0,
	isActive: false,
	inStock: false,
};

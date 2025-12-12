import { Features } from '@/variables/features';
import { unknown } from '@/variables/manufacturers';
import { origin } from '@/variables/origin';

export enum Ingredients {
	aloeswood = 'агар',
	aloeswoodPremium = 'агар высшего качества',
	aloeswoodVietnamese = 'вьетнамский агар',
	benzoin = 'бензоин',
	borneol = 'борнеол', // 龍脳
	cinnamon = 'корица',
	clove = 'гвоздика',
	cypressJapanese = 'японский кипарис',
	fenugreek = 'пажитник',
	florals = 'травы',
	japaneseBayBark = 'кора японского лавра', // 椨皮粉
	patchouli = 'пачули',
	reiryoko = 'рэйрёко',
	sandalwood = 'сандал',
	sandalwoodIndian = 'индийский сандал', // 白檀
	sandalwoodRozan = 'розановый сандал',
	sandalwoodSweet = 'сладкий сандал',
	spices = 'специи',
	turmeric = 'куркума',
}

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
}

export const incences: Incense[] = [
	{
		slug: '',
		title: '',
		originalTitle: '',
		description: '',
		photos: [],
		origin: origin.unknown,
		manufacturer: unknown,
		series: { slug: '', title: '', originalTitle: '', description: '' },
		ingredients: [],
		features: [Features.none],
		burnTime: 0,
		lenght: 0,
		price: 0,
		pricePerStick: 0,
		isActive: false,
	},
];

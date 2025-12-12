import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { manufacturers } from '@/variables/manufacturers';
import { origin } from '@/variables/origin';

export const bayeidoIncences: Incense[] = [
	{
		slug: '',
		title: '',
		originalTitle: '',
		description: '',
		photos: [],
		origin: origin.unknown,
		manufacturer: manufacturers.unknown,
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

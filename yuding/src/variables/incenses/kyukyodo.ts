import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/incences.types';
import { manufacturers } from '@/variables/manufacturers';
import { origin } from '@/variables/origin';

export const premium: Incense[] = [
	{
		title: 'Синнё',
		originalTitle: '',
		slug: 'shinnyo',
		description: 'Синнё сочетает насыщенный аромат агара и горного розанового сандала (из Майсора, Индия) с натуральными ароматическими компонентами, такими как рейрёко (китайское растение для традиционной медицины, широко применяемое при изготовлении японских благовоний). Сладкий и изысканный аромат, он обладает верхней парфюмерной нотой, раскрывающей нежную сладость агара. Успокаивающий и сбалансированный, стойкий аромат подходит для медитаций, чаепитий, а такжк для ежедневного использования.',
		photos: ['PC013450.webp', 'PC013448.webp', 'PC013449.webp', 'PC013451.webp', 'PC013453.webp', 'PC013454.webp', 'PC013455.webp', 'PC013456.webp'],
		manufacturer: manufacturers.kyukyodo,
		series: manufacturers.kyukyodo.series?.premium,
		ingredients: [Ingredients.aloeswoodPremium, Ingredients.sandalwoodRozan, Ingredients.reiryoko],
		features: [Features.premium],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 0,
		isActive: true,
	},
];

export const kyukyodoIncences: Incense[] = [...premium];

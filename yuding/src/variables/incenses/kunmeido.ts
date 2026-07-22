import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/ingredients';
import { manufacturers } from '@/variables/manufacturers/_index';
import { origin } from '@/variables/origin';
import { stock } from '@/variables/stock';

const reiryokoh: Incense[] = [
	{
		title: 'Рэирёко',
		originalTitle: '零陵香',
		slug: 'reiryokoh',
		description: 'Строго традиционный аромат Рэирёко от Кунмэидо хорошо известен благодаря использованию в храме Дайхондзан Эйхэйдзи (永平寺). Опираясь на сильную храмовую традицию, Рэирёко наполнен ароматом традиционных натуральных специй, поверх базы из сандалового дерева. Сладкий и пряный, с мягким послевкусием, Рэйрёко идеально подходит для утренней и вечерней духовной практики.',
		photos: ['P1013510.webp', 'P1013507.webp', 'P1013508.webp', 'P1013511.webp', 'P1013512.webp', 'P1013513.webp', 'P1013514.webp'],
		manufacturer: manufacturers.kunmeido,
		series: manufacturers.kunmeido.series?.reiryokoh,
		ingredients: [Ingredients.sandalwood, Ingredients.clove, Ingredients.fenugreek, Ingredients.patchouli, Ingredients.turmeric, Ingredients.borneol],
		features: [Features.daily, Features.natural],
		burnTime: 25,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 22,
		quantity: stock.kunmeido?.reiryokoh || 0,
		isActive: true,
		inStock: true,
	},
];

export const kunmeidoIncences: Incense[] = [...reiryokoh];

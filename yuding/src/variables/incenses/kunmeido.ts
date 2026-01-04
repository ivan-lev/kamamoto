import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/incences.types';
import { manufacturers } from '@/variables/manufacturers';
import { origin } from '@/variables/origin';

const reiryokoh: Incense[] = [
	{
		title: 'Рэйрёко',
		originalTitle: '零陵香',
		slug: 'reiryokoh',
		description: 'Строго традиционный аромат Рэйрёко от Кунмэйдо хорошо известен благодаря использованию в Дайхондзан Эйхэйдзи (永平寺). Опираясь на эту сильную традицию, Рэйрёко наполнен аромаов традиционных натуральных специй, поверх базового аромата сандалового дерева. Сладкий, пряный и традиционный, с мягким послевкусием, популярный аромат Reiryokoh от Kunmeido идеально подходит для утренней и вечерней работы.. ',
		photos: ['IMG_4543.webp'],
		manufacturer: manufacturers.kunmeido,
		series: manufacturers.kunmeido.series?.reiryokoh,
		ingredients: [Ingredients.sandalwood, Ingredients.clove, Ingredients.fenugreek, Ingredients.patchouli, Ingredients.turmeric, Ingredients.borneol],
		features: [Features.daily, Features.natural],
		burnTime: 25,
		lenght: 13.5,
		origin: origin.japan,
		price: 16,
		pricePerStick: 0,
		isActive: true,
		inStock: true,
	},
];

export const kunmeidoIncences: Incense[] = [...reiryokoh];

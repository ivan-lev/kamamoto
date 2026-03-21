import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/ingredients';
import { manufacturers } from '@/variables/manufacturers/_index';
import { origin } from '@/variables/origin';
import { stock } from '@/variables/stock';

const kotonoha: Incense[] = [
	{
		slug: 'byakudan',
		title: 'Бьякудан (Сандал)',
		originalTitle: '白檀',
		description: 'Благовония Бьякудан от Сэйдзюдо изготовлены из чистого индийского сандалового дерева и исключительно натуральных ингредиентов. Это прекрасный аромат для ежедневного использования, идеально подходящий для медитации или релаксации. Сбалансированный, мягкий и сладкий — это успокаивающий аромат, позволяющий в полной мере ощутить чистую природу сандалового дерева.',
		photos: ['P1014053.webp', 'P1014052.webp', 'P1014054.webp', 'P1014056.webp', 'P1014057.webp', 'P1014058.webp', 'P1014059.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.seijudo,
		series: manufacturers.seijudo.series?.kotonoha,
		ingredients: [Ingredients.sandalwoodIndian],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13,
		price: 0,
		pricePerStick: 52,
		quantity: stock.seijudo?.byakudan || 0,
		isActive: true,
		inStock: true,
	},
	{
		slug: 'jinko',
		title: 'Дзинко (Агар)',
		originalTitle: '沈香',
		description: 'Благовония Дзинко — это полностью натуральные благовония, изготовленные из чистого вьетнамского агара и исключительно натуральных ингредиентов. Это превосходные благовония для ежедневного использования, идеально подходящие для медитации или релаксации. Сбалансированный, чистый и свежий аромат Дзинко бодрит и позволяет в полной мере ощутить чистую природу агара.',
		photos: ['jinko.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.seijudo,
		series: manufacturers.seijudo.series?.kotonoha,
		ingredients: [Ingredients.sandalwood, Ingredients.borneol, Ingredients.clove, Ingredients.cinnamon, Ingredients.herbsMedicine],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13,
		price: 0,
		pricePerStick: 0,
		quantity: stock.seijudo?.jinko || 0,
		isActive: false,
		inStock: false,
	},
];

export const seijudoIncences: Incense[] = [...kotonoha];

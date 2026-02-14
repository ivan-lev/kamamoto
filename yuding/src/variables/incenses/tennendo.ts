import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/ingredients';
import { manufacturers } from '@/variables/manufacturers/_index';
import { origin } from '@/variables/origin';

const premium: Incense[] = [
	{
		title: 'Рэндзан (Горный хребет)',
		originalTitle: '連山',
		slug: 'renzan',
		description: 'Рэндзан — это сладковатый, глубокий, насыщенный, но в то же время знакомый аромат, сочетающий в себе ноты агара, сандала и традиционных китайских медицинских трав. Сложный, сухой древесный, очень приятный для слушания и прекрасный для знакомства с традиционными японскими ароматами.',
		photos: ['P1013740.webp', 'P1013746.webp', 'P1013738.webp', 'P1013739.webp', 'P1013742.webp', 'P1013745.webp', 'P1013747.webp'],
		manufacturer: manufacturers.tennendo,
		series: manufacturers.tennendo.series?.premium,
		ingredients: [Ingredients.aloeswood, Ingredients.sandalwood, Ingredients.clove, Ingredients.cinnamon, Ingredients.spices],
		features: [Features.premium, Features.natural],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 28,
		quantity: 440,
		isActive: true,
		inStock: true,
	},

	{
		title: 'Карафунэ (Заморский корабль)',
		originalTitle: '唐舟',
		slug: 'karafune',
		description: 'Карафунэ обладает нежным, освежающим традиционным ароматом. В составе исключительно натуральные компоненты, создающие успокаивающий и мягкий вкус, с легким, продолжительным послевкусием. Идеально подходит для релаксации или медитации.',
		photos: ['P1013750.webp', 'P1013757.webp', 'P1013751.webp', 'P1013749.webp', 'P1013748.webp', 'P1013754.webp'],
		manufacturer: manufacturers.tennendo,
		series: manufacturers.tennendo.series?.premium,
		ingredients: [Ingredients.sandalwood, Ingredients.clove, Ingredients.cinnamon, Ingredients.kaikou, Ingredients.fennel, Ingredients.kaikou, Ingredients.herbsMedicine],
		features: [Features.premium, Features.natural],
		burnTime: 25,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 24,
		quantity: 440,
		isActive: true,
		inStock: true,
	},

	{
		title: 'Сингон (Мантра)',
		originalTitle: '真言',
		slug: 'shingon',
		description: 'Сингон — интересный вариант сандалового дерева с мускусными нотами, полученными из растительных компонентов. Прекрасный образец для знакомства с традиционным японским сандалом. Он обладает хорошим сбалансированным ароматом, находящимся где-то между «влажным» и «сухим» сандаловым запахом. Даже сегодня этот аромат часто можно услышать в храмах и он хорошо подходит в качестве благовония для буддийского алтаря или медитации.',
		photos: ['P1013729.webp', 'P1013725.webp', 'P1013726.webp', 'P1013728.webp', 'P1013730.webp'],
		manufacturer: manufacturers.tennendo,
		series: manufacturers.tennendo.series?.premium,
		ingredients: [Ingredients.sandalwood, Ingredients.spices],
		features: [Features.premium, Features.natural],
		burnTime: 25,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 30,
		quantity: 390,
		isActive: true,
		inStock: true,
	},

];

export const tennendoIncences: Incense[] = [...premium];

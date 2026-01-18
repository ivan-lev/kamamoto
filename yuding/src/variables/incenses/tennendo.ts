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
		photos: ['renzan.png'],
		manufacturer: manufacturers.tennendo,
		series: manufacturers.tennendo.series?.premium,
		ingredients: [Ingredients.aloeswood, Ingredients.sandalwood, Ingredients.clove, Ingredients.cinnamon, Ingredients.spices],
		features: [Features.premium, Features.natural],
		burnTime: 30,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 22,
		isActive: true,
		inStock: false,
	},

	{
		title: 'Карафунэ (Заморский корабль)',
		originalTitle: '唐舟',
		slug: 'karafune',
		description: 'Карафунэ обладает нежным, освежающим традиционным ароматом. В составе исключительно натуральные компоненты, создающие успокаивающий и мягкий вкус, с легким, продолжительным послевкусием. Идеально подходит для релаксации или медитации.',
		photos: ['karafune.png'],
		manufacturer: manufacturers.tennendo,
		series: manufacturers.tennendo.series?.premium,
		ingredients: [Ingredients.sandalwood, Ingredients.clove, Ingredients.cinnamon, Ingredients.kaikou, Ingredients.fennel, Ingredients.kaikou, Ingredients.herbsMedicine],
		features: [Features.premium, Features.natural],
		burnTime: 25,
		lenght: 14,
		origin: origin.japan,
		price: 0,
		pricePerStick: 18,
		isActive: true,
		inStock: false,
	},

	{
		title: 'Сингон (Мантра)',
		originalTitle: '真言',
		slug: 'shingon',
		description: 'Сингон — интересный вариант сандалового дерева с мускусными нотами, полученными из растительных компонентов. Прекрасный образец для знакомства с традиционным японским сандалом. Он обладает хорошим сбалансированным ароматом, находящимся где-то между «влажным» и «сухим» сандаловым запахом. Даже сегодня этот аромат часто можно услышать в храмах и он хорошо подходит в качестве благовония для буддийского алтаря или медитации.',
		photos: ['shingon.png'],
		manufacturer: manufacturers.tennendo,
		series: manufacturers.tennendo.series?.premium,
		ingredients: [Ingredients.sandalwood, Ingredients.spices],
		features: [Features.premium, Features.natural],
		burnTime: 25,
		lenght: 14,
		origin: origin.japan,
		price: 24,
		pricePerStick: 0,
		isActive: true,
		inStock: false,
	},

];

export const tennendoIncences: Incense[] = [...premium];

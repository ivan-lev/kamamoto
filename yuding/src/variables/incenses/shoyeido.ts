import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/incences.types';
import { manufacturers } from '@/variables/manufacturers/manufacturers';
import { origin } from '@/variables/origin';

const daily: Incense[] = [
	{
		title: 'Мадока (Шифон)',
		originalTitle: 'まどか',
		slug: 'madoka',
		description: 'Искусно созданный с использованием сандалового дерева в качестве основного ингредиента и натуральных специй, таких как корица, аромат Мадока дарит нежные цветочные и землистые ноты — мягко напоминая палочки Кёнисики. В аромате Мадока ощущается нежная мягкость.',
		photos: ['C160117.webp', 'C160118.webp', 'C160119.webp', 'C160120.webp'],
		manufacturer: manufacturers.shoyeido,
		series: manufacturers.shoyeido.series?.daily,
		ingredients: [Ingredients.sandalwood, Ingredients.cinnamon, Ingredients.florals],
		features: [Features.daily, Features.natural, Features.lowSmoke],
		burnTime: 30,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 28,
		isActive: true,
		inStock: true,
	},

	{
		title: 'Кёнисики (Осенние листья Киото)',
		originalTitle: '',
		slug: 'kyonishiki',
		description: 'Созданные более 30 лет назад, чтобы передать осеннее великолепие района Арасияма в Киото, благовония Кёнисики — настоящая классика в мире ароматов. Их поэтическое сочетание высококачественных корицы и сандалового дерева идеально передает настроение и красоту осеннего дня. Эти благовония обладают чудесным сладким, пряным и древесным ароматом. Очень удачный рецепт, передающий настроение и цвета осени. Древесный, со сладкими нотками корицы и бензоина. Это тёплые благовония, идеально подходящие для использования в течение осенних месяцев.',
		photos: ['C160107.webp', 'C160103.webp', 'C160104.webp', 'C160105.webp'],
		manufacturer: manufacturers.shoyeido,
		series: manufacturers.shoyeido.series?.daily,
		ingredients: [Ingredients.sandalwood, Ingredients.cinnamon, Ingredients.patchouli, Ingredients.benzoin, Ingredients.spices],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 24,
		isActive: true,
		inStock: true,
	},

	{
		title: 'Кинкаку (Золотой Павильон)',
		originalTitle: '',
		slug: 'kinkaku',
		description: 'Этот рецепт, содержащий сандаловое дерево, пачули и корицу, вдохновлен  отражением великолепного храма Кинкаку-дзи в пруду Кёко-ти. Элегантная смесь специй и ароматной древесины с характерными верхними, слегка сладковатым нотами. Если вы предпочитаете благовония с более землистым/пряным оттенком, не жертвуя при этом традиционной утонченностью японских благовоний, то Кинкаку — отличный выбор. Эти благовония действительно впечатляют. Сложный аромат, который постепенно раскрывается с каждым возжиганием. Прекрасная отправная точка для тех, кто начинает знакомиться с линейкой благовоний Сёэидо.',
		photos: ['C160102.webp', 'C160097.webp', 'C160098.webp', 'C160099.webp', 'C160101.webp'],
		manufacturer: manufacturers.shoyeido,
		series: manufacturers.shoyeido.series?.daily,
		ingredients: [Ingredients.sandalwood, Ingredients.cinnamon, Ingredients.patchouli],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13.5,
		origin: origin.japan,
		price: 0,
		pricePerStick: 36,
		isActive: true,
		inStock: true,
	},
];

const selects: Incense[] = [
	{
		slug: 'baika-ju',
		title: 'Байка Дзю',
		originalTitle: '',
		description: 'Популярная смесь сандалового дерева и корицы от Сёэидо создает теплый, уютный аромат, достаточно экономичный для ежедневного использования. Эти благовония — одни из любимых у поклонников Сёэидо, они оставляют нежный, сладкий аромат.',
		photos: ['2111935.webp', '2111931.webp', '2111930.webp', '2111933.webp', '2111932.webp', '2111936.webp', '2111939.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.shoyeido,
		series: manufacturers.shoyeido.series?.selects,
		ingredients: [Ingredients.benzoin, Ingredients.sandalwood, Ingredients.cinnamon],
		features: [Features.natural],
		burnTime: 30,
		lenght: 13,
		price: 0,
		pricePerStick: 28,
		isActive: true,
		inStock: true,
	},
];

export const shoyeidoIncences: Incense[] = [...daily, ...selects];

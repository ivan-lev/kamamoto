import type { Incense } from '@/variables/incences.types';
import { Features } from '@/variables/features';
import { Ingredients } from '@/variables/ingredients';
import { manufacturers } from '@/variables/manufacturers/_index';
import { origin } from '@/variables/origin';
import { stock } from '@/variables/stock';

const kobunboku: Incense[] = [
	{
		slug: 'kobunboku',
		title: 'Кобунбоку',
		originalTitle: '好文木',
		description: 'Кобунбоку — очень популярный аромат для медитации, воплощающий в себе «цветок мира» — цветущую сливу. Этот изысканный аромат представляет собой сочетание сандалового дерева, борнеола, гвоздики, корицы и других традиционных специй. Выпущенный 100 лет назад, он является бестселлером в Японии и одним из флагманских ароматов компании Байэидо. Аромат сладковатый, сухой, элегантный и очень приятный. Как и все благовония Бэйэидо - это традиционное пряно-древесное сочетание.',
		photos: ['2111985.webp', '2111992.webp', '2111980.webp', '2111981.webp', '2111982.webp', '2111986.webp', '2111989.webp', '2111987.webp', '2111991.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.baieido,
		series: manufacturers.baieido.series?.kobunboku,
		ingredients: [Ingredients.sandalwood, Ingredients.borneol, Ingredients.clove, Ingredients.cinnamon, Ingredients.herbsMedicine],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13,
		price: 0,
		pricePerStick: 28,
		quantity: stock.baieido?.kobunboku,
		isActive: true,
		inStock: true,
	},

	{
		slug: 'kaden-kobunboku',
		title: 'Кадэн Кобунбоку',
		originalTitle: '家伝 好文木',
		description: 'Кадэн переводится как "старый семейный секрет", это тщательно созданный путем смешивания двадцати видов натуральных ароматов рецепт, включающий все более редкие натуральные агар Цукигасэ и сандаловое дерево. Кадэн Кобунбоку очень популярен благодаря своему теплому, мягкому, горьковато-сладкому аромату, идеально подходящему для медитации.',
		photos: ['2111997.webp', '2111994.webp', '2111995.webp', '2111998.webp', '2111999.webp', '2112000.webp', '2112001.webp', '2112002.webp', '2112004.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.baieido,
		series: manufacturers.baieido.series?.kobunboku,
		ingredients: [Ingredients.aloeswoodVietnamese, Ingredients.sandalwood, Ingredients.borneol, Ingredients.clove, Ingredients.cinnamon, Ingredients.herbsMedicine],
		features: [Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13,
		price: 0,
		pricePerStick: 28,
		quantity: stock.baieido?.['kaden-kobunboku'],
		isActive: true,
		inStock: true,
	},

	{
		slug: 'bikou-kobunboku',
		title: 'Бико Кобунбоку',
		originalTitle: '微香 好文木',
		description: 'Название Бико Кобунбоку означает "нежный аромат", и это более тонкая версия высоко ценимой формулы сливового аромата классического Кобунбоку. Бико - более мягкий и нежный, с едва уловимыми нотками корицы и китайских медицинских трав, прекрасно сочетающихся с оттенком агара на сандаловой основе. Бико Кобунбоку производит очень мало дыма и широко используется в дзен-до по всему миру.',
		photos: ['2111977.webp', '2111968.webp', '2111969.webp', '2111970.webp', '2111971.webp', '2111972.webp', '2111975.webp', '2111976.webp', '2111978.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.baieido,
		series: manufacturers.baieido.series?.kobunboku,
		ingredients: [Ingredients.sandalwood, Ingredients.borneol, Ingredients.clove, Ingredients.cinnamon, Ingredients.herbsMedicine],
		features: [Features.lowSmoke, Features.daily, Features.natural],
		burnTime: 30,
		lenght: 13,
		price: 0,
		pricePerStick: 32,
		quantity: stock.baieido?.['bikou-kobunboku'],
		isActive: true,
		inStock: true,
	},
];

const premium: Incense[] = [
	{
		slug: 'shu-koh-koku',
		title: 'Сю Ко Коку (Собрание благоухающих стран)',
		originalTitle: '聚香國',
		description: 'Сю Ко Коку, что означает «Собрание благоухающих стран», — это высококачественные японские благовония премиум-класса, изготовленные из отборного индийского сандала, сладкого вьетнамского агара и традиционных китайских трав и специй. Как и все благовония Байэидо, они обладают чудесным теплым, древесным, пряным ароматом.',
		photos: ['P1013730.webp', 'P1013733.webp', 'P1013731.webp', 'P1013732.webp', 'P1013735.webp', 'P1013734.webp'],
		origin: origin.japan,
		manufacturer: manufacturers.baieido,
		series: manufacturers.baieido.series?.premium,
		ingredients: [Ingredients.sandalwoodIndian, Ingredients.aloeswoodVietnamese, Ingredients.patchouli, Ingredients.cassia, Ingredients.benzoin, Ingredients.florals, Ingredients.spices],
		features: [Features.premium, Features.natural],
		burnTime: 30,
		lenght: 14,
		price: 0,
		pricePerStick: 48,
		quantity: stock.baieido?.['shu-koh-koku'],
		isActive: true,
		inStock: true,
	},
];

export const bayeidoIncences: Incense[] = [...kobunboku, ...premium];
